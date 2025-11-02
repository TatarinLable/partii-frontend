import React, { useEffect, useRef, useState } from "react";
import Header from "./components/Header/Header";
import SideMenu from "./components/SideMenu/SideMenu";
import Hero from "./sections/Hero/Hero";
import About from "./sections/About/About";
import Projects from "./sections/Projects/Projects";
import Contacts from "./sections/Contacts/Contacts";
import Preloader from "./components/Preloader/Preloader";
import styles from "./App.module.scss";

const SHOW_PRELOADER = false; // 👈 просто поставь true / false

const App: React.FC = () => {
  const [active, setActive] = useState<"home" | "about" | "projects" | "contacts">("home");
  const [scrollProgress, setScrollProgress] = useState(0);
  const [menuOpen, setMenuOpen] = useState(false);
  const [loading, setLoading] = useState(SHOW_PRELOADER);

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

  useEffect(() => {
    if (SHOW_PRELOADER) {
      const timer = setTimeout(() => setLoading(false), 1300); // ⏱ время загрузки
      return () => clearTimeout(timer);
    } else {
      setLoading(false); // сразу убираем прелоадер
    }
  }, []);

  return (
    <>
      {loading && <Preloader />}
      <div className={`${styles.appWrapper} ${menuOpen ? styles.shifted : ""} ${loading ? styles.blur : ""}`}>
        <Header
          active={active}
          onNav={scrollTo}
          scrollProgress={scrollProgress}
          onToggleMenu={() => setMenuOpen(!menuOpen)}
          menuOpen={menuOpen}
        />

        <SideMenu open={menuOpen} onClose={() => setMenuOpen(false)} onNav={scrollTo} />

        <main>
          <section data-section="home" ref={refs.home}><Hero onCommand={() => {}} /></section>
          <section data-section="about" ref={refs.about}><About /></section>
          <section data-section="projects" ref={refs.projects}><Projects /></section>
          <section data-section="contacts" ref={refs.contacts}><Contacts /></section>
        </main>
      </div>
    </>
  );
};

export default App;