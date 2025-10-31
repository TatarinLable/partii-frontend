import React from 'react'
import './Projects.scss'
import p1 from '../../assets/project-1.jpg'
import p2 from '../../assets/project-2.jpg'
import p3 from '../../assets/project-3.jpg'

const projects = [
  { id: 'p1', title: 'My Projects I website', img: p1 },
  { id: 'p2', title: 'Project Two', img: p2 },
  { id: 'p3', title: 'Project Three', img: p3 },
]

const Projects: React.FC = () => (
  <section className="projects-section container">
    <div className="section-title">My Projects | website</div>
    <div className="projects-grid">
      {projects.map(p => (
        <article key={p.id} className="project-item">
          <div className="frame">
            <img src={p.img} alt={p.title} />
          </div>
          <div className="project-meta">
            <div className="meta-left">Developer: part II</div>
            <div className="meta-right">Preview ▶ View website ▶</div>
          </div>
        </article>
      ))}
    </div>
  </section>
)

export default Projects