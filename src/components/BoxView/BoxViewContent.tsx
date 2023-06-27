import { Box } from '../../models/box.model';
import { Item } from '../../models/item.model';
import BoxView from './BoxView';
import styles from './BoxView.module.css';
import ItemViewShort from './ItemViewShort';

type Props = {
  box: Box;
  onSelect?: (id: string) => void;
  onRemove?: (id: string) => void;
  onRemoveItem: (item: Item) => void;
  full?: boolean
};

export default function BoxViewContent({ box, onSelect, onRemove, onRemoveItem, full }: Props) {
  return (
    <div
      className={`flex flex-wrap gap-2 ${styles['box__body']} ${
        full === true ? 'max-h-[400px]' : 'max-h-[180px]'
      }  overflow-y-scroll`}
    >
      {box.items.map((item, index) => (
        <ItemViewShort
          key={index}
          item={item}
          onRemoveItem={() => onRemoveItem(item)}
        />
      ))}

      {box.boxes.map((subbox, index) => (
        <div key={index} className="max-w-[300px]">
          <BoxView
            box={subbox}
            onSelect={() => onSelect && onSelect(subbox.id)}
            onRemove={() => onRemove && onRemove(subbox.id)}
          />
        </div>
      ))}
    </div>
  );
}
