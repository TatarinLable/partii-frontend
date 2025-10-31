import React from 'react'
import './About.scss'

const About: React.FC = () => {
  return (
    <section className="about-section container">
      <div className="section-title">Обо мне</div>
      <div className="about-inner">
        <div className="about-media">
          <img src={'/src/assets/avatar.png'} alt="avatar" />
        </div>
        <div className="about-content">
          <div className="mini">Chapter for my</div>
          <h2>Hi, my name is...Artem</h2>
          <p className="about-text">Whether we're meeting someone, applying for a job, or simply trying to introduce ourselves, we need to be able to communicate effectively in English. The key difference lies in the information we choose to share in different situations.</p>

          <div className="about-logos">
            <div className="logo-pill">Adobe</div>
            <div className="logo-pill">Illustrator</div>
            <div className="logo-pill">Premiere</div>
            <div className="logo-pill">Figma</div>
            <div className="logo-pill">Lemma</div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default About