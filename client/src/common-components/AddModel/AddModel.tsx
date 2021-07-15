import React, {
  BaseSyntheticEvent,
  useEffect,
  useMemo,
  useState
} from 'react';
import nerdamer from 'nerdamer';
import TexMath from '@matejmazur/react-katex';
import { expressionParams } from '../../utils/dataParsing';
import { extraExprValidation } from './AddModel.utils';
import { NewExpression } from '../../types/stateExpression';
import { InputField } from '../InputField/InputField';
import { Graph } from '../Graph';
import {
  calculatePoints,
  getYAxisMinMax
} from '../../utils/curveFit';
import { Modal } from '../Modal/Modal';
import { Button } from '../Button/Button';
import { useModal } from '../../hooks/useModal';
import styles from './styles.module.scss';
import 'katex/dist/katex.min.css';
import {
  GenericObject,
  Point
} from '../../types';

interface Props {
  modelSubmit: (expr: NewExpression) => void;
}

export const AddModel: React.FC<Props> = ({modelSubmit}): JSX.Element => {
  const [graphPoints, setGraphPoints] = useState<Point[]>([]);
  const [parameters, setParameters] = useState<GenericObject<number>>({});
  const [errors, setErrors] = useState<string[]>([]);
  const [modelForm, setModelForm] = useState<NewExpression>({
    name: '',
    expression: '',
    lexexpression: '',
  });

  const {isShowing: isGraph, show, hide} = useModal();

  useEffect(() => {
    if (!modelForm.expression) return setModelForm(prev => ({...prev, lexExpression: ''}));
    let exprErrors: string[] = [];
    try {
      const lexEquation = nerdamer(modelForm.expression).toTeX();
      let exprParams: string[] | GenericObject<number> = expressionParams(modelForm.expression);
      exprErrors = extraExprValidation(modelForm.expression, exprParams, modelForm.name);
      setModelForm(prev => ({...prev, lexexpression: lexEquation}));
      // setParameters(exprParams.map(param => ({paramName: param, paramVal: 1})));

      exprParams = exprParams.reduce((params, letter) => {
        params[letter] = 1;
        return params;
      }, {} as GenericObject<number>);

      setParameters(exprParams)
    } catch (e) {
      exprErrors.push('Expression cannot be converted to latex');
    } finally {
      setErrors(exprErrors);
    }
  }, [modelForm.expression, modelForm.name]);

  const yScaleDomain = useMemo(() => getYAxisMinMax(graphPoints), [graphPoints]);

  const handleInput = (e: BaseSyntheticEvent) => setModelForm(prev => ({...prev, [e.target.name]: e.target.value}));

  const handleChangeParameter = (e: BaseSyntheticEvent) => setParameters(prev => ({
    ...prev,
    [e.target.name]: parseFloat(e.target.value),
  })); //TODO: Make sure user inputs float

  const drawGraph = () => {
    if (errors.length) return;

    const calculatedPoints = calculatePoints(modelForm.expression, parameters);
    if (!calculatedPoints) {
      setErrors(prev => [...prev, 'Internal App Error: Expression cannot be evaluated']);
      return;
    }
    setGraphPoints(calculatedPoints);
    show();
  };

  const handleModelSubmit = () => {
    if (!modelForm.name || !modelForm.expression) {
      setErrors(prev => [...prev, 'Name or expression fields cannot be empty']);
      return;
    }
    if (errors.length) return;
    modelSubmit(modelForm);
  };

  return (
    <>
      <div>
        <InputField label="Name" name="name" value={modelForm.name} handler={handleInput}/>
        <InputField label="Expression" name="expression" value={modelForm.expression} handler={handleInput}/>
        {modelForm.lexexpression &&
        <>
            <TexMath
                block
                className={`${styles.texExpression} ${errors.length ? styles.texError : styles.texValid}`}
                math={modelForm.lexexpression}
            />
            <label>Show graph
                <input type="checkbox" checked={isGraph} onChange={drawGraph}/>
            </label>
        </>
        }
        <div className={styles.textWrapper}>
          {errors.map(error => <p key={error} className={styles.textError}>{error}</p>)}
        </div>
        {Boolean(Object.keys(parameters).length) && <div className={styles.textWrapper}>
            <p>Detected parameters: {Object.keys(parameters).join(', ')}</p>
        </div>}
        <Button text="Submit" type="submit" onClick={handleModelSubmit}/>
      </div>
      <Modal isShowing={isGraph} className={styles.graphModal}>
        <div className={styles.graphFlex}>
          <Graph
            graphExpression={{id: 1, name: modelForm.name, points: graphPoints}}
            yScaleDomain={yScaleDomain}
            xScaleDomain={[-100, 100]}
          />
          <div>
            {Object.entries(parameters).map(([paramName, paramVal]) => (
              <div key={paramName}>
                <label>{paramName}:
                  <input
                    className={styles.paramsLabel}
                    type="number"
                    name={paramName}
                    value={paramVal}
                    onChange={handleChangeParameter}
                  />
                </label>
              </div>
            ))}
          </div>
        </div>
        <Button text="Update graph" type="button" onClick={drawGraph}/>
        <Button text="Hide graph" type="submit" onClick={hide}/>
      </Modal>
    </>
  );
};

//TODO: ALL CALC METHODS INTO CLASS?
