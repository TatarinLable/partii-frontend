import React from "react";
import styles from "./About.module.scss";
import portrait from "/src/assets/hero.jpg"; // твоя иллюстрация

const skills = [
  { name: "Adobe", icon: "/src/assets/adobe.png" },
  { name: "Illustrator", icon: "/src/assets/illustrator.png" },
  { name: "Premiere", icon: "/src/assets/premiere.png" },
  { name: "Figma", icon: "/src/assets/figma.png" },
  { name: "Lemma", icon: "/src/assets/lemma.pns" },
];

const About = () => {
  return (
    <section className={styles.about} id="about">
      <div className={styles.header}>
        <h2 className={styles.title}>About</h2>
        <p className={styles.subTitle}>Обо мне</p>
      </div>

      <div className={styles.content}>
        <div className={styles.imageWrap}>
          <img src={portrait} alt="portrait" className={styles.image} />
        </div>

        <div className={styles.text}>
          <p className={styles.chapter}>Chapter for my</p>
          <h3 className={styles.name}>Hi, my name is <span>Artem</span></h3>
          <p className={styles.description}>
            Whether we're meeting someone, applying for a job, or simply trying
            to introduce ourselves, we need to be able to communicate effectively.
            The key difference lies in the information we choose to share in
            different situations.
          </p>

          <div className={styles.dots}>
            <span className={`${styles.dot} ${styles.active}`}></span>
            <span className={styles.dot}></span>
            <span className={styles.dot}></span>
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