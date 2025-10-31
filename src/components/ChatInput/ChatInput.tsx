import React, { useState } from "react";
import styles from "./ChatInput.module.scss";

interface Props {
  onSend?: (text: string) => void;
}

const hints = [
  { label: "Хочу сайт", hint: "Закажи разработку сайта прямо в чате" },
  { label: "Бот для тг", hint: "Узнай как заказать Telegram-бота" },
  { label: "Дизайн", hint: "Закажи дизайн сайта или бренда" },
];

const ChatInput: React.FC<Props> = ({ onSend }) => {
  const [value, setValue] = useState("");

  const send = (text?: string) => {
    const t = (text ?? value).trim();
    if (!t) return;
    setValue("");
    onSend?.(t);
  };

  return (
    <div className={styles.wrap}>
      <div className={styles.inputRow}>
        <button className={styles.plus}>+</button>
        <input
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder="Спросите что нибудь"
          onKeyDown={(e) => e.key === "Enter" && send()}
        />
        <button className={styles.send} onClick={() => send()}>↑</button>
      </div>

      <div className={styles.hints}>
        {hints.map((h) => (
          <div key={h.label} className={styles.hintItem} onClick={() => send(h.label)}>
            <div className={styles.hintIcon}>▣</div>
            <div className={styles.hintText}>
              <b>{h.label}</b> - <span>{h.hint}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ChatInput;