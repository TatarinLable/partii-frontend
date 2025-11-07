import React, { useState } from "react";
import styles from "./Contacts.module.scss";

type Step = 1 | 2 | 3 | 4 | 5;

const Contacts: React.FC = () => {
  const [step, setStep] = useState<Step>(1);
  const [answers, setAnswers] = useState({
    type: "",
    customType: "",
    budget: "",
    idea: "",
    name: "",
    contact: "",
  });

  const next = () => setStep((s) => (s < 5 ? ((s + 1) as Step) : s));
  const prev = () => setStep((s) => (s > 1 ? ((s - 1) as Step) : s));

  const handleSelect = (key: keyof typeof answers, value: string) => {
    setAnswers({ ...answers, [key]: value });
    if (value !== "Другое") next();
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const projectType =
      answers.type === "Другое" && answers.customType
        ? answers.customType
        : answers.type;

    alert(
      `Спасибо, ${answers.name}! 🚀\nТип проекта: ${projectType}\nБюджет: ${answers.budget}\nОписание: ${answers.idea}\nКонтакт: ${answers.contact}`
    );

    setStep(1);
    setAnswers({
      type: "",
      customType: "",
      budget: "",
      idea: "",
      name: "",
      contact: "",
    });
  };

  // Прогресс (0–100%)
  const progress = ((step - 1) / 4) * 100;

  return (
    <section className={styles.contacts}>
      <div className={styles.header}>
        <div className={styles.path}>/контакты</div>
        <h2>Начнём проект</h2>
      </div>

      <div className={styles.frameWrap}>
        <div className={styles.outerFrame}>
          {/* Прогресс бар */}
          <div
            className={styles.progress}
            style={{ width: `${progress}%` }}
          ></div>

          <div className={styles.innerFrame}>
            {/* === 1 === */}
            {step === 1 && (
              <div className={styles.step}>
                <h3 className={styles.title}>Привет 👋</h3>
                <p className={styles.text}>
                  Ответьте на несколько вопросов — и я помогу реализовать ваш проект.
                </p>
                <button className={styles.btn} onClick={next}>
                  Начать
                </button>
              </div>
            )}

            {/* === 2 === */}
            {step === 2 && (
              <div className={styles.step}>
                <h3 className={styles.title}>Какой проект вас интересует?</h3>
                <div className={styles.options}>
                  {["Сайт", "Брендинг", "Приложение", "Другое"].map((t) => (
                    <button
                      key={t}
                      className={`${styles.option} ${
                        answers.type === t ? styles.active : ""
                      }`}
                      onClick={() => handleSelect("type", t)}
                    >
                      {t}
                    </button>
                  ))}
                </div>

                {/* Поле появляется только если “Другое” */}
                {answers.type === "Другое" && (
                  <input
                    type="text"
                    placeholder="Введите тип проекта..."
                    value={answers.customType}
                    onChange={(e) =>
                      setAnswers({ ...answers, customType: e.target.value })
                    }
                    className={styles.inputField}
                  />
                )}

                <div className={styles.buttons}>
                  <button onClick={prev} className={styles.backBtn}>
                    Назад
                  </button>
                  {answers.type && (
                    <button onClick={next} className={styles.btn}>
                      Далее
                    </button>
                  )}
                </div>
              </div>
            )}

            {/* === 3 === */}
            {step === 3 && (
              <div className={styles.step}>
                <h3 className={styles.title}>Какой ориентировочный бюджет?</h3>
                <div className={styles.options}>
                  {[
                    "до 1000$",
                    "1000–3000$",
                    "3000–7000$",
                    "7000+",
                  ].map((b) => (
                    <button
                      key={b}
                      className={`${styles.option} ${
                        answers.budget === b ? styles.active : ""
                      }`}
                      onClick={() => handleSelect("budget", b)}
                    >
                      {b}
                    </button>
                  ))}
                </div>

                <div className={styles.buttons}>
                  <button onClick={prev} className={styles.backBtn}>
                    Назад
                  </button>
                  {answers.budget && (
                    <button onClick={next} className={styles.btn}>
                      Далее
                    </button>
                  )}
                </div>
              </div>
            )}

            {/* === 4 === */}
            {step === 4 && (
              <div className={styles.step}>
                <h3 className={styles.title}>Опишите идею проекта</h3>
                <textarea
                  className={styles.inputArea}
                  placeholder="Коротко расскажите о задаче..."
                  value={answers.idea}
                  onChange={(e) =>
                    setAnswers({ ...answers, idea: e.target.value })
                  }
                />
                <div className={styles.buttons}>
                  <button onClick={prev} className={styles.backBtn}>
                    Назад
                  </button>
                  {answers.idea && (
                    <button onClick={next} className={styles.btn}>
                      Далее
                    </button>
                  )}
                </div>
              </div>
            )}

            {/* === 5 === */}
            {step === 5 && (
              <form className={styles.form} onSubmit={handleSubmit}>
                <h3 className={styles.title}>Как с вами связаться?</h3>
                <input
                  type="text"
                  placeholder="Ваше имя"
                  required
                  value={answers.name}
                  onChange={(e) =>
                    setAnswers({ ...answers, name: e.target.value })
                  }
                />
                <input
                  type="text"
                  placeholder="Email или Telegram"
                  required
                  value={answers.contact}
                  onChange={(e) =>
                    setAnswers({ ...answers, contact: e.target.value })
                  }
                />
                <div className={styles.buttons}>
                  <button type="button" onClick={prev} className={styles.backBtn}>
                    Назад
                  </button>
                  <button type="submit" className={styles.btn}>
                    Отправить
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contacts;