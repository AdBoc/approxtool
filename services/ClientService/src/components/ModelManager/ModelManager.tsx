import React, {
  useEffect,
  useState
} from 'react';
import { useModal } from '../../hooks/useModal';
import { Modal } from '../../common-components/Modal/Modal';
import { AddModel } from '../../common-components/AddModel/AddModel';
import { Button } from '../../common-components/Button/Button';
import { ModelDetails } from './ModelDetails';
import styles from './styles.module.scss';
import { NewExpression } from '../../types/stateExpression';
import { mutateModel } from './ModelManager.utils';
import {
  GetModelsRequest,
  Model,
  NewModelRequest
} from '../../protos/modelservice_pb';
import {
  apiSrv,
  fetchWithAuthRetry
} from '../../grpc-web';
import { token } from '../../utils/token';

export const ModelManager: React.FC = (): JSX.Element => {
  const [models, setModels] = useState<Model.AsObject[]>([]);
  const [selectedModel, setSelectedModel] = useState<Model.AsObject | null>(null);

  const {isShowing: isModelDetails, toggle: toggleModelDetails} = useModal();
  const {isShowing: isAddModel, toggle: toggleAddModel} = useModal();

  useEffect(() => {
    async function fetchModels() {
      const request = new GetModelsRequest();
      try {
        const result = await fetchWithAuthRetry(() => {
          request.setAccesstoken(token.accessToken);
          return apiSrv.getUserModels(request, null);
        });

        setModels(result.toObject().modelsList);
      } catch (e) {
        console.error(e);
      }
    }

    fetchModels();
  }, []);

  const handleModelDetails = (modelId: number) => {
    const model = models.find(({id}) => modelId === id);
    if (!model) return;
    setSelectedModel(model);
    toggleModelDetails();
  };

  const modelSubmit = async (newExpr: NewExpression) => {
    const request = new NewModelRequest();
    request.setName(newExpr.name);
    request.setExpression(newExpr.expression);
    request.setLexexpression(newExpr.lexexpression);

    try {
      const result = await fetchWithAuthRetry(() => {
        request.setAccesstoken(token.accessToken);
        return apiSrv.addModel(request, null)
      });

      setModels(prev => mutateModel.addModel(prev, result.toObject()));
      toggleAddModel();
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div>
      {models.map((model) => (
        <div key={model.id} className={styles.model} onClick={() => handleModelDetails(model.id)}>
          <p>{model.name}</p>
        </div>
      ))}
      <Button text="New model" onClick={toggleAddModel}/>
      <Modal isShowing={isModelDetails}>
        <ModelDetails selectedModel={selectedModel!} closeModal={toggleModelDetails} setModels={setModels}/>
      </Modal>
      <Modal isShowing={isAddModel}>
        <AddModel modelSubmit={modelSubmit}/>
        <Button text="Close" onClick={toggleAddModel}/>
      </Modal>
    </div>
  );
};
