import Boxes from '../components/Boxes';
import SearchBox from '../components/SearchBox';
import AddBoxButton from '../components/AddBoxButton';
import { useState, useContext, useEffect } from 'react';
import BoxesContextType from '../context/boxes-context.type';
import { BoxesContext } from '../context/boxes-context';
import Modal from '../components/UI/Modal';
import BoxEdit from '../components/BoxEdit';
import { IBox } from '../models/box.model';
import Confirm from '../components/UI/Confirm';
import { useNavigate, useSearchParams } from 'react-router-dom';

type Props = {};

export default function MainPage({}: Props) {
  const { boxes, addBox, updateBox, removeBox } =
    useContext<BoxesContextType>(BoxesContext);
  const [filteredBoxes, setFilteredBoxes] = useState(boxes);
  const [isEditing, setIsEditing] = useState(false);
  const [isRemoving, setIsRemoving] = useState(false);
  const [boxIdToRemove, setBoxIdToRemove] = useState('');
  const [boxToEdit, setBoxToEdit] = useState<IBox | null>(null);
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();

  useEffect(() => {
    setFilteredBoxes(boxes.filter((b) => !b.parent));
  }, [boxes]);

  useEffect(() => {
    const toDeleteId = searchParams.get('delete');
    if (toDeleteId) {
      setIsRemoving(true);
      setBoxIdToRemove(toDeleteId);
      searchParams.delete('delete');
      setSearchParams(searchParams);
    }
  }, [searchParams]);

  const searchHandler = (key: string) => {
    setFilteredBoxes(
      boxes.filter(
        (b) =>
          !b.parent &&
          b.label.toLowerCase().indexOf(key.trim().toLowerCase()) > -1
      )
    );
  };

  const submitBoxHandler = (data: IBox) => {
    if (!data.id) addBox(data);
    else updateBox(data.id, data);
  };

  const boxEditHandler = (data: IBox) => {
    setIsEditing(true);
    setBoxToEdit(data);
  };

  const boxAddHandler = () => {
    setIsEditing(true);
    setBoxToEdit(null);
  };

  const cancelEditing = () => {
    setIsEditing(false);
    setBoxToEdit(null);
  };

  const startRemoving = (boxId: string) => {
    setIsRemoving(true);
    setBoxIdToRemove(boxId);
  };

  const cancelRemoving = () => {
    setIsRemoving(false);
    setBoxIdToRemove('');
  };

  const confirmRemoving = () => {
    setIsRemoving(false);
    removeBox(boxIdToRemove);
    setBoxIdToRemove('');
  };

  const boxSelectHandler = (boxId: string) => {
    navigate('/box/' + boxId);
  };

  return (
    <>
      {isEditing && (
        <Modal onCancel={cancelEditing}>
          <BoxEdit
            onSubmit={submitBoxHandler}
            boxDataIn={boxToEdit}
            onClose={cancelEditing}
          />
        </Modal>
      )}

      {isRemoving && (
        <Confirm
          text="Do you really wanna drop this beaultiful box?"
          onCancel={cancelRemoving}
          onConfirm={confirmRemoving}
        />
      )}

      <div className="flex flex-col items-center gap-6">
        <div className="flex flex-col lg:flex-row gap-4 items-center">
          <SearchBox searchHandler={searchHandler} />
          <AddBoxButton onClick={boxAddHandler} />
        </div>
        <Boxes
          boxes={filteredBoxes}
          onEdit={boxEditHandler}
          onRemove={startRemoving}
          onSelect={boxSelectHandler}
        />
      </div>
    </>
  );
}
