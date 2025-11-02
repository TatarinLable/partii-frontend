import React, { useState } from "react";
import styles from "./ChatInput.module.scss";

interface Props {
  onSend?: (text: string) => void;
}

const hints = [
  { label: "Хочу сайт", hint: "Закажи разработку сайта прямо в чате" },
  { label: "Бот для тг", hint: "Узнай как заказать Telegram-бота" },
  { label: "Дизайн", hint: "Закажи дизайн сайта или бренда" }
];

const ChatInput: React.FC<Props> = ({ onSend }) => {
  const [value, setValue] = useState("");
  const [messages, setMessages] = useState<{from: string; text: string}[]>([]);

  const send = (text?: string) => {
    const t = (text ?? value).trim();
    if (!t) return;
    setMessages((m)=>[...m, {from: "user", text: t}]);
    setValue("");
    // fake reply
    setTimeout(()=>{
      setMessages((m)=>[...m, {from:"bot", text: "Спасибо! Я могу принять заявку — напишите 'заявка' или выберите подсказку."}]);
    }, 600);

    if (onSend) onSend(t);
  };

  return (
    <div className={styles.wrap}>
      <div className={styles.inputRow}>
        <button className={styles.plus} aria-hidden>+</button>
        <input
          value={value}
          onChange={(e)=>setValue(e.target.value)}
          placeholder="Спросите что нибудь"
          onKeyDown={(e)=> e.key === "Enter" && send()}
        />
        <button className={styles.send} onClick={()=>send()} aria-label="Отправить">↑</button>
      </div>

      <div className={styles.hints}>
        {hints.map(h=>(
          <div key={h.label} className={styles.hintItem} onClick={()=>send(h.label)}>
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