import React, { useEffect, useRef, useState } from "react";
import Header from "./components/Header/Header";
import SideMenu from "./components/SideMenu/SideMenu";
import Hero from "./sections/Hero/Hero";
import About from "./sections/About/About";
import Projects from "./sections/Projects/Projects";
import Contacts from "./sections/Contacts/Contacts";
import Preloader from "./components/Preloader/Preloader";
import AuthModal from "./components/AuthModal/AuthModal";
import { ThemeProvider, useTheme } from "./context/ThemeContext";
import styles from "./App.module.scss";

const SHOW_PRELOADER = false;

// 🧩 Отдельный компонент, чтобы получить доступ к теме внутри ThemeProvider
const AppContent: React.FC = () => {
  const [active, setActive] = useState<"home" | "about" | "projects" | "contacts">("home");
  const [menuOpen, setMenuOpen] = useState(false);
  const [authOpen, setAuthOpen] = useState(false);

  const { darkMode, toggleTheme } = useTheme(); // ✅ получаем тему из контекста

  const refs = {
    home: useRef<HTMLElement | null>(null),
    about: useRef<HTMLElement | null>(null),
    projects: useRef<HTMLElement | null>(null),
    contacts: useRef<HTMLElement | null>(null),
  };

  const scrollTo = (id: keyof typeof refs) => {
    refs[id].current?.scrollIntoView({ behavior: "smooth", block: "start" });
    setMenuOpen(false);
  };

  return (
    <div className={`${styles.appWrapper} ${menuOpen ? styles.shifted : ""}`}>
      <Header
        active={active}
        onNav={scrollTo}
        onToggleMenu={() => setMenuOpen(!menuOpen)}
        menuOpen={menuOpen}
        darkMode={darkMode}
        onToggleTheme={toggleTheme}
      />

      <SideMenu open={menuOpen} onClose={() => setMenuOpen(false)} onNav={scrollTo} />

      <main>
        <section data-section="home" id="home" ref={refs.home}>
          <Hero onCommand={scrollTo} onOpenAuth={() => setAuthOpen(true)} />
        </section>

        <section data-section="about" ref={refs.about}>
          <About />
        </section>

        <section data-section="projects" id="projects" ref={refs.projects}>
          <Projects />
        </section>

        <section data-section="contacts" ref={refs.contacts}>
          <Contacts />
        </section>
      </main>

      {authOpen && (
        <AuthModal
          onClose={() => setAuthOpen(false)}
          onLogin={(name: string) => {
            localStorage.setItem("userName", name);
            setAuthOpen(false);
          }}
        />
      )}
    </div>
  );
};

// 🔥 Оборачиваем всё в ThemeProvider
const App: React.FC = () => {
  const [loading, setLoading] = useState(SHOW_PRELOADER);

  useEffect(() => {
    if (SHOW_PRELOADER) {
      const timer = setTimeout(() => setLoading(false), 1300);
      return () => clearTimeout(timer);
    } else {
      setLoading(false);
    }
  }, []);

  return (
    <ThemeProvider>
      {loading && <Preloader />}
      {!loading && <AppContent />}
    </ThemeProvider>
  );
};

export default App;