import React, { useState } from 'react';
import { apiService } from '../../../grpc-web/apiService';
import { mutateModel } from '../ModelManager.utils';
import { useIsMounted } from '../../../hooks/useIsMounted';
import { Model } from '../../../protos/modelservice_pb';
import { Button } from '../../../common-components/Button/Button';
import { InputField } from '../../../common-components/InputField/InputField';
import { isApiError } from '../../../utils/isApiError';

interface Props {
  modelId: number | null;
  setModels: React.Dispatch<React.SetStateAction<Model.AsObject[]>>
  toggleModal: () => void;
}

export const EditTag: React.FC<Props> = ({modelId, setModels, toggleModal}): JSX.Element => {
  const [tagInput, setTagInput] = useState('');

  const isMounted = useIsMounted();

  const handleEditTag = async (modelId: number | null) => {
    if (modelId === null) return;
    try {
      await apiService.EditTag(modelId, tagInput);
      if (isMounted()) {
        setModels(prev => mutateModel.editTag(prev, modelId, tagInput));
      }
    } catch (err) {
      if (isApiError(err)) {
        console.error(err.code, err.message);
      }
    } finally {
      toggleModal();
    }
  };

  return (
    <>
      <InputField type="text" label="Tag" value={tagInput} handler={e => setTagInput(e.target.value)}/>
      <Button type="submit" text="Send" onClick={() => handleEditTag(modelId)}/>
    </>
  );
};
