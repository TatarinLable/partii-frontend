import React, { useEffect, useState } from "react";
import styles from "./Header.module.scss";
import logo from "../../assets/logo.svg";

interface Props {
  active: "home" | "about" | "projects" | "contacts";
  onNav: (id: "home" | "about" | "projects" | "contacts") => void;
}

const sectionNames: Record<Props["active"], string> = {
  home: "Главная страница",
  about: "Обо мне",
  projects: "Проекты",
  contacts: "Контакты",
};

const Header: React.FC<Props> = ({ active, onNav }) => {
  const [fadeKey, setFadeKey] = useState(active);
  const [showSubtitle, setShowSubtitle] = useState(false);

  useEffect(() => {
    setFadeKey(active);
    setShowSubtitle(false);
    const timer = setTimeout(() => setShowSubtitle(true), 200);
    return () => clearTimeout(timer);
  }, [active]);

  return (
    <header className={styles.header}>
      <div className={styles.left}>
        <img src={logo} alt="logo" className={styles.logo} />
        <div className={styles.menu}>
          <div className={styles.menuText}>menu</div>
          <div className={styles.bars}>≡</div>
        </div>
      </div>

      <div className={styles.center}>
       <button
  className={`${styles.pill} ${active ? styles.active : ""}`}
  onClick={() => onNav(active)}
>
  <span key={fadeKey}>
    {active === "home"
      ? "Home"
      : active === "about"
      ? "About"
      : active === "projects"
      ? "Portfolio"
      : "Contacts"}
  </span>
</button>

        <div
          key={fadeKey + "-desc"}
          className={`${styles.subText} ${showSubtitle ? styles.visible : ""}`}
        >
          {sectionNames[active]}
        </div>
      </div>

      <div className={styles.right}>
        <button className={styles.login} onClick={() => onNav("contacts")}>
          Log in
        </button>
      </div>
    </header>
  );
};

export default Header;