import React, { useState, useEffect, useRef } from "react";
import styles from "./ChatBox.module.scss";

interface Props {
  onCommand?: (text: string) => void;
  onOpenAuth?: () => void;
}

interface Message {
  from: "user" | "bot" | "thinking";
  text: string;
}

type ChatStep = "idle" | "askType" | "askBudget" | "askDetails" | "askContact" | "done";

interface ChatForm {
  type?: string;
  budget?: string;
  details?: string;
  contact?: string;
}

const hints = [
  { label: "Хочу сайт", hint: "Создать сайт прямо в чате" },
  { label: "Дизайн", hint: "Заказать дизайн или UI" },
  { label: "Бот", hint: "Заказать Telegram-бота" },
];

const ChatBox: React.FC<Props> = ({ onCommand, onOpenAuth }) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [value, setValue] = useState("");
  const [collapsed, setCollapsed] = useState(false);
  const [step, setStep] = useState<ChatStep>("idle");
  const [form, setForm] = useState<ChatForm>({});
  const [requests, setRequests] = useState<ChatForm[]>([]);

  const chatRef = useRef<HTMLDivElement | null>(null);
  const windowRef = useRef<HTMLDivElement | null>(null);

  // приветствие
  useEffect(() => {
    const userName = localStorage.getItem("userName");
    const greet = userName
      ? `Привет, ${userName}! Я помогу оформить заявку или ответить на вопросы 👇`
      : "Привет! Я помогу оформить заявку или ответить на вопросы 👇";
    setMessages([{ from: "bot", text: greet }]);
  }, []);

  // автоскролл
  useEffect(() => {
    const el = windowRef.current;
    if (el && !collapsed) el.scrollTop = el.scrollHeight;
  }, [messages, collapsed]);

  const botThink = () => {
    setMessages((m) => [...m, { from: "thinking", text: "..." }]);
  };

  const botReply = (text: string, delay = 1000) => {
    setTimeout(() => {
      setMessages((m) => {
        const filtered = m.filter((x) => x.from !== "thinking");
        return [...filtered, { from: "bot", text }];
      });
    }, delay);
  };

  // логика диалога
  // 🧠 Расширенная логика с контекстом
// 🧠 Новый handleBotLogic с контекстом и старой логикой
const [lastIntent, setLastIntent] = useState<string | null>(null);
const [formState, setFormState] = useState<{ name?: string; email?: string; task?: string; budget?: string }>({});

