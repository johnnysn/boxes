import Boxes from '../components/Boxes';
import SearchBox from '../components/SearchBox';
import AddBoxButton from '../components/AddBoxButton';
import { useState, useContext, useEffect } from 'react';
import BoxesContextType from '../context/boxes-context.type';
import { BoxesContext } from '../context/boxes-context';
import Modal from '../components/UI/Modal';
import NewBox from '../components/NewBox';
import { IBox } from '../models/box.model';

type Props = {};

export default function MainPage({}: Props) {
  const { boxes, addBox } = useContext<BoxesContextType>(BoxesContext);
  const [filteredBoxes, setFilteredBoxes] = useState(boxes);
  const [isAdding, setIsAdding] = useState(false);

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

  const createBoxHandler = (data: IBox) => {
    addBox(data);
  };

  return (
    <>
      {isAdding && (
        <Modal onCancel={() => setIsAdding(false)}>
          <NewBox onSubmit={createBoxHandler} onClose={() => setIsAdding(false)} />
        </Modal>
      )}

      <div className="flex flex-col items-center gap-6">
        <div className="flex flex-col lg:flex-row gap-4 items-center">
          <SearchBox searchHandler={searchHandler} />
          <AddBoxButton onClick={() => setIsAdding(true)} />
        </div>
        <Boxes boxes={filteredBoxes} />
      </div>
    </>
  );
}
