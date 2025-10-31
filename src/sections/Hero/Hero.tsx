import React from 'react'
import './Hero.scss'
import heroImg from '../../assets/hero.jpg' // replace with your hero image

const Hero: React.FC = () => {
  return (
    <section className="hero-section">
      <div className="hero-inner container">
        <div className="hero-top-label">Главная страница</div>

        <div className="hero-main">
          <div className="hero-icon" />
          <h1 className="hero-title">Чем могу помочь?</h1>

          <div className="hero-search">
            <button className="add">+</button>
            <input placeholder="Спросите что-нибудь" />
            <button className="send">↑</button>
          </div>

          <ul className="hero-suggestions">
            <li><strong>Хочу сайт</strong> — Закажи разработку прямо в чате</li>
            <li><strong>Бот для тг</strong> — Закажи Telegram-бота под задачи</li>
            <li><strong>Дизайн</strong> — Закажи дизайн сайта, интерфейса или бренда</li>
          </ul>
        </div>

        <div className="hero-image">
          <img src={heroImg} alt="hero" />
        </div>
      </div>
    </section>
  )
}

export default Hero