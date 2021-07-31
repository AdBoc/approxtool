import React, {
  BaseSyntheticEvent,
  useState
} from 'react';
import { FitStateExpression } from '../../types/stateExpression';
import TexMath from '@matejmazur/react-katex';
import {
  CurveFitActions,
  FitActionType
} from '../../reducers/curveFitReducer';
import { InputField } from '../InputField/InputField';
import { Button } from '../Button/Button';

interface Props {
  model: FitStateExpression;
  dispatch: React.Dispatch<CurveFitActions>;
  closeModal: () => void;
}

export const EditModelParams: React.FC<Props> = ({model, dispatch, closeModal}): JSX.Element => {
  const [paramsForm, setParamsForm] = useState(model.params);

  const handleChangeParam = (e: BaseSyntheticEvent, paramIndex: number) => {
    const newParamsState = [...paramsForm];
    newParamsState[paramIndex] = {...newParamsState[paramIndex], [e.target.name]: parseFloat(e.target.value)};
    setParamsForm(newParamsState);
  };

  const handleCloseAndSave = () => {
    dispatch({type: FitActionType.CHANGE_PARAMS, params: paramsForm, modelId: model.id});
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
