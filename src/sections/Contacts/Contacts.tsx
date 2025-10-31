import React, { useEffect, useState } from 'react'
import './Contacts.scss'

type Prefill = { title?: string; message?: string }

const initial = { name: '', email: '', phone: '', service: '', message: '' }

const Contacts: React.FC = () => {
  const [step, setStep] = useState(0)
  const [form, setForm] = useState(initial)
  const [prefill, setPrefill] = useState<Prefill | null>(null)
  const [submitted, setSubmitted] = useState(false)

  useEffect(() => {
    const handler = (e: Event) => {
      const d = (e as CustomEvent).detail as Prefill
      setPrefill(d)
      setForm(f => ({ ...f, service: d?.title ?? f.service, message: d?.message ?? f.message }))
      setStep(0)
      document.querySelector('[data-section="contacts"]')?.scrollIntoView({ behavior: 'smooth' })
    }
    window.addEventListener('prefillRequest', handler as EventListener)
    return () => window.removeEventListener('prefillRequest', handler as EventListener)
  }, [])

  const next = () => setStep(s => Math.min(2, s + 1))
  const prev = () => setStep(s => Math.max(0, s - 1))

  const submit = (e: React.FormEvent) => {
    e.preventDefault()
    // here you can call backend
    setSubmitted(true)
    setTimeout(() => { setSubmitted(false); setForm(initial); setStep(0) }, 1200)
  }

  return (
    <section className="contacts-section container">
      <div className="section-title">Контакты</div>

      <div className="contact-wrap">
        <form className="contact-form" onSubmit={submit}>
          {step === 0 && (
            <>
              <label>Имя <input value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} required /></label>
              <label>Email <input type="email" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} required /></label>
              <div className="actions">
                <button type="button" onClick={next}>Продолжить</button>
              </div>
            </>
          )}

          {step === 1 && (
            <>
              <label>Услуга
                <select value={form.service} onChange={e => setForm({ ...form, service: e.target.value })}>
                  <option value="">-- Выберите --</option>
                  <option>Дизайн визуала</option>
                  <option>SMM-стратегия</option>
                  <option>Запуск кампании</option>
                </select>
              </label>

              <label>Телефон <input value={form.phone} onChange={e => setForm({ ...form, phone: e.target.value })} /></label>

              <div className="actions">
                <button type="button" onClick={prev}>Назад</button>
                <button type="button" onClick={next}>Далее</button>
              </div>
            </>
          )}

          {step === 2 && (
            <>
              <label>Сообщение <textarea value={form.message} onChange={e => setForm({ ...form, message: e.target.value })} rows={5} /></label>

              <div className="actions">
                <button type="button" onClick={prev}>Назад</button>
                <button type="submit">{submitted ? 'Отправлено' : 'Отправить заявку'}</button>
              </div>
            </>
          )}
        </form>

        <aside className="contact-summary">
          <h4>Кратко</h4>
          <p><strong>Имя:</strong> {form.name || '—'}</p>
          <p><strong>Email:</strong> {form.email || '—'}</p>
          <p><strong>Услуга:</strong> {form.service || prefill?.title || '—'}</p>
          <p><strong>Сообщение:</strong> {form.message || prefill?.message || '—'}</p>
        </aside>
      </div>
    </section>
  )
}

export default Contacts