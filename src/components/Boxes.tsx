import { Box, IBox } from '../models/box.model';
import BoxView from './BoxView/BoxView';

type Props = {
  boxes: Box[];
  onEdit: (boxData: IBox) => void;
  onRemove: (boxId: string) => void;
  onSelect: (boxId: string) => void;
};

export default function Boxes({ boxes, onEdit, onRemove, onSelect }: Props) {
  return (
    <div className="flex flex-row flex-wrap items-start md:justify-start justify-center gap-4">
      {boxes.length > 0 ? (
        boxes.map((box, index) => (
          <div
            className="min-h-[100px] min-w-[150px] max-w-[280px]"
            key={index}
            onDoubleClick={() => onSelect(box.id)}
          >
            <BoxView
              box={box}
              onEdit={() => onEdit(box)}
              onRemove={onRemove}
              onSelect={onSelect}
            />
          </div>
        ))
      ) : (
        <p>Your current collection of boxes is empty. Start adding boxes so you can have lots of fun!</p>
      )}
    </div>
  );
}
