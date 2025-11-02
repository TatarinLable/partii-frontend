import React, { useEffect, useState } from "react";
import styles from "./Preloader.module.scss";

const Preloader: React.FC = () => {
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setHidden(true);
    }, 2000); // 2 секунды до исчезновения
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className={`${styles.preloader} ${hidden ? styles.hidden : ""}`}>
      <div className={styles.loaderWrapper}>
        <div className={styles.spinner}></div>
        <div className={styles.cursor}>▮</div>
      </div>
    </div>
  );
};

export default Preloader;