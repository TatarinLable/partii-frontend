import React, { useState, useEffect, useRef } from "react";
import styles from "./Header.module.scss";
import logo from "../../assets/logo.png";
import MenuButton from "../MenuButton/MenuButton";
import SideMenu from "../SideMenu/SideMenu";
import AuthModal from "../AuthModal/AuthModal";

interface Props {
  active: "home" | "about" | "projects" | "contacts";
  onNav: (id: "home" | "about" | "projects" | "contacts") => void;
  scrollProgress?: number;
  onToggleMenu?: () => void;
  menuOpen?: boolean;
  darkMode: boolean;
  onToggleTheme: () => void;
}

const Header: React.FC<Props> = ({
  active,
  onNav,
  scrollProgress = 0,
  onToggleMenu,
  menuOpen = false,
  darkMode,
  onToggleTheme,
}) => {
  const [authOpen, setAuthOpen] = useState(false);
  const [user, setUser] = useState<string | null>(null);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const savedUser = localStorage.getItem("userName");
    if (savedUser) setUser(savedUser);
  }, []);

  // закрытие мини-меню при клике вне
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setShowUserMenu(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("userName");
    setUser(null);
    setShowUserMenu(false);
  };

  return (
    <>
      <header className={`${styles.header} ${menuOpen ? styles.shifted : ""}`}>
        {/* Левая часть */}
        <div className={styles.left}>
          <img src={logo} alt="logo" className={styles.logo} />
          <MenuButton onClick={onToggleMenu} />
        </div>

        {/* Центральная часть — просто название активной секции */}
        <div className={styles.center}>
          <button
            className={styles.pill}
            style={
              { "--scroll-progress": scrollProgress } as React.CSSProperties
            }
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

        {/* Правая часть */}
        <div className={styles.right} ref={menuRef}>
          {/* ТУМБЛЕР */}
          <label className={styles.switch}>
            <input
              type="checkbox"
              checked={darkMode}
              onChange={onToggleTheme}
            />
            <span className={styles.slider}></span>
          </label>

          {/* Кнопка входа / профиль */}
          {user ? (
            <div className={styles.userMenuWrapper}>
              <button
                className={styles.userButton}
                onClick={() => setShowUserMenu((prev) => !prev)}
              >
                Hi, {user}
              </button>

              {showUserMenu && (
                <div className={styles.dropdown}>
                  <button onClick={() => alert("Профиль скоро будет!")}>
                    Profile
                  </button>
                  <button onClick={handleLogout}>Logout</button>
                </div>
              )}
            </div>
          ) : (
            <button className={styles.login} onClick={() => setAuthOpen(true)}>
              Log in
            </button>
          )}
        </div>
      </header>

      {/* Меню сбоку */}
      <SideMenu
        open={menuOpen}
        onClose={onToggleMenu || (() => {})}
        onNav={onNav}
      />

      {/* Модалка входа */}
      {authOpen && (
        <AuthModal
          onClose={() => setAuthOpen(false)}
          onLogin={(name) => {
            setUser(name);
            setAuthOpen(false);
          }}
        />
      )}
    </>
  );
};

export default Header;