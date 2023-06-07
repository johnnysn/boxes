import Boxes from '../components/Boxes';
import SearchBox from '../components/SearchBox';
import AddBoxButton from '../components/AddBoxButton';
import { useState, useContext, useEffect } from 'react';
import BoxesContextType from '../context/boxes-context.type';
import { BoxesContext } from '../context/boxes-context';
import Modal from '../components/UI/Modal';
import BoxEdit from '../components/BoxEdit';
import { IBox } from '../models/box.model';

type Props = {};

export default function MainPage({}: Props) {
  const { boxes, addBox, updateBox } =
    useContext<BoxesContextType>(BoxesContext);
  const [filteredBoxes, setFilteredBoxes] = useState(boxes);
  const [idEditing, setIsEditing] = useState(false);
  const [boxToEdit, setBoxToEdit] = useState<IBox | null>(null);

  useEffect(() => {
    setFilteredBoxes(boxes);
  }, [boxes]);

  const searchHandler = (key: string) => {
    setFilteredBoxes(
      boxes.filter(
        (b) => b.label.toLowerCase().indexOf(key.trim().toLowerCase()) > -1
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

  return (
    <>
      {idEditing && (
        <Modal onCancel={cancelEditing}>
          <BoxEdit
            onSubmit={submitBoxHandler}
            boxId={boxToEdit?.id}
            onClose={cancelEditing}
          />
        </Modal>
      )}

      <div className="flex flex-col items-center gap-6">
        <div className="flex flex-col lg:flex-row gap-4 items-center">
          <SearchBox searchHandler={searchHandler} />
          <AddBoxButton onClick={boxAddHandler} />
        </div>
        <Boxes boxes={filteredBoxes} onEdit={boxEditHandler} />
      </div>
    </>
  );
}
