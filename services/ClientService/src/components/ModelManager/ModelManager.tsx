import React, {
  useEffect,
  useState
} from 'react';
import { useModal } from '../../hooks/useModal';
import { Modal } from '../../common-components/Modal/Modal';
import { AddModel } from '../../common-components/AddModel/AddModel';
import { Button } from '../../common-components/Button/Button';
import styles from './styles.module.scss';
import { NewExpression } from '../../types/stateExpression';
import { mutateModel } from './ModelManager.utils';
import {
  DeleteModelRequest,
  GetModelsRequest,
  Model,
  NewModelRequest
} from '../../protos/modelservice_pb';
import {
  apiSrv,
  fetchWithAuthRetry
} from '../../grpc-web';
import { token } from '../../utils/token';
import { fetchTempModels, } from '../../temporary/sim-request/sim-request';
import TexMath from '@matejmazur/react-katex';
import './katex.css';

export const ModelManager: React.FC = (): JSX.Element => {
  const [models, setModels] = useState<Model.AsObject[]>([]);
  const {isShowing: isAddModel, toggle: toggleAddModel} = useModal();

  useEffect(() => {
    async function fetchModels() {
      if (!process.env.NODE_ENV || process.env.NODE_ENV === 'development') {
        fetchTempModels().then(models => setModels(models));
      } else {
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
    }

    fetchModels();
  }, []);

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

  const handleDeleteModel = async (modelId: number) => {
    const request = new DeleteModelRequest();
    request.setModelid(modelId);

    try {
      await fetchWithAuthRetry(() => {
        request.setAccesstoken(token.accessToken);
        return apiSrv.deleteModel(request, null);
      });

      setModels(prev => mutateModel.deleteModel(prev, modelId));
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
    <div>
      <Button text="New model" onClick={toggleAddModel}/>
      <div className={`${styles.tableRow} ${styles.tableHeader}`}>
        <p>Name</p>
        <p>Expression</p>
        <p>Lex expression</p>
        <p>Delete</p>
      </div>
      {models.map((model) => (
        <div key={model.id} className={styles.tableRow}>
          <p>{model.name}</p>
          <p>{model.expression}</p>
          <TexMath
            block
            className={styles.texExpression}
            math={model.lexexpression}
            onClick={() => handleLatexToClipboard(model.lexexpression)}
          />
          <button onClick={() => handleDeleteModel(model.id)}>Delete</button>
        </div>
      ))}
      <Modal isShowing={isAddModel}>
        <AddModel modelSubmit={modelSubmit}/>
        <Button text="Close" onClick={toggleAddModel}/>
      </Modal>
    </div>
  );
};
