import { Item } from '../models/item.model';

type Props = { item: Item };

export default function ItemViewShort({ item }: Props) {
  return (
    <div className="rounded-lg text-sm bg-gray-700 hover:bg-gray-600 text-white font-medium py-1 px-2">
      {item.label}
    </div>
  );
}
