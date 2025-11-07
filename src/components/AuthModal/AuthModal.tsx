import React, { useState } from "react";
import styles from "./AuthModal.module.scss";

interface Props {
  onClose: () => void;
  onLogin: (name: string) => void;
}

const AuthModal: React.FC<Props> = ({ onClose, onLogin }) => {
  const [isRegister, setIsRegister] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isRegister && !name.trim()) return;
    if (!email.trim() || !password.trim()) return;

    if (isRegister) {
      localStorage.setItem("userName", name);
      onLogin(name);
    } else {
      const savedName = localStorage.getItem("userName");
      if (savedName) onLogin(savedName);
      else alert("Пользователь не найден. Зарегистрируйтесь.");
    }
  };

  return (
    <div className={styles.overlay} onClick={onClose}>
      <div
        className={styles.modal}
        onClick={(e) => e.stopPropagation()} // чтобы не закрывалось при клике на форму
      >
        <h2>{isRegister ? "Sign Up" : "Log In"}</h2>

        <form onSubmit={handleSubmit} className={styles.form}>
          {isRegister && (
            <input
              type="text"
              placeholder="Your name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          )}
          <input
            type="email"
            placeholder="Email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <button type="submit" className={styles.submitBtn}>
            {isRegister ? "Create account" : "Log in"}
          </button>
        </form>

        <p className={styles.toggle}>
          {isRegister ? "Already have an account?" : "New here?"}{" "}
          <span onClick={() => setIsRegister(!isRegister)}>
            {isRegister ? "Log in" : "Sign up"}
          </span>
        </p>
      </div>
    </div>
  );
};

export default AuthModal;