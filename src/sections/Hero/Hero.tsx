import React from "react";
import ChatInput from "../../components/ChatInput/ChatInput";
import styles from "./Hero.module.scss";

interface Props { onCommand?: (text: string) => void; }

const Hero: React.FC<Props> = ({ onCommand }) => {
  return (
    <div className={styles.heroWrap}>
      <div className={styles.centerArea}>
        <div className={styles.circleDecor} />
        <h1 className={styles.title}>Чем могу помочь?</h1>
        <ChatInput onSend={onCommand} />
      </div>
    </div>
  );
};

export default Hero;