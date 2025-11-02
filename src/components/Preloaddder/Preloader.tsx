import React, { useEffect, useState } from "react";
import styles from "./Preloader.module.scss";
import logo from "../../assets/logo.png";

const Preloader: React.FC = () => {
  const [showDots, setShowDots] = useState(true);
  const [showHello, setShowHello] = useState(false);

  useEffect(() => {
    const dotsTimer = setTimeout(() => {
      setShowDots(false);
    }, 2000); // 2 сек – убираем точки

    const helloTimer = setTimeout(() => {
      setShowHello(true);
    }, 2600); // чуть позже появляется "Привет"

    return () => {
      clearTimeout(dotsTimer);
      clearTimeout(helloTimer);
    };
  }, []);

  return (
    <div className={styles.preloader}>
      <div className={styles.logoWrapper}>
        <img src={logo} alt="logo" className={styles.logo} />

        {showDots && (
          <div className={`${styles.dotPulse} ${!showDots ? styles.fadeOut : ""}`}>
            <span></span>
            <span></span>
            <span></span>
          </div>
        )}

        {showHello && <div className={styles.hello}>Привет</div>}
      </div>
    </div>
  );
};

export default Preloader;