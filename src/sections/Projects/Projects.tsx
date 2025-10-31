import React from "react";
import styles from "./Projects.module.scss";

const Projects: React.FC = () => {
  return (
    <div className={styles.wrap}>
      <h2>Портфолио</h2>
      <div className={styles.grid}>
        {Array.from({length:4}).map((_,i)=>(<div key={i} className={styles.card}>Проект {i+1}</div>))}
      </div>
    </div>
  );
};

export default Projects;