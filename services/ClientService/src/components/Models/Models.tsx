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
import { uint32Generator } from '../../utils/idGenerator';

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
    tag: model.tag,
    id: model.id,
  });

  const modelSubmit = (newExpr: NewExpression) => {
    const model = {
      id: uint32Generator.next().value as number,
      ...newExpr,
      isSelected: false,
      tag: 'Unassigned',
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

  const handleSelectTag = (tag: string) => dispatch({type: FitActionType.TOGGLE_TAG, tag});

  return (
    <>
      <div className={styles.mansonry}>
        {Object.entries(expressions).map(([tag, expressions]) => (
          <div key={tag} className={styles.mansonryChild}>
            <button type="button" className={styles.tag} onClick={() => handleSelectTag(tag)}>{tag}</button>
            {expressions.map((model) => (
              <div
                key={model.id}
                className={`${styles.model} ${model.isSelected && styles.modelSelected}`}
                onClick={() => handleModelSelect(model)}
              >
                <input type="checkbox" checked={model.isSelected} readOnly/>
                <button className={styles.paramsButton} onClick={e => handleGuessBounds(e, model)}>{model.name}</button>
              </div>
            ))}
          </div>
        ))}
      </div>
      <div className={styles.modalButtons}>
        <Button text="Toggle all" type="button" onClick={() => dispatch({type: FitActionType.TOGGLE_ALL})}/>
        <Button text="Add temporary model" type="submit" onClick={toggleIsModelModal}/>
        <Button text="Close modal" type="button" onClick={closeModelsModal}/>
      </div>
      <Modal isShowing={isAddModelModal}>
        <AddModel temporary modelSubmit={modelSubmit}/>
        <Button text="Close" onClick={toggleIsModelModal}/>
      </Modal>
      <Modal isShowing={Boolean(modelDetails)}>
        <EditModelParams model={modelDetails!} dispatch={dispatch} closeModal={() => setModelDetails(null)}/>
      </Modal>
    </>
  );
};
