import React, { useRef, useState, useEffect } from 'react'
import Header from './components/Header/Header'
import Chat from './components/Chat/Chat'
import Hero from './sections/Hero/Hero'
import About from './sections/About/About'
import Projects from './sections/Projects/Projects'
import Contacts from './sections/Contacts/Contacts'
import './styles/global.scss'

export type SectionId = 'home' | 'about' | 'projects' | 'contacts'

const App: React.FC = () => {
  const homeRef = useRef<HTMLElement | null>(null)
  const aboutRef = useRef<HTMLElement | null>(null)
  const projectsRef = useRef<HTMLElement | null>(null)
  const contactsRef = useRef<HTMLElement | null>(null)

  const [active, setActive] = useState<SectionId>('home')

const sections: Record<string, React.RefObject<HTMLElement | null>> = {
  home: homeRef,
  about: aboutRef,
  projects: projectsRef,
  contacts: contactsRef,
};

  useEffect(() => {
    const opts = { root: null, threshold: 0.38 }
    const obs = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) {
          const id = e.target.getAttribute('data-section') as SectionId | null
          if (id) setActive(id)
        }
      })
    }, opts)

    Object.values(sections).forEach(r => {
      if (r.current) obs.observe(r.current)
    })

    return () => obs.disconnect()
  }, [])

  const scrollTo = (id: SectionId) => {
    const ref = sections[id]
    if (!ref.current) return
    ref.current.scrollIntoView({ behavior: 'smooth', block: 'start' })
    setActive(id)
  }

  return (
    <div className="app-root">
      <Header active={active} onNavigate={scrollTo} />

      <main className="main-content">
        <section ref={homeRef} data-section="home" id="home">
          <Hero />
        </section>

        <section ref={aboutRef} data-section="about" id="about">
          <About />
        </section>

        <section ref={projectsRef} data-section="projects" id="projects">
          <Projects />
        </section>

        <section ref={contactsRef} data-section="contacts" id="contacts">
          <Contacts />
        </section>
      </main>

      <Chat
        onNavigate={(id) => scrollTo(id)}
        onCreateRequest={(data) => {
          // scroll to contacts and prefill via custom event
          scrollTo('contacts')
          window.dispatchEvent(new CustomEvent('prefillRequest', { detail: data }))
        }}
      />
    </div>
  )
}

export default App