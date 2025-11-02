import React, { useState } from "react";
import styles from "./Projects.module.scss";
import { projects } from "./data";
import Modal from "./Modal";

const Projects: React.FC = () => {
  const [activeVideo, setActiveVideo] = useState<string | null>(null);
  const [modalContent, setModalContent] = useState<string | null>(null);

  return (
    <section className={styles.projects}>
      <div className={styles.header}>
        <div className={styles.path}>/selected work</div>
        <h2>My Projects | website</h2>
        <div className={styles.subtitle}>Мои работы</div>
      </div>

      <div className={styles.grid}>
        {projects.map((p) => (
          <div key={p.id} className={styles.card}>
            <div className={styles.frameTop}>Developer: part II</div>

            <div className={styles.preview}>
              {activeVideo === p.id ? (
                <video
                  src={p.video}
                  autoPlay
                  muted
                  loop
                  onClick={() => setActiveVideo(null)}
                />
              ) : (
                <img src={p.image} alt={p.title} />
              )}
            </div>

            <div className={styles.frameBottom}>
              <span>Developer: part II</span>
              <button onClick={() => setActiveVideo(p.id)}>▶ Preview</button>
              <button onClick={() => setModalContent(p.url)}>
                View website ▶
              </button>
            </div>
          </div>
        ))}
      </div>

      {modalContent && (
        <Modal onClose={() => setModalContent(null)}>
          <iframe src={modalContent} title="project preview" />
        </Modal>
      )}
    </section>
  );
};

export default Projects;