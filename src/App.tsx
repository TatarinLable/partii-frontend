import React, { useEffect, useRef, useState } from "react";
import Header from "./components/Header/Header";
import Hero from "./sections/Hero/Hero";
import About from "./sections/About/About";
import Projects from "./sections/Projects/Projects";
import Contacts from "./sections/Contacts/Contacts";

const App: React.FC = () => {
  const [active, setActive] = useState<"home" | "about" | "projects" | "contacts">("home");

  const refs = {
    home: useRef<HTMLElement | null>(null),
    about: useRef<HTMLElement | null>(null),
    projects: useRef<HTMLElement | null>(null),
    contacts: useRef<HTMLElement | null>(null),
  };

  const scrollTo = (id: keyof typeof refs) => {
    refs[id].current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.find((e) => e.isIntersecting);
        if (visible) setActive(visible.target.getAttribute("data-section") as any);
      },
      { threshold: 0.5 }
    );

    Object.values(refs).forEach((r) => {
      if (r.current) observer.observe(r.current);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <>
      <Header active={active} onNav={scrollTo} />
      <main>
        <section data-section="home" ref={refs.home}>
          <Hero
            onCommand={(txt) => {
              const lower = txt.toLowerCase();
              if (lower.includes("портф")) scrollTo("projects");
              if (lower.includes("контакт") || lower.includes("заяв")) scrollTo("contacts");
              if (lower.includes("обо")) scrollTo("about");
            }}
          />
        </section>

        <section data-section="about" ref={refs.about}>
          <About />
        </section>

        <section data-section="projects" ref={refs.projects}>
          <Projects />
        </section>

        <section data-section="contacts" ref={refs.contacts}>
          <Contacts />
        </section>
      </main>
    </>
  );
};

export default App;