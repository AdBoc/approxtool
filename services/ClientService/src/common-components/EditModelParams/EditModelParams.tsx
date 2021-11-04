import {
  BaseSyntheticEvent,
  Dispatch,
  FC,
  useState
} from 'react';
import TexMath from '@matejmazur/react-katex';
import {
  CurveFitActions,
  FitActionType
} from '../../reducers/curveFitReducer';
import { InputField } from '../InputField/InputField';
import { Button } from '../Button/Button';
import { FitStateExpression } from '../../types/stateExpression';

interface Props {
  model: FitStateExpression;
  dispatch: Dispatch<CurveFitActions>;
  closeModal: () => void;
}

export const EditModelParams: FC<Props> = ({ model, dispatch, closeModal }): JSX.Element => {
  const [paramsForm, setParamsForm] = useState(model.params);

  const handleChangeParam = (e: BaseSyntheticEvent, paramIndex: number) => {
    let newValue = parseFloat(e.target.value);
    if (Number.isNaN(newValue)) newValue = 0;
    const newParamsForm = [...paramsForm];
    newParamsForm[paramIndex] = {...newParamsForm[paramIndex], [e.target.name]: newValue};
    setParamsForm(newParamsForm);
  };

  const handleCloseAndSave = () => {
    dispatch({ type: FitActionType.CHANGE_PARAMS, params: paramsForm, modelId: model.id, tag: model.tag });
    closeModal();
  };

  return (
    <div>
      <p>Name: {model.name}</p>
      <div>
        <p>Expression:</p>
        <TexMath math={model.lexexpression} block/>
      </div>
      {paramsForm.map((param, index) => (
        <div key={param.paramName}>
          <p>Param: <b>{param.paramName}</b></p>
          <InputField
            label="Initial Guess"
            type="number"
            name="paramValue"
            value={param.paramValue}
            handler={e => handleChangeParam(e, index)}
          />
          <InputField
            label="Min Bound"
            name="minBound"
            value={param.minBound}
            handler={e => handleChangeParam(e, index)}
          />
          <InputField
            label="Max Bound"
            name="maxBound"
            value={param.maxBound}
            handler={e => handleChangeParam(e, index)}
          />
        </div>
      ))}
      <Button text="Close" onClick={handleCloseAndSave}/>
    </div>
  );
};
