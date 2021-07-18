import { Model } from '../../protos/modelservice_pb';

class MutateModel {
  addModel(models: Model.AsObject[], newModel: Model.AsObject) {
    return [...models, newModel];
  };

  deleteModel(models: Model.AsObject[], modelId: number) {
    return models.filter(({id}) => id !== modelId);
  };
}

export const mutateModel = new MutateModel();
