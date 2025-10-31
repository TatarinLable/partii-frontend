import React, { useEffect, useMemo, useRef } from 'react'
import './Header.scss'
import logo from '../../assets/logo.svg' // place logo.svg in src/assets

import type { SectionId } from '../../App'

interface Props {
  active: SectionId
  onNavigate: (id: SectionId) => void
}

const NAV: { id: SectionId; label: string }[] = [
  { id: 'home', label: 'Home' },
  { id: 'about', label: 'About' },
  { id: 'projects', label: 'Project' },
  { id: 'contacts', label: 'Contacts' },
]

const Header: React.FC<Props> = ({ active, onNavigate }) => {
  const ulRef = useRef<HTMLUListElement | null>(null)
  const indRef = useRef<HTMLDivElement | null>(null)
  const idx = useMemo(() => NAV.findIndex(n => n.id === active), [active])

  useEffect(() => {
    const ul = ulRef.current
    const ind = indRef.current
    if (!ul || !ind) return
    const li = ul.children[idx] as HTMLElement | undefined
    if (!li) {
      ind.style.opacity = '0'
      return
    }
    const rect = li.getBoundingClientRect()
    const parentRect = ul.getBoundingClientRect()
    const left = rect.left - parentRect.left
    ind.style.width = `${rect.width}px`
    ind.style.transform = `translateX(${left}px)`
    ind.style.opacity = '1'
  }, [idx])

  return (
    <header className="site-header">
      <div className="header-inner">
        <div className="left">
          <button className="logo-btn" onClick={() => onNavigate('home')}>
            <img src={logo} alt="logo" />
          </button>
          <div className="menu-compact">
            <span className="menu-label">menu</span>
            <div className="menu-lines" aria-hidden />
          </div>
        </div>

        <nav className="center">
          <ul ref={ulRef} className="nav-list">
            {NAV.map((n) => (
              <li key={n.id}>
                <button
                  className={`nav-btn ${n.id === active ? 'is-active' : ''}`}
                  onClick={() => onNavigate(n.id)}
                >
                  {n.label}
                </button>
              </li>
            ))}
            <div className="nav-indicator" ref={indRef} />
          </ul>
        </nav>

        <div className="right">
          <button className="auth">Log in</button>
        </div>
      </div>
    </header>
  )
}

export default Header