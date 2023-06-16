import { Box, IBox } from '../models/box.model';
import BoxViewShort from './BoxViewShort';

type Props = { boxes: Box[]; onEdit: (boxData: IBox) => void; onRemove: (boxId: string) => void };

export default function Boxes({ boxes, onEdit, onRemove }: Props) {
  return (
    <div className="flex flex-row flex-wrap md:justify-start justify-center gap-4 max-w-screen-lg">
      {boxes.map((box, index) => (
        <BoxViewShort
          key={index}
          box={box}
          onEdit={() => onEdit(box)}
          onRemove={() => onRemove(box.id)}
        />
      ))}
    </div>
  );
}
