import { useEffect, useRef, useState } from 'react';
import { Box } from '../models/box.model';
import ItemViewShort from './ItemViewShort';
import NewItemInput from './NewItemInput';

type Props = { box: Box };

export default function BoxViewShort({ box }: Props) {
  const [toggleNew, setToggleNew] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const addItemHandler = () => {
    setToggleNew(true);
  };

  const cancelAddingHandler = () => {
    setToggleNew(false);
  };

  const addedItemHandler = (name: string) => {
    setToggleNew(false);
  };

  useEffect(() => {
    if (toggleNew) {
      inputRef.current!.focus();
    }
  }, [toggleNew]);

  return (
    <div
      className={`py-2 px-4 text-gray-700 font-medium bg-${box.color}-400 border-${box.color}-700 hover:bg-${box.color}-300 transition-color duration-300 border-2 rounded min-h-[100px] max-w-[280px] flex flex-col`}
    >
      <div className="flex flex-row justify-between items-center gap-2 mb-2">
        <div>{box.label}</div>
        {!toggleNew && (
          <button
            className="text-xl rounded-full h-[32px] w-[32px]"
            onClick={addItemHandler}
          >
            +
          </button>
        )}
      </div>

      <div className="flex flex-wrap gap-2">
        {toggleNew && (
          <NewItemInput
            onAdded={addedItemHandler}
            onCancel={cancelAddingHandler}
            ref={inputRef}
          />
        )}

        {box.items.map((item, index) => (
          <ItemViewShort key={index} item={item} />
        ))}
      </div>
    </div>
  );
}
