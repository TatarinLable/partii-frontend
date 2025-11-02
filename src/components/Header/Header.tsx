import React, { useState } from "react";
import styles from "./Header.module.scss";
import logo from "../../assets/logo.png";
import MenuButton from "../MenuButton/MenuButton";
import SideMenu from "../SideMenu/SideMenu";

interface Props {
  active: "home" | "about" | "projects" | "contacts";
  onNav: (id: "home" | "about" | "projects" | "contacts") => void;
  scrollProgress?: number;
}

const Header: React.FC<Props> = ({ active, onNav, scrollProgress = 0 }) => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <>
      <header className={`${styles.header} ${menuOpen ? styles.shifted : ""}`}>
        <div className={styles.left}>
          <img src={logo} alt="logo" className={styles.logo} />
          <MenuButton onClick={() => setMenuOpen(!menuOpen)} />
        </div>

        <div className={styles.center}>
          <button
            className={styles.pill}
            style={{ "--scroll-progress": scrollProgress } as React.CSSProperties}
            onClick={() => onNav(active)}
          >
            {active === "home"
              ? "Home"
              : active === "about"
              ? "About"
              : active === "projects"
              ? "Portfolio"
              : "Contacts"}
          </button>
        </div>

        <div className={styles.right}>
          <button className={styles.login} onClick={() => onNav("contacts")}>
            Log in
          </button>
        </div>
      </header>

      {/* Меню */}
      <SideMenu open={menuOpen} onClose={() => setMenuOpen(false)} onNav={onNav} />
    </>
  );
};

export default Header;