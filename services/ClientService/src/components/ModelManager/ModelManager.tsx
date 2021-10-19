import React, {
  useEffect,
  useState
} from 'react';
import TexMath from '@matejmazur/react-katex';
import { apiService } from '../../grpc-web/apiService';
import { mutateModel } from './ModelManager.utils';
import { useIsMounted } from '../../hooks/useIsMounted';
import { useModal } from '../../hooks/useModal';
import { isApiError } from '../../utils/isApiError';
import { Modal } from '../../common-components/Modal/Modal';
import { AddModel } from '../../common-components/AddModel/AddModel';
import { Button } from '../../common-components/Button/Button';
import { Model } from '../../protos/modelservice_pb';
import { fetchTempModels, } from '../../temporary/sim-request/sim-request';
import { EditTag } from './EditTag';
import { NewExpression } from '../../types/stateExpression';
import styles from './styles.module.scss';
import './katex.css';

export const ModelManager: React.FC = (): JSX.Element => {
  const [models, setModels] = useState<Model.AsObject[]>([]);
  const [selectedId, setSelectedId] = useState<number | null>(null);

  const isMounted = useIsMounted();
  const {isShowing: isAddModel, toggle: toggleAddModel} = useModal();

  useEffect(() => {
    async function fetchModels() {
      if (!process.env.NODE_ENV || process.env.NODE_ENV === 'development') {
        fetchTempModels().then(models => {
          if (isMounted()) setModels(models);
        });
      } else {
        try {
          const response = await apiService.GetUserModels();
          if (isMounted()) {
            setModels(response.toObject().modelsList.sort((a, b) => a.tag.localeCompare(b.tag)));
          }
        } catch (err) {
          if (isApiError(err)) {
            console.error(err.code, err.message);
          }
        }
      }
    }

    fetchModels();
  }, [isMounted]);

  const modelSubmit = async ({name, expression, lexexpression, tag}: NewExpression) => {
    try {
      const response = await apiService.AddModel(name, expression, lexexpression, tag);
      if (isMounted()) {
        setModels(prev => mutateModel.addModel(prev, response.toObject()));
        toggleAddModel();
      }
    } catch (err) {
      if (isApiError(err)) {
        console.error(err.code, err.message);
      }
    }
  };

  const handleDeleteModel = async (modelId: number) => {
    try {
      await apiService.DeleteModel(modelId);
      if (isMounted()) {
        setModels(prev => mutateModel.deleteModel(prev, modelId));
      }
    } catch (err) {
      if (isApiError(err)) {
        console.error(err.code, err.message);
      }
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
    <div className={styles.modelsWrapper}>
      <section className={styles.tableWrapper}>
        <div className={`${styles.tableRow} ${styles.tableHeader}`}>
          <p>Name</p>
          <p>Expression</p>
          <p>Lex expression</p>
          <p>Delete</p>
          <p>Tag</p>
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
            <button type="button" onClick={() => handleDeleteModel(model.id)}>Delete</button>
            <button
              type="button"
              className={styles.tagElement}
              onClick={() => setSelectedId(model.id)}>
              {model.tag}
            </button>
          </div>
        ))
        }
      </section>
      <Button className={styles.addButton} text="New model" type="button" onClick={toggleAddModel}/>
      <Modal isShowing={isAddModel}>
        <AddModel modelSubmit={modelSubmit}/>
        <Button text="Close" onClick={toggleAddModel}/>
      </Modal>
      <Modal isShowing={Boolean(selectedId)}>
        <EditTag modelId={selectedId} setModels={setModels} toggleModal={() => setSelectedId(null)}/>
        <Button text="Close" onClick={() => setSelectedId(null)}/>
      </Modal>
    </div>
  );
};
