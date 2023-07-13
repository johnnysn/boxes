import { Box } from '../models/box.model';
import { Item } from '../models/item.model';

type StorageBox = {
  id: string;
  label: string;
  description: string;
  color: string;
  items: Item[];
  boxesIds: string[];
};

export const storeBoxesIntoLocalStorage = (boxes: Box[]) => {
  localStorage.setItem(
    'boxes',
    JSON.stringify(
      boxes.map((box) => {
        return {
          id: box.id,
          label: box.label,
          description: box.description,
          color: box.color,
          items: box.items,
          boxesIds: box.boxes.map((b) => b.id),
        };
      })
    )
  );
};

export const retrieveBoxesFromLocalStorage = (): Box[] => {
  const _boxes: StorageBox[] = JSON.parse(localStorage.getItem('boxes') || '[]');
  const boxes = _boxes.map(_b => new Box(_b.id, _b.label, _b.color, _b.description, _b.items));

  for (let i = 0; i < _boxes.length; i++) {
    if (_boxes[i].boxesIds.length > 0) {
      for (let _subBoxId of _boxes[i].boxesIds) {
        const referredBox = boxes.find(b => b.id === _subBoxId)!;
        boxes[i].addBox(referredBox);
        referredBox.parent = boxes[i];
      }
    }
  }

  return boxes;
};