const handleBotLogic = (t: string) => {
  const lower = t.toLowerCase().trim();
  const userName = localStorage.getItem("userName") || formState.name || "друг";

  const say = (text: string, delay = 1000) => {
    botThink();
    botReply(text.replace("{name}", userName), delay);
  };

  // === Если бот находится в процессе заполнения формы ===
  if (lastIntent === "collect_name") {
    setFormState({ ...formState, name: t });
    say(`Отлично, {name}! Укажи, пожалуйста, свой e-mail 📧`);
    setLastIntent("collect_email");
    return;
  }

  if (lastIntent === "collect_email") {
    setFormState({ ...formState, email: t });
    say(`Спасибо! Расскажи коротко, что тебе нужно сделать? 📝`);
    setLastIntent("collect_task");
    return;
  }

  if (lastIntent === "collect_task") {
    setFormState({ ...formState, task: t });
    say(`Понял 👍 Какой у тебя ориентировочный бюджет? 💰`);
    setLastIntent("collect_budget");
    return;
  }

  if (lastIntent === "collect_budget") {
    const newForm = { ...formState, budget: t };
    setFormState(newForm);
    setLastIntent(null);

    say(`Спасибо, {name}! Я оформил заявку ✅`, 1200);

    console.log("📨 Заявка из чата:", newForm);
    // сюда можно вставить отправку на сервер или в форму
    setTimeout(() => onCommand?.("contacts"), 2000);
    return;
  }

  // === Контекстные ответы на "да" ===
  if (/(да|угу|ага|ок|давай|конечно)/.test(lower)) {
    if (lastIntent === "design_offer" || lastIntent === "site_offer") {
      say("Супер! Давай оформим заявку прямо здесь 👇 Как тебя зовут?");
      setLastIntent("collect_name");
      return;
    }
  }

  // === Основные направления ===
  if (/(дизайн|макет|фирменный стиль)/.test(lower)) {
    say("Я помогу с дизайном 😎 Хочешь оформить заявку прямо здесь?");
    setLastIntent("design_offer");
    return;
  }

  if (/(сайт|landing|лендинг|веб)/.test(lower)) {
    say("Отлично! Хочешь оформить заявку прямо здесь?");
    setLastIntent("site_offer");
    return;
  }

  if (/(бот|telegram|телеграм)/.test(lower)) {
    say("Могу сделать Telegram-бота! Хочешь оформить заявку прямо здесь?");
    setLastIntent("site_offer");
    return;
  }

  // === Общение ===
  if (/(привет|хай|hello|здравствуй)/.test(lower)) {
    say(`Привет, {name}! Рад тебя видеть 👋 Чем могу помочь?`);
    return;
  }

  if (/(как дела|как ты)/.test(lower)) {
    say("Отлично! Работаю на тебя 🤖 А у тебя как настроение?");
    return;
  }

  if (/(спасибо|молодец|круто)/.test(lower)) {
    say("Рад помочь 😎");
    return;
  }

  if (/(пока|до встречи)/.test(lower)) {
    say("Пока, {name}! Увидимся 👋");
    return;
  }

  if (/(зарегистр|авториз)/.test(lower)) {
    say("Хочешь, открою окно регистрации?");
    setLastIntent("auth_request");
    return;
  }

  if (/(цена|стоим|сколько)/.test(lower)) {
    say("Стоимость зависит от задачи 💰 Обычно от 200$ за проект!");
    return;
  }

  // === Ответ на "да" для регистрации ===
  if (lastIntent === "auth_request" && /(да|угу|ок)/.test(lower)) {
    say("Открываю окно регистрации 👇");
    setTimeout(() => onOpenAuth?.(), 1400);
    setLastIntent(null);
    return;
  }

  // === fallback ===
  say("Интересно... расскажи подробнее! Я стараюсь понимать больше 😅");
};

  const send = (text?: string) => {
    const t = (text ?? value).trim();
    if (!t) return;
    setValue("");
    setMessages((m) => [...m, { from: "user", text: t }]);
    setCollapsed(false);
    handleBotLogic(t);
  };

  // закрытие по клику вне
  useEffect(() => {
    const handlePointerDown = (e: MouseEvent) => {
      if (!chatRef.current?.contains(e.target as Node)) setCollapsed(true);
    };
    document.addEventListener("pointerdown", handlePointerDown);
    return () => document.removeEventListener("pointerdown", handlePointerDown);
  }, []);

  // сворачивание при скролле
  useEffect(() => {
    const handleScroll = () => setCollapsed(true);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleFocus = () => setCollapsed(false);
  const visible = collapsed ? messages.slice(-1) : messages;

  return (
    <div className={`${styles.chat} ${collapsed ? styles.collapsed : ""}`} ref={chatRef}>
      <div className={styles.window} ref={windowRef}>
        {visible.map((m, i) => (
          <div
            key={i}
            className={`${styles.msg} ${
              m.from === "user" ? styles.user : m.from === "thinking" ? styles.thinking : styles.bot
            }`}
          >
            {m.text}
          </div>
        ))}
      </div>

      <div className={styles.inputRow}>
        <button className={styles.plus}>+</button>
        <input
          value={value}
          onChange={(e) => setValue(e.target.value)}
          onFocus={handleFocus}
          placeholder="Спросите что-нибудь..."
          onKeyDown={(e) => e.key === "Enter" && send()}
        />
        <button className={styles.send} onClick={() => send()}>
          ↑
        </button>
      </div>

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
              <b>{h.label}</b> — <span>{h.hint}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ChatBox;