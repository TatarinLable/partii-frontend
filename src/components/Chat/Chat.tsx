import React, { useState, useRef, useEffect } from "react";
import styles from "./Chat.module.scss";

interface Props {
  onCommand?: (text: string) => void;
}

const hints = ["Хочу сайт", "Покажи портфолио", "Как заказать"];

const Chat: React.FC<Props> = ({ onCommand }) => {
  const [messages, setMessages] = useState<{ from: "user" | "bot"; text: string }[]>([
    { from: "bot", text: "Привет! Я могу помочь — спроси меня или выбери подсказку." }
  ]);
  const [value, setValue] = useState("");
  const boxRef = useRef<HTMLDivElement | null>(null);

  const send = (text: string) => {
    if (!text.trim()) return;
    setMessages((m) => [...m, { from: "user", text }]);
    setValue("");
    // Fake bot logic
    setTimeout(() => {
      setMessages((m) => [
        ...m,
        { from: "bot", text: text.toLowerCase().includes("портф") ? "Смотри раздел Портфолио ниже." : "Спасибо! Я могу создать заявку — напиши 'заявка'." }
      ]);
      if (onCommand) onCommand(text);
    }, 600);
  };

  useEffect(() => {
    const el = boxRef.current;
    if (el) el.scrollTop = el.scrollHeight;
  }, [messages]);

  return (
    <div className={styles.chat}>
      <div className={styles.window} ref={boxRef}>
        {messages.map((m, i) => (
          <div key={i} className={`${styles.msg} ${m.from === "user" ? styles.user : styles.bot}`}>
            {m.text}
          </div>
        ))}
      </div>

      <div className={styles.inputRow}>
        <input
          value={value}
          onChange={(e) => setValue(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && send(value)}
          placeholder="Напишите сообщение..."
        />
        <button onClick={() => send(value)}>Отправить</button>
      </div>

      <div className={styles.hints}>
        {hints.map((h) => (
          <button key={h} onClick={() => send(h)}>
            {h}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Chat;








