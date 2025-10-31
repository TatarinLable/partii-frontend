import React from "react";
import styles from "./About.module.scss";

const About: React.FC = () => {
  return (
    <div className={styles.container}>
      <h2>Обо мне</h2>
      <p>Небольшое описание — где ты, чем занимаешься, технологии и т.д.</p>
    </div>
  );
};

export default About;