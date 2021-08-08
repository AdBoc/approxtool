import { Model } from '../../protos/modelservice_pb';

class MutateModel {
  addModel(models: Model.AsObject[], newModel: Model.AsObject) {
    return [...models, newModel];
  };

  deleteModel(models: Model.AsObject[], modelId: number) {
    return models.filter(({id}) => id !== modelId);
  };

  editTag(models: Model.AsObject[], modelId: number, tag: string) {
    const index = models.findIndex(model => model.id === modelId);
    if (!index) return models;
    const modelCopy = [...models]
    modelCopy[index].tag = tag; // TODO: DO PERF BENCH
    return modelCopy;
  }
}

export const mutateModel = new MutateModel();
