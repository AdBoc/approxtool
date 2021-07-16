import React, {
  useEffect,
  useState
} from 'react';
import {
  fetchModels,
} from '../../temporary/sim-request/sim-request';
import { useModal } from '../../hooks/useModal';
import { Modal } from '../../common-components/Modal/Modal';
import { AddModel } from '../../common-components/AddModel/AddModel';
import { Button } from '../../common-components/Button/Button';
import { ModelDetails } from './ModelDetails';
import styles from './styles.module.scss';
import {
  GetModelsRequest,
  Model,
  NewModelRequest
} from '../../protos/model_pb';
import {
  modelMetadata,
  modelSrv
} from '../../constants/constants';
import { NewExpression } from '../../types/stateExpression';
import { mutateModel } from './ModelManager.utils';

export const ModelManager: React.FC = (): JSX.Element => {
  const [models, setModels] = useState<Model.AsObject[]>([]);
  const [selectedModel, setSelectedModel] = useState<Model.AsObject | null>(null);

  const {isShowing: isModelDetails, toggle: toggleModelDetails} = useModal();
  const {isShowing: isAddModel, toggle: toggleAddModel} = useModal();

  useEffect(() => {
    if (!process.env.NODE_ENV || process.env.NODE_ENV === 'development') {
      fetchModels().then(models => setModels(models));
    } else {
      const request = new GetModelsRequest();
      request.setUserid(1) //TODO: STATIC USER ID
      modelSrv.getUserModels(request, modelMetadata, (err, res) => {
        if (err) {
          console.log(err.code, err.message);
          return;
        }
        setModels(res.toObject().modelsList);
      });
    }
  }, []);

  const handleModelDetails = (modelId: number) => {
    const model = models.find(({id}) => modelId === id);
    if (!model) return;
    setSelectedModel(model);
    toggleModelDetails();
  };

  const modelSubmit = (newExpr: NewExpression) => {
    const request = new NewModelRequest();
    request.setName(newExpr.name);
    request.setUserid(1);//TODO: STATIC USER ID
    request.setExpression(newExpr.expression);
    request.setLexexpression(newExpr.lexexpression);
    modelSrv.addModel(request, modelMetadata, (err, res) => {
      if (err) {
        console.log(err.code, err.message);
        return;
      }
      setModels(prev => mutateModel.addModel(prev, res.toObject()));
      console.log(isAddModel);
      toggleAddModel();
    });
  }

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
