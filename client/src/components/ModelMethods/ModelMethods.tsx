import React from 'react';
import { gRPCClients } from '../../gRPCClients';
import {
  Model,
  ModelId,
  NewModelRequest,
  UserId
} from '../../protos/model_pb'

const modelsrv = gRPCClients.modelServiceClient;
const metadata = {'service-header': 'model_service'};

export const ModelMethods = () => {
  const handleUserModels = () => {
    const request = new UserId();
    request.setId(2);
    modelsrv.getUserModels(request, metadata, (err, res) => {
      if (err) {
        console.log(err.code, err.message);
        return;
      }
      console.log(res.toObject().modelsList);
    });
  };

  const handleAddNewModel = () => {
    const request = new NewModelRequest();
    request.setModel(new Model().setModel('Model'));
    request.setUserid(new UserId().setId(2));
    modelsrv.addModel(request, metadata, (err, _) => {
      if (err) {
        console.log(err.code, err.message);
        return;
      }
      console.log('FRONT: empty response');
    });
  };

  const handleDeleteModel = () => {
    const request = new ModelId();
    request.setId(2);
    modelsrv.deleteModel(request, metadata, (err, _) => {
      if (err) {
        console.log(err.code, err.message);
        return;
      }
      console.log('FRONT: empty response');
    });
  };

  return (
    <div>
      <button onClick={handleUserModels}>Get models</button>
      <button onClick={handleAddNewModel}>Add model</button>
      <button onClick={handleDeleteModel}>Delete model</button>
    </div>
  );
};