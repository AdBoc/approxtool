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
import { StateExpression } from '../../types';
import styles from './styles.module.scss';
import {
  GetModelsRequest,
  NewModelRequest
} from '../../protos/model_pb';
import {
  modelMetadata,
  modelSrv
} from '../../constants/constants';
import { NewExpression } from '../../types/stateExpression';

export const ModelManager: React.FC = (): JSX.Element => {
  const [models, setModels] = useState<StateExpression[]>([]);
  const [selectedModel, setSelectedModel] = useState<StateExpression | null>(null);

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
        setModels(res.toObject().modelsList.map(model => ({...model, isSelected: false})));
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
    request.setUserid(1);//TODO: STATIC
    request.setExpression(newExpr.expression);
    request.setLexexpression(newExpr.lexexpression);
    modelSrv.addModel(request, modelMetadata, (err, _) => {
      if (err) {
        console.log(err.code, err.message);
        return;
      }
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
        <ModelDetails selectedModel={selectedModel!} toggleModal={toggleModelDetails}/>
      </Modal>
      <Modal isShowing={isAddModel}>
        <AddModel modelSubmit={modelSubmit}/>
        <Button text="Close" onClick={toggleAddModel}/>
      </Modal>
    </div>
  );
};
