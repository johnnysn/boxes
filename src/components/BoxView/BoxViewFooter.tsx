import deleteIcon from '../../assets/delete.svg';
import { Box } from '../../models/box.model';
import styles from './BoxView.module.css';

type Props = { onRemove: (id: string) => void, box: Box };

export default function BoxViewFooter({box, onRemove}: Props) {
  return (
    <div
      className={`flex justify-end items-center gap-2 bg-${box.color}-700 text-white ${styles['box__bottom']}`}
    >
      <button
        className="flex items-center justify-end"
        onClick={() => onRemove(box.id)}
      >
        <img src={deleteIcon} alt="Delete box" width="16px" />
      </button>
    </div>
  );
}
