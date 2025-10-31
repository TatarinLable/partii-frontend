import React from "react";
import styles from "./Contacts.module.scss";

const Contacts: React.FC = () => {
  return (
    <div className={styles.wrap}>
      <h2>Контакты</h2>
      <p>Форма для заявки появится тут.</p>
    </div>
  );
};

export default Contacts;