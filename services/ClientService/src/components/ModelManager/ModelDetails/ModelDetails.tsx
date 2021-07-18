import React from 'react';
import TexMath from '@matejmazur/react-katex';
import { Button } from '../../../common-components/Button/Button';
import { StateExpression } from '../../../types';
import styles from './styles.module.scss';
import { mutateModel } from '../ModelManager.utils';
import {
  DeleteModelRequest,
  Model
} from '../../../protos/modelservice_pb';
import { apiSrv } from '../../../constants/constants';

interface Props {
  selectedModel: StateExpression | Model.AsObject;
  closeModal: () => void;
  setModels: React.Dispatch<React.SetStateAction<Model.AsObject[]>>;
}

export const ModelDetails: React.FC<Props> = ({selectedModel, closeModal, setModels}): JSX.Element => {
  const handleDeleteModel = (modelId: number) => {
    const request = new DeleteModelRequest();
    request.setModelid(modelId);
    apiSrv.deleteModel(request, null, (err, _) => {
      if (err) {
        console.log(err.code, err.message);
        return;
      }
      setModels(prev => mutateModel.deleteModel(prev, modelId));
      closeModal();
    });
  };

  const handleLatexToClipboard = async (expression: string) => {
    try {
      await navigator.clipboard.writeText(expression);
    } catch (e) {
      console.error('Failed to copy');
    }
  };

  return (
    <div className={styles.detailsWrapper}>
      <p>Name: {selectedModel.name}</p>
      <p>Expression: {selectedModel.expression}</p>
      <TexMath block className={styles.texExpression} math={selectedModel.lexexpression}/>
      <Button text="Copy latex expression" onClick={() => handleLatexToClipboard(selectedModel.lexexpression)}/>
      <Button text="Close" onClick={closeModal}/>
      <Button className={styles.dangerousButton} text="Delete" onClick={() => handleDeleteModel(selectedModel.id)}/>
    </div>
  );
};