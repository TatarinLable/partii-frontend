import React, { useState } from "react";
import styles from "./About.module.scss";
import portrait from "/src/assets/hero.jpg"; // твоя иллюстрация

const texts = [
  {
    chapter: "Chapter One",
    title: "Hi, my name is Artem",
    desc: "I’m a digital designer who values clarity, storytelling and elegant visual systems. My focus is creating expressive experiences that connect aesthetics and usability.",
  },
  {
    chapter: "Chapter Two",
    title: "What I do",
    desc: "I create branding, interfaces, and motion for digital products. My approach combines structure, empathy, and aesthetics to bring ideas to life.",
  },
  {
    chapter: "Chapter Three",
    title: "My goal",
    desc: "To design thoughtful experiences that help people interact with technology more naturally — with less noise, more meaning, and emotion.",
  },
];

const skills = [
  { name: "Adobe", icon: "/src/assets/adobe.png" },
  { name: "Illustrator", icon: "/src/assets/illustrator.png" },
  { name: "Premiere", icon: "/src/assets/premiere.png" },
  { name: "Figma", icon: "/src/assets/figma.png" },
  { name: "Lemma", icon: "/src/assets/lemma.png" },
];

const About = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const active = texts[activeIndex];

  return (
    <section className={styles.about} id="about">
      <div className={styles.header}>
        <h2 className={styles.title}>About</h2>
        <p className={styles.subTitle}>Обо мне</p>
      </div>

      <div className={styles.content}>
        <div className={styles.imageWrap}>
          <img src={portrait} alt="portrait" loading="lazy" className={styles.image} />
        </div>

        <div className={styles.text}>
          <p className={styles.chapter}>{active.chapter}</p>
          <h3 className={styles.name}>
            {active.title.split(" ").map((word, i) =>
              word === "Artem" ? <span key={i}>{word} </span> : `${word} `
            )}
          </h3>
          <p className={styles.description}>{active.desc}</p>

          <div className={styles.dots}>
            {texts.map((_, i) => (
              <span
                key={i}
                className={`${styles.dot} ${i === activeIndex ? styles.active : ""}`}
                onClick={() => setActiveIndex(i)}
              ></span>
            ))}
          </div>
        </div>
      </div>

      <div className={styles.skills}>
        {skills.map((item, i) => (
          <div className={styles.card} key={i}>
            <img src={item.icon} alt={item.name} />
            <span>{item.name}</span>
          </div>
        ))}
      </div>
    </section>
  );
};

export default About;