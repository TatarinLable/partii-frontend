import React, { useState, useEffect, useRef } from "react";
import styles from "./ChatBox.module.scss";

interface Props {
  onCommand?: (text: string) => void;
}

const hints = [
  { label: "Хочу сайт", hint: "Закажи разработку сайта прямо в чате" },
  { label: "Бот для тг", hint: "Узнай как заказать Telegram-бота" },
  { label: "Дизайн", hint: "Закажи дизайн сайта или бренда" },
];

const ChatBox: React.FC<Props> = ({ onCommand }) => {
  const [messages, setMessages] = useState<{ from: "user" | "bot"; text: string }[]>([
    { from: "bot", text: "Привет! Я могу помочь — спроси меня или выбери подсказку 👇" },
  ]);
  const [value, setValue] = useState("");
  const [collapsed, setCollapsed] = useState(false);

  // 💡 два разных ref
  const chatRef = useRef<HTMLDivElement | null>(null);   // весь чат
  const windowRef = useRef<HTMLDivElement | null>(null); // только окно сообщений

  // автоскролл к последнему сообщению
  useEffect(() => {
    const el = windowRef.current;
    if (el && !collapsed) {
      el.scrollTop = el.scrollHeight;
    }
  }, [messages, collapsed]);

  const send = (text?: string) => {
    const t = (text ?? value).trim();
    if (!t) return;
    setValue("");
    setMessages((m) => [...m, { from: "user", text: t }]);
    onCommand?.(t);

    setTimeout(() => {
      const lower = t.toLowerCase();
      let reply = "Спасибо! Я передам это дальше 🙂";
      if (lower.includes("портф")) reply = "Смотри раздел Портфолио ниже 👇";
      if (lower.includes("контакт") || lower.includes("заяв")) reply = "Открою контакты!";
      if (lower.includes("обо")) reply = "Перехожу к разделу «Обо мне».";
      setMessages((m) => [...m, { from: "bot", text: reply }]);
    }, 420);

    setCollapsed(false);
  };

  // сворачивание при клике вне чата
  useEffect(() => {
    const handlePointerDown = (e: PointerEvent | MouseEvent) => {
      if (!chatRef.current?.contains(e.target as Node)) setCollapsed(true);
    };

    document.addEventListener("pointerdown", handlePointerDown);
    document.addEventListener("touchstart", handlePointerDown);

    return () => {
      document.removeEventListener("pointerdown", handlePointerDown);
      document.removeEventListener("touchstart", handlePointerDown);
    };
  }, []);

  // сворачивание при скролле страницы
  useEffect(() => {
    const handleScroll = () => {
      setCollapsed(true);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const handleFocus = () => setCollapsed(false);
  const visibleMessages = collapsed ? messages.slice(-1) : messages;

  return (
    <div
      className={`${styles.chat} ${collapsed ? styles.collapsed : ""}`}
      ref={chatRef}
    >
      {/* окно сообщений */}
      <div className={styles.window} ref={windowRef}>
        {visibleMessages.map((m, i) => (
          <div
            key={i}
            className={`${styles.msg} ${m.from === "user" ? styles.user : styles.bot}`}
          >
            {m.text}
          </div>
        ))}
      </div>

      {/* строка ввода */}
      <div className={styles.inputRow}>
        <button className={styles.plus}>+</button>
        <input
          value={value}
          onChange={(e) => setValue(e.target.value)}
          onFocus={handleFocus}
          placeholder="Спросите что-нибудь..."
          onKeyDown={(e) => e.key === "Enter" && send()}
        />
        <button className={styles.send} onClick={() => send()}>↑</button>
      </div>

      {/* подсказки */}
      <div className={styles.hints}>
        {hints.map((h) => (
          <div
            key={h.label}
            className={styles.hintItem}
            onClick={() => {
              send(h.label);
              setCollapsed(false);
            }}
          >
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

export default ChatBox;