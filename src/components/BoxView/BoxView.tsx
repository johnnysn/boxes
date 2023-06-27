import { useContext, useEffect, useRef, useState } from 'react';
import styles from './BoxView.module.css';
import { Box } from '../../models/box.model';
import NewItemInput from './NewItemInput';
import BoxesContextType from '../../context/boxes-context.type';
import { BoxesContext } from '../../context/boxes-context';
import { Item } from '../../models/item.model';
import BoxViewContent from './BoxViewContent';
import BoxViewHeader from './BoxViewHeader';
import BoxViewFooter from './BoxViewFooter';

type Props = {
  box: Box;
  full?: boolean;
  onRemove: (boxId: string) => void;
  onEdit?: () => void;
  onSelect: (boxId: string) => void;
};

export default function BoxView({box, full, onRemove, onSelect, onEdit}: Props) {
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
      className={`text-gray-700 font-medium bg-${box.color}-400 border-${box.color}-700 hover:bg-${box.color}-300 transition-color duration-300 border-2 rounded ${styles['box']}`}
    >
      <BoxViewHeader
        toggleNew={toggleNew}
        onAddItem={addItemHandler}
        onEdit={onEdit}
        onSelect={onSelect}
        box={box}
      />

      <div className="flex flex-col">
        {toggleNew && (
          <NewItemInput
            onAdded={addedItemHandler}
            onCancel={cancelAddingHandler}
            ref={inputRef}
          />
        )}

        <BoxViewContent
          box={box}
          onRemoveItem={removeItemHandler}
          onSelect={onSelect}
          onRemove={onRemove}
          full={full}
        />
      </div>

      <BoxViewFooter box={box} onRemove={onRemove} />
    </div>
  );
}
