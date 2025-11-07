import React, { useState } from "react";
import styles from "./Projects.module.scss";

export const projects = [
  {
    id: "p1",
    title: "MINIKAEV",
    subtitle: "PORTFOLIO",
    category: "Дизайн",
    year: "2025",
    image: "/src/assets/project-2.jpg",
    video: "/src/assets/project-2.mp4",
  },
  {
    id: "p2",
    title: "MINIKAEV",
    subtitle: "PORTFOLIO",
    category: "Дизайн",
    year: "2025",
    image: "/src/assets/project-3.jpg",
    video: "/src/assets/project-3.mp4",
  },
];

const Projects: React.FC = () => {
  const [activeVideo, setActiveVideo] = useState<string | null>(null);

  return (
    <section className={styles.projects}>
      {/* заголовок блока */}
      <div className={styles.header}>
        <div className={styles.path}>/Дизайн</div>
        <h2>Figma | UI-UX</h2>
      </div>

      {/* карточки */}
      <div className={styles.frames}>
        {projects.map((p) => (
          <div
            key={p.id}
            className={styles.frameWrap}
            onMouseEnter={() => setActiveVideo(p.id)}
            onMouseLeave={() => setActiveVideo(null)}
            aria-label={p.title}
          >
            <div className={styles.outerFrame}>
              <div className={styles.year}>{p.year}</div>

              <div className={styles.innerFrame}>
                {activeVideo === p.id ? (
                  <video
                    className={styles.media}
                    src={p.video}
                    autoPlay
                    muted
                    loop
                    playsInline
                  />
                ) : (
                  <img className={styles.media} src={p.image} alt={p.title} />
                )}

                <div className={styles.overlay}>
                  <div className={styles.strip} />
                  <div className={styles.texts}>
                    <div className={styles.title}>{p.title}</div>
                    <div className={styles.subtitleText}>{p.subtitle}</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Projects;