import { useContext, useEffect, useRef, useState } from 'react';
import styles from './BoxViewShort.module.css';
import { Box } from '../models/box.model';
import ItemViewShort from './ItemViewShort';
import NewItemInput from './NewItemInput';
import BoxesContextType from '../context/boxes-context.type';
import { BoxesContext } from '../context/boxes-context';
import { Item } from '../models/item.model';
import plus from '../assets/plus.svg';
import deleteIcon from '../assets/delete.svg';
import editIcon from '../assets/edit.svg';

type Props = { box: Box; onRemove: () => void; onEdit: () => void };

export default function BoxViewShort({ box, onRemove, onEdit }: Props) {
  const [toggleNew, setToggleNew] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const { addItem, removeItem } = useContext<BoxesContextType>(BoxesContext);

  const addItemHandler = () => {
    setToggleNew(true);
  };

  const cancelAddingHandler = () => {
    setToggleNew(false);
  };

  const addedItemHandler = (name: string) => {
    setToggleNew(false);
    addItem(box.id, { label: name });
  };

  const removeItemHandler = (item: Item) => {
    removeItem(box.id, item);
  };

  useEffect(() => {
    if (toggleNew) {
      inputRef.current!.focus();
    }
  }, [toggleNew]);

  return (
    <div
      className={`text-gray-700 font-medium bg-${box.color}-400 border-${box.color}-700 hover:bg-${box.color}-300 transition-color duration-300 border-2 rounded min-h-[100px] min-w-[150px] max-w-[280px] ${styles['box']}`}
    >
      <div
        className={`flex flex-row justify-between items-center bg-${box.color}-700 text-white ${styles['box__top']}`}
      >
        <div>{box.label}</div>

        <div className="flex justify-end items-center gap-2">
          <button onClick={onEdit}>
            <img src={editIcon} alt="Edit box" width="19px" />
          </button>
          {!toggleNew && (
            <button onClick={addItemHandler} disabled={toggleNew}>
              <img src={plus} alt="Add item" width="12px" />
            </button>
          )}
        </div>
      </div>

      <div className={`flex flex-wrap gap-2 ${styles['box__body']}`}>
        {toggleNew && (
          <NewItemInput
            onAdded={addedItemHandler}
            onCancel={cancelAddingHandler}
            ref={inputRef}
          />
        )}

        {box.items.map((item, index) => (
          <ItemViewShort
            key={index}
            item={item}
            onRemoveItem={() => removeItemHandler(item)}
          />
        ))}
      </div>

      <div
        className={`flex justify-end items-center gap-2 bg-${box.color}-700 text-white ${styles['box__bottom']}`}
      >
        <button className="flex items-center justify-end" onClick={onRemove}>
          <img src={deleteIcon} alt="Delete box" width="16px" />
        </button>
      </div>
    </div>
  );
}
