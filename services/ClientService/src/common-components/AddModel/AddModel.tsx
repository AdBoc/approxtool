import React, {
  BaseSyntheticEvent,
  useEffect,
  useMemo,
  useState
} from 'react';
import nerdamer from 'nerdamer';
import TexMath from '@matejmazur/react-katex';
import { getExpressionParams } from '../../utils/dataParsing';
import { expressionValidation } from './AddModel.utils';
import { InputField } from '../InputField/InputField';
import { Graph } from '../Graph';
import {
  calculatePoints,
  getYAxisMinMax
} from '../../utils/curveFit';
import { Button } from '../Button/Button';
import {
  GenericObject,
  Point,
  NewExpression
} from '../../types';
import styles from './styles.module.scss';
import 'katex/dist/katex.min.css';

interface Props {
  modelSubmit: (expr: NewExpression) => void;
  isTempModel?: boolean;
}

export const AddModel: React.FC<Props> = ({modelSubmit, isTempModel: temporary}): JSX.Element => {
  const [graphPoints, setGraphPoints] = useState<Point[]>([]);
  const [parameters, setParameters] = useState<GenericObject<number>>({});
  const [validationErrors, setValidationErrors] = useState<string[]>([]);
  const [newModelData, setNewModelData] = useState<NewExpression>({
    name: '',
    expression: '',
    lexexpression: '',
    tag: '',
  });

  useEffect(() => {
    if (!newModelData.expression) return setNewModelData(prev => ({...prev, lexexpression: ''}));
    let exprErrors: string[] = [];
    try {
      const lexEquation = nerdamer(newModelData.expression).toTeX();
      let exprParams: string[] | GenericObject<number> = getExpressionParams(newModelData.expression);
      exprErrors = expressionValidation(newModelData.expression, exprParams, newModelData.name);
      setNewModelData(prev => ({...prev, lexexpression: lexEquation}));

      setParameters(exprParams.reduce((params, letter) => {
        params[letter] = 1;
        return params;
      }, {} as GenericObject<number>));
    } catch {
      exprErrors.push('Expression cannot be converted to latex');
    } finally {
      setValidationErrors(exprErrors);
    }
  }, [newModelData.expression, newModelData.name]);

  useEffect(() => {
    if (validationErrors.length || !newModelData.expression || !Object.values(parameters).length) return;

    try {
      const points = calculatePoints(newModelData.expression, parameters);
      setGraphPoints(points);
    } catch {
      setValidationErrors(prev => [...prev, 'Expression cannot be evaluated']);
    }
  }, [newModelData.expression, parameters, validationErrors.length]);


  const yScaleDomain = useMemo(() => getYAxisMinMax(graphPoints), [graphPoints]);

  const handleInput = (e: BaseSyntheticEvent) => setNewModelData(prev => ({...prev, [e.target.name]: e.target.value}));

  const handleChangeParameter = (e: BaseSyntheticEvent) => {
    const newParam = parseFloat(e.target.value);
    if (isNaN(newParam)) return;

    setParameters(prev => ({...prev, [e.target.name]: parseFloat(e.target.value)}));
  };

  const handleModelSubmit = () => {
    if (!newModelData.name || !newModelData.expression) {
      setValidationErrors(prev => [...prev, 'Name or expression fields cannot be empty']);
      return;
    }
    if (validationErrors.length) return;
    modelSubmit(newModelData);
  };

  return (
    <div className={styles.modalWrapper}>
      <div>
        <InputField label="Name*" name="name" value={newModelData.name} handler={handleInput} autoComplete="off"/>
        <InputField label="Expression*" name="expression" value={newModelData.expression} handler={handleInput} autoComplete="off" />
        {!temporary && <InputField label="Tag" name="tag" value={newModelData.tag} handler={handleInput} autoComplete="off"/>}
        {newModelData.lexexpression && (
          <TexMath
            block
            className={`${styles.texExpression} ${validationErrors.length ? styles.texError : styles.texValid}`}
            math={newModelData.lexexpression}
          />
        )}
        <div className={styles.textWrapper}>
          {validationErrors.map(error => <p key={error} className={styles.textError}>{error}</p>)}
        </div>
        {Boolean(Object.keys(parameters).length) && <div className={styles.textWrapper}>
            <p>Detected parameters: {Object.keys(parameters).join(', ')}</p>
        </div>}
        <Button text="Submit" type="submit" onClick={handleModelSubmit}/>
      </div>
      <div>
        <p>Params:</p>
        {Object.entries(parameters).map(([paramName, paramVal]) => (
          <div key={paramName} className={styles.paramsWrapper}>
            <label htmlFor={paramName}>{paramName}:</label>
            <input
              id={paramName}
              className={styles.paramsInput}
              type="number"
              name={paramName}
              value={paramVal}
              onChange={handleChangeParameter}
            />
          </div>
        ))}
      </div>
      <div className={styles.graphWrapper}>
        <Graph
          graphExpression={{id: 1, name: newModelData.name, points: graphPoints}}
          yScaleDomain={yScaleDomain}
          xScaleDomain={[-100, 100]}
        />
      </div>
    </div>
  );
};
