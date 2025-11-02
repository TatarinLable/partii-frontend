import React, { useState } from "react";
import styles from "./Contacts.module.scss";

const Contacts: React.FC = () => {
  const [expanded, setExpanded] = useState(false);

  return (
    <section className={styles.contacts}>
      {/* Заголовок */}
      <div className={styles.header}>
        
        <div className={styles.subtitle}>Связаться со мной</div>
      </div>

      {/* Карточка */}
      <div className={styles.card}>
        <img src="/icons/telegram.svg" alt="" className={`${styles.icon} ${styles.topLeft}`} />
        <img src="/icons/telegram.svg" alt="" className={`${styles.icon} ${styles.topRight}`} />
        <img src="/icons/telegram.svg" alt="" className={`${styles.icon} ${styles.bottomLeft}`} />
        <img src="/icons/telegram.svg" alt="" className={`${styles.icon} ${styles.bottomRight}`} />

        {/* Содержимое карточки */}
        <div
          className={`${styles.centerContent} ${
            expanded ? styles.hideContent : styles.showContent
          }`}
        >
          <img src="/icons/telegram.svg" alt="" className={styles.iconMain} />
          <h3 className={styles.title}>Заказ проекта</h3>
          <p className={styles.text}>
            Я разработал удобную форму для заказа, чтобы вы могли быстрее и
            удобнее передать мне ваши мысли и идеи.
          </p>
          <button className={styles.btn} onClick={() => setExpanded(true)}>
            Продолжить
          </button>
        </div>

        {/* Форма */}
        <form
          className={`${styles.form} ${
            expanded ? styles.showForm : styles.hideForm
          }`}
          onSubmit={(e) => {
            e.preventDefault();
            alert("Спасибо! Я скоро свяжусь с вами 🚀");
            setExpanded(false);
          }}
        >
          <h3 className={styles.formTitle}>Форма заказа</h3>
          <input type="text" placeholder="Ваше имя" required />
          <input type="email" placeholder="Email или Telegram" required />
          <textarea placeholder="Опишите ваш проект..." required />
          <div className={styles.formButtons}>
            <button type="button" onClick={() => setExpanded(false)}>
              Назад
            </button>
            <button type="submit" className={styles.sendBtn}>
              Отправить
            </button>
          </div>
        </form>
      </div>

      {/* Footer */}
      <div className={styles.footer}>
        <span>telegram</span>
        <span>partii@gmail.com</span>
        <span>whatsapp</span>
      </div>
    </section>
  );
};

export default Contacts;