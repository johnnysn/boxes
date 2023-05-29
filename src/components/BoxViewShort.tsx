import { Box } from '../models/box.model';
import ItemViewShort from './ItemViewShort';

type Props = { box: Box };

export default function BoxViewShort({ box }: Props) {

  return (
    <div
      className={`py-2 px-4 text-gray-700 font-medium bg-${box.color}-400 border-${box.color}-700 hover:bg-${box.color}-300 transition-color duration-300 border-2 rounded min-h-[100px] max-w-[280px] flex flex-col`}
    >
      <div className='mb-2'>{box.label}</div>

      <div className="flex flex-wrap gap-2">
        {box.items.map((item, index) => (
          <ItemViewShort key={index} item={item} />
        ))}
      </div>
    </div>
  );
}
