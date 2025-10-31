import React, { useEffect, useRef, useState } from 'react'
import './Chat.scss'
import type { SectionId } from '../../App'

interface Props {
  onNavigate: (id: SectionId) => void
  onCreateRequest: (data: { title?: string; message?: string }) => void
}

type Msg = { id: string; from: 'user' | 'bot'; text: string; meta?: any }

const HINTS = [
  'Хочу сайт',
  'Бот для тг',
  'Дизайн',
  'Покажи портфолио'
]

const Chat: React.FC<Props> = ({ onNavigate, onCreateRequest }) => {
  const [open, setOpen] = useState(true)
  const [messages, setMessages] = useState<Msg[]>([
    { id: 'b0', from: 'bot', text: 'Привет! Чем могу помочь?' }
  ])
  const [val, setVal] = useState('')
  const scrollRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: 'smooth' })
  }, [messages, open])

  const push = (m: Msg) => setMessages(prev => [...prev, m])

  const sendUser = (text: string) => {
    if (!text.trim()) return
    const id = 'u' + Date.now()
    push({ id, from: 'user', text })
    setVal('')
    setTimeout(() => botReply(text), 350)
  }

  const botReply = (text: string) => {
    const t = text.toLowerCase()
    if (t.includes('портф')) {
      push({ id: 'b' + Date.now(), from: 'bot', text: 'Открываю портфолио...' })
      onNavigate('projects')
      return
    }
    if (t.includes('заяв') || t.includes('хочу сайт') || t.includes('дизайн') || t.includes('бот')) {
      push({ id: 'b' + Date.now(), from: 'bot', text: 'Могу создать заявку прямо сейчас. Желаете?', meta: { canCreate: true } })
      return
    }
    push({ id: 'b' + Date.now(), from: 'bot', text: 'Понял. Могу создать заявку или показать портфолио.' })
  }

  const onHintClick = (hint: string) => {
    sendUser(hint)
  }

  const createFromChat = (latest?: string) => {
    onCreateRequest({ title: latest ?? 'Заявка из чата', message: latest })
  }

  return (
    <div className={`chat-widget ${open ? 'open' : 'closed'}`}>
      <div className="chat-top" onClick={() => setOpen(o => !o)}>
        <div className="chat-title">Чат</div>
        <div className="chat-toggle">{open ? '—' : '+'}</div>
      </div>

      {open && (
        <div className="chat-body">
          <div className="chat-scroll" ref={scrollRef}>
            {messages.map(m => (
              <div key={m.id} className={`chat-msg ${m.from}`}>
                <div className="bubble">
                  <div className="text">{m.text}</div>
                  {m.meta?.canCreate && (
                    <div className="bubble-actions">
                      <button onClick={() => createFromChat(messages.slice(-1)[0]?.text)}>Создать заявку</button>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>

          <div className="chat-hints">
            {HINTS.map(h => <button key={h} className="hint" onClick={() => onHintClick(h)}>{h}</button>)}
          </div>

          <div className="chat-input">
            <input value={val} onChange={e => setVal(e.target.value)} onKeyDown={e => { if (e.key === 'Enter') sendUser(val) }} placeholder="Спросите что-нибудь" />
            <button onClick={() => sendUser(val)}>→</button>
          </div>
        </div>
      )}
    </div>
  )
}

export default Chat