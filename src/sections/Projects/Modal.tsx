import React from "react";
import styles from "./Modal.module.scss";

interface Props {
  children: React.ReactNode;
  onClose: () => void;
}

const Modal: React.FC<Props> = ({ children, onClose }) => {
  return (
    <div className={styles.backdrop} onClick={onClose}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        <button className={styles.close} onClick={onClose}>
          ✕
        </button>
        {children}
      </div>
    </div>
  );
};

export default Modal;