import React from "react";
import styles from "./SideMenu.module.scss";

interface Props {
  open: boolean;
  onClose: () => void;
  onNav: (id: "home" | "about" | "projects" | "contacts") => void;
  active?: "home" | "about" | "projects" | "contacts";
}

const SideMenu: React.FC<Props> = ({ open, onClose, onNav, active }) => {
  return (
    <div className={`${styles.sideMenu} ${open ? styles.open : ""}`}>
      <div className={styles.menuTop}>
        <div
          className={`${styles.menuItem} ${active === "home" ? styles.active : ""}`}
          onClick={() => { onNav("home"); onClose(); }}
        >
          🏠 Главная
        </div>
        <div
          className={`${styles.menuItem} ${active === "about" ? styles.active : ""}`}
          onClick={() => { onNav("about"); onClose(); }}
        >
          👤 Обо мне
        </div>
        <div
          className={`${styles.menuItem} ${active === "projects" ? styles.active : ""}`}
          onClick={() => { onNav("projects"); onClose(); }}
        >
          💼 Проекты
        </div>
        <div
          className={`${styles.menuItem} ${active === "contacts" ? styles.active : ""}`}
          onClick={() => { onNav("contacts"); onClose(); }}
        >
          ✉️ Контакты
        </div>
      </div>

      <div className={styles.menuBottom}>
        <div className={styles.menuItem}>Настройки</div>
        <div className={styles.menuItem}>Помощь</div>
        <div className={styles.menuItem}>Выйти</div>
      </div>
    </div>
  );
};

export default SideMenu;