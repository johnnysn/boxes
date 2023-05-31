import { Item } from '../models/item.model';

type Props = { item: Item, onRemoveItem: (item: Item) => void };

export default function ItemViewShort({ item, onRemoveItem }: Props) {
  const removeClickHandler = () => {
    onRemoveItem(item);
  };

  return (
    <div className="rounded-lg text-sm bg-gray-700 hover:bg-gray-600 text-white font-medium py-1 px-2 flex gap-2">
      <span>{item.label}</span>
      <button className='font-semibold' type='button' onClick={removeClickHandler}>x</button>
    </div>
  );
}
