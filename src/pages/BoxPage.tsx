import { useContext, useState } from 'react';
import BoxView from '../components/BoxView/BoxView';
import BoxesContextType from '../context/boxes-context.type';
import { BoxesContext } from '../context/boxes-context';
import { useNavigate, useParams } from 'react-router-dom';
import ReturnButton from '../components/UI/ReturnButton';
import AddBoxButton from '../components/UI/AddBoxButton';
import Modal from '../components/UI/Modal';
import BoxEdit from '../components/BoxEdit';
import { IBox } from '../models/box.model';
import Confirm from '../components/UI/Confirm';

type Props = {};

export default function BoxPage({}: Props) {
  const { id } = useParams();
  const navigate = useNavigate();
  const ctx = useContext<BoxesContextType>(BoxesContext);
  const [isAdding, setIsAdding] = useState(false);
  const [removingBoxId, setRemovingBoxId] = useState<string | null>(null);

  const box = ctx.getById(id!);

  const boxEditHandler = () => {
    navigate('edit');
  };

  const boxSelectHandler = (boxId: string) => {
    if (boxId != box?.id) {
      navigate('/box/' + boxId);
    }
  }

  const boxRemoveHandler = (boxId: string) => {
    if (boxId === box?.id) {
      navigate({
        pathname: '/',
        search: '?delete=' + boxId,
      });
    } else {
      //Remove inner box
      setRemovingBoxId(boxId);
    }
  };

  const boxAddHandler = () => {
    setIsAdding(true);
  };

  const cancelAdding = () => {
    setIsAdding(false);
  };

  const submitBoxHandler = (data: IBox) => {
    ctx.addBoxToBox(box?.id!, data);
  };

  const cancelRemoving = () => {
    setRemovingBoxId(null);
  };

  const confirmRemoving = () => {
    ctx.removeBox(removingBoxId!);
    setRemovingBoxId(null);
  }

  return (
    <div className="py-2 px-2 flex flex-col gap-2">
      {isAdding && (
        <Modal onCancel={cancelAdding}>
          <BoxEdit onSubmit={submitBoxHandler} onClose={cancelAdding} />
        </Modal>
      )}

      {removingBoxId && (
        <Confirm
          text="Do you really wanna drop this beaultiful box?"
          onCancel={cancelRemoving}
          onConfirm={confirmRemoving}
        />
      )}

      <div>
        <h2 className="font-bold text-lg text-gray-700">{box?.label}</h2>

        <p className="text-gray-700">{box?.description}</p>

        <div className="mt-4 w-full flex justify-end">
          <AddBoxButton onClick={boxAddHandler} />
        </div>
      </div>

      <BoxView
        box={box!}
        onEdit={boxEditHandler}
        onRemove={boxRemoveHandler}
        onSelect={boxSelectHandler}
        full={true}
      />

      <div className="flex justify-center w-full mt-2">
        <ReturnButton />
      </div>
    </div>
  );
}
