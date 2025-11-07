// src/sections/Hero/Hero.tsx
import React, { useState } from "react";
import ChatBox from "../../components/ChatBox/ChatBox";
import styles from "./Hero.module.scss";

interface Props {
  onCommand?: (text: string) => void;
  onOpenAuth?: () => void;
}

const Hero: React.FC<Props> = ({ onCommand, onOpenAuth }) => {
  const [focused, setFocused] = useState(false);

  return (
    <section className={`${styles.heroWrap} ${focused ? styles.focused : ""}`}>
      <div className={styles.centerArea}>
        <div className={styles.circleDecor}></div>
        <h1 className={styles.title}>Чем могу помочь?</h1>
        <div className={styles.chatContainer}>
          <ChatBox onCommand={onCommand} onOpenAuth={onOpenAuth} />
        </div>
      </div>
    </section>
  );
};

export default Hero;