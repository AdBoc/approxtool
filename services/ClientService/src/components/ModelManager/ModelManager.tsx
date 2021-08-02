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
import { Model } from '../../protos/modelservice_pb';
import { fetchTempModels, } from '../../temporary/sim-request/sim-request';
import TexMath from '@matejmazur/react-katex';
import './katex.css';
import { apiService } from '../../grpc-web/apiService';

export const ModelManager: React.FC = (): JSX.Element => {
  const [models, setModels] = useState<Model.AsObject[]>([]);
  const {isShowing: isAddModel, toggle: toggleAddModel} = useModal();

  useEffect(() => {
    async function fetchModels() {
      if (!process.env.NODE_ENV || process.env.NODE_ENV === 'development') {
        fetchTempModels().then(models => setModels(models));
      } else {
        try {
          const response = await apiService.GetUserModels()
          setModels(response.toObject().modelsList);
        } catch (err) {
          console.error(err.code, err.message);
        }
      }
    }

    fetchModels();
  }, []);

  const modelSubmit = async ({name, expression, lexexpression}: NewExpression) => {
    try {
      const response = await apiService.AddModel(name, expression, lexexpression)
      setModels(prev => mutateModel.addModel(prev, response.toObject()));
    } catch (err) {
      console.error(err.code, err.message);
    } finally {
      toggleAddModel();
    }
  };

  const handleDeleteModel = async (modelId: number) => {
    try {
      await apiService.DeleteModel(modelId);
      setModels(prev => mutateModel.deleteModel(prev, modelId));
    } catch (err) {
      console.error(err.code, err.message);
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
