import React, {
  BaseSyntheticEvent,
  useState
} from 'react';
import {
  CurveFitActions,
  CurveFitState,
  FitActionType
} from '../../reducers/curveFitReducer';
import { expressionParams } from '../../utils/dataParsing';
import { useModal } from '../../hooks/useModal';
import { Button } from '../../common-components/Button/Button';
import { Modal } from '../../common-components/Modal/Modal';
import { AddModel } from '../../common-components/AddModel/AddModel';
import { EditModelParams } from '../../common-components/EditModelParams/EditModelParams';
import {
  FitStateExpression,
  NewExpression
} from '../../types/stateExpression';
import styles from './styles.module.scss';

interface Props {
  expressions: CurveFitState['allModels'];
  dispatch: React.Dispatch<CurveFitActions>;
  closeModelsModal: () => void;
}

export const Models: React.FC<Props> = ({expressions, dispatch, closeModelsModal}): JSX.Element => {
  const [modelDetails, setModelDetails] = useState<FitStateExpression | null>(null);

  const {isShowing: isAddModelModal, toggle: toggleIsModelModal} = useModal();

  const handleGuessBounds = (e: BaseSyntheticEvent, model: FitStateExpression) => {
    e.stopPropagation();
    setModelDetails(model);
  };

  const handleModelSelect = (model: FitStateExpression) => dispatch({
    type: FitActionType.TOGGLE_MODEL_SELECT,
    id: model.id
  });

  const modelSubmit = (newExpr: NewExpression) => {
    const model = {
      id: performance.now(),
      ...newExpr,
      isSelected: false,
      params: expressionParams(newExpr.expression).map(param => ({
        paramName: param,
        paramValue: 1,
        minBound: -Infinity,
        maxBound: Infinity,
      })),
    };
    dispatch({type: FitActionType.ADD_TEMP_MODEL, model});
    toggleIsModelModal();
  };

  return (
    <>
      <div>
        <div className={styles.modelsWrapper}>
          {expressions.map((model) => (
            <div key={model.id} className={`${styles.model} ${model.isSelected && styles.modelSelected}`}
                 onClick={() => handleModelSelect(model)}>
              <input type="checkbox" checked={model.isSelected} readOnly/>
              <button onClick={e => handleGuessBounds(e, model)}>{model.name}</button>
            </div>
          ))}
        </div>
        <div className={styles.modalButtons}>
          <Button text="Select all" type="button" onClick={() => dispatch({type: FitActionType.SELECT_ALL_MODELS})}/>
          <Button
            text="Unselect all"
            type="button"
            onClick={() => dispatch({type: FitActionType.UNSELECT_ALL_MODELS})}
          />
          <Button text="Add temporary model" type="submit" onClick={toggleIsModelModal}/>
          <Button text="Close modal" type="submit" onClick={closeModelsModal}/>
        </div>
      </div>
      <Modal isShowing={isAddModelModal}>
        <AddModel modelSubmit={modelSubmit}/>
        <Button text="Close" onClick={toggleIsModelModal}/>
      </Modal>
      <Modal isShowing={Boolean(modelDetails)}>
        <EditModelParams model={modelDetails!} dispatch={dispatch} closeModal={() => setModelDetails(null)}/>
      </Modal>
    </>
  );
};
