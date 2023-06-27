import styles from './BoxView.module.css';
import plus from '../../assets/plus.svg';
import editIcon from '../../assets/edit.svg';
import { Box } from '../../models/box.model';

type Props = {
  box: Box;
  toggleNew: boolean;
  onSelect: (id: string) => void;
  onEdit?: () => void;
  onAddItem: () => void;
};

export default function BoxViewHeader({box, toggleNew, onSelect, onEdit, onAddItem}: Props) {
  return (
    <div
      className={`flex flex-row justify-between items-center bg-${box.color}-700 text-white ${styles['box__top']}`}
    >
      <div
        className="cursor-pointer mr-2"
        onClick={() => onSelect(box.id)}
      >
        {box.label}
      </div>

      <div className="flex justify-end items-center gap-2">
        {onEdit && (
          <button onClick={onEdit}>
            <img src={editIcon} alt="Edit box" width="19px" />
          </button>
        )}
        {!toggleNew && (
          <button onClick={onAddItem} disabled={toggleNew}>
            <img src={plus} alt="Add item" width="12px" />
          </button>
        )}
      </div>
    </div>
  );
}
