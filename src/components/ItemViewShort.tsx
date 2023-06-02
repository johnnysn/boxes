import { Item } from '../models/item.model';
import close from '../assets/close.svg';

type Props = { item: Item, onRemoveItem: (item: Item) => void };

export default function ItemViewShort({ item, onRemoveItem }: Props) {
  const removeClickHandler = () => {
    onRemoveItem(item);
  };

  return (
    <div className="rounded-lg text-sm bg-gray-700 hover:bg-gray-600 text-white font-medium py-1 px-2 flex items-center gap-2 h-[32px]">
      <div>{item.label}</div>
      <button className='font-semibold' type='button' onClick={removeClickHandler}>
        <img src={close} alt="Remove item" width="10px" height="10px" />
      </button>
    </div>
  );
}
