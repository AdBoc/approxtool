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
import {
  apiSrv,
  fetchWithAuthRetry
} from '../../../grpc-web';
import { token } from '../../../utils/token';

interface Props {
  selectedModel: StateExpression | Model.AsObject;
  closeModal: () => void;
  setModels: React.Dispatch<React.SetStateAction<Model.AsObject[]>>;
}

export const ModelDetails: React.FC<Props> = ({selectedModel, closeModal, setModels}): JSX.Element => {
  const handleDeleteModel = async (modelId: number) => {
    const request = new DeleteModelRequest();
    request.setModelid(modelId);

    try {
      await fetchWithAuthRetry(() => {
        request.setAccesstoken(token.accessToken);
        return apiSrv.deleteModel(request, null);
      });

      setModels(prev => mutateModel.deleteModel(prev, modelId));
      closeModal();
    } catch (e) {
      console.error(e);
    }
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