import React, {
  BaseSyntheticEvent,
  useState
} from 'react';
import { expressionParams } from '../../utils/dataParsing';
import { useModal } from '../../hooks/useModal';
import { Button } from '../../common-components/Button/Button';
import { Modal } from '../../common-components/Modal/Modal';
import { AddModel } from '../../common-components/AddModel/AddModel';
import { EditModelParams } from '../../common-components/EditModelParams/EditModelParams';
import {
  CurveFitActions,
  CurveFitState,
  FitActionType
} from '../../reducers/curveFitReducer';
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
  const [modelParams, setModelParams] = useState<FitStateExpression>();

  const {isShowing: isAddModelModal, toggle: toggleIsModelModal} = useModal();
  const {isShowing: isEditBounds, toggle: toggleIsEditBounds} = useModal();

  const handleGuessBounds = (e: BaseSyntheticEvent, model: FitStateExpression) => {
    e.stopPropagation();
    setModelParams(model);
    toggleIsEditBounds();
  };

  const modelSubmit = (newExpr: NewExpression) => {
    dispatch({
      type: FitActionType.ADD_TEMP_MODEL, model: {
        id: performance.now(),
        ...newExpr,
        isSelected: false,
        params: expressionParams(newExpr.expression).map(param => ({
          paramName: param,
          paramValue: 1,
          minBound: -Infinity,
          maxBound: Infinity,
        })),
      }
    });
    toggleIsModelModal();
  };

  return (
    <>
      <div className={styles.componentWrapper}>
        <div className={styles.modelsWrapper}>
          {expressions.map((model) => (
            <div
              key={model.id}
              role="button"
              tabIndex={0}
              className={`${styles.model} ${model.isSelected && styles.modelSelected}`}
              onClick={() => dispatch({type: FitActionType.TOGGLE_MODEL_SELECT, id: model.id})}
            >
              {model.name}
              <button type="button" onClick={e => handleGuessBounds(e, model)}>Guesses</button>
            </div>
          ))}
        </div>
        <div>
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
      <Modal isShowing={isEditBounds}>
        <EditModelParams model={modelParams!} dispatch={dispatch} closeModal={toggleIsEditBounds}/>
      </Modal>
    </>
  );
};
