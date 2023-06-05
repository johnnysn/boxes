import { ReactNode, useEffect } from 'react';
import { createPortal } from 'react-dom';
import styles from './Modal.module.css';

type Props = { children: ReactNode, onCancel?: () => void };

const portalElement = document.getElementById('overlays')!;

export default function Modal({ children, onCancel }: Props) {
  useEffect(() => {
    const keyDownHandler  = (event: KeyboardEvent) => {
      if (event.key == 'Escape') {
        if (onCancel) onCancel();
      }
    };

    document.addEventListener('keydown', keyDownHandler, false);
    return () => document.removeEventListener('keydown', keyDownHandler, false);
  }, [onCancel]);

  return createPortal(
    <>
      <div className={styles.backdrop} onClick={onCancel}></div>
      <div className={`${styles.modal} bg-white rounded-sm shadow-lg py-4 px-6`}>
        {children}
      </div>
    </>,
    portalElement
  );
}
