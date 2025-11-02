import React, { useState } from "react";
import styles from "./MenuButton.module.scss";

interface Props {
  onClick?: () => void;
}

const MenuButton: React.FC<Props> = ({ onClick }) => {
  const [active, setActive] = useState(false);

  const toggle = () => {
    setActive(!active);
    onClick?.();
  };

  return (
    <button
      className={`${styles.menuButton} ${active ? styles.active : ""}`}
      onClick={toggle}
      aria-label="Меню"
    >
      <span className={styles.line}></span>
    </button>
  );
};

export default MenuButton;