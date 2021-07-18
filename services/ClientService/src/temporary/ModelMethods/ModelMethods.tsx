import React, {
  BaseSyntheticEvent,
  useEffect,
  useState
} from 'react';
import TexMath from '@matejmazur/react-katex';
import nerdamer from 'nerdamer';
import styles from './styles.module.scss';
import 'katex/dist/katex.min.css';
import {
  DeleteModelRequest,
  GetModelsRequest,
  GetModelsResponse,
  NewModelRequest
} from '../../protos/modelservice_pb';
import { apiSrv } from '../../constants/constants';

export const ModelMethods = () => {
  const [models, setModels] = useState<GetModelsResponse.AsObject['modelsList']>([]);
  const [isModelValidated, setIsModelValidated] = useState(true);
  const [newModel, setNewModel] = useState<NewModelRequest.AsObject>({
    userid: 1, //TEMP
    name: '',
    expression: '',
    lexexpression: '',
  });

  const handleUserModels = () => {
    const request = new GetModelsRequest();
    request.setUserid(2);
    apiSrv.getUserModels(request, null, (err, res) => {
      if (err) {
        console.log(err.code, err.message);
        return;
      }
      setModels(res.toObject().modelsList);
    });
  };

  const handleAddNewModel = () => {
    const request = new NewModelRequest();
    request.setUserid(newModel.userid);
    request.setName(newModel.name);
    request.setExpression(newModel.expression);
    request.setLexexpression(newModel.lexexpression);

    apiSrv.addModel(request, null, (err, _) => {
      if (err) {
        console.log(err.code, err.message);
        return;
      }
    });
  };

  const handleDeleteModel = (e: BaseSyntheticEvent) => {
    const request = new DeleteModelRequest();
    request.setModelid(parseInt(e.target.value));
    apiSrv.deleteModel(request, null, (err, _) => {
      if (err) {
        console.log(err.code, err.message);
        return;
      }
    });
  };

  const handleNewModel = (e: BaseSyntheticEvent) => {
    setNewModel((prev) => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  useEffect(() => {
    try {
      if (!newModel.expression) return setNewModel(prev => ({...prev, lexexpression: ''}));
      let equation = nerdamer(newModel.expression);
      setNewModel(prev => ({...prev, lexexpression: equation.toTeX()}));
      setIsModelValidated(true);
    } catch (e) {
      setIsModelValidated(false);
    }
  }, [newModel.expression])

  return (
    <div>
      <div className={styles.elementsWrapper}>
        <div className={styles.elementWrapper}>
          <button type="button" onClick={handleUserModels}>Get models</button>
        </div>
        <div className={styles.elementWrapper}>
          <label>Expression name:
            <input name="name" value={newModel.name} onChange={handleNewModel}/>
          </label>
          <label>Expression:
            <input name="expression" value={newModel.expression} onChange={handleNewModel}/>
          </label>
          <button type="button" onClick={handleAddNewModel}>Add model</button>
          <TexMath math={newModel.lexexpression} block/>
          {!isModelValidated && <p>Validation error</p>}
        </div>
      </div>
      <div>
        {models.map(model => (
          <div key={model.id}>
            <p>{model.name}</p>
            <button value={model.id} type="button" onClick={handleDeleteModel}>Delete model</button>
          </div>
        ))}
      </div>
    </div>
  );
};

// katex.render(latexModel, document.getElementById('katex-equation'), {
//   throwOnError: true
// })
/*<div id="katex-equation"/>*/
