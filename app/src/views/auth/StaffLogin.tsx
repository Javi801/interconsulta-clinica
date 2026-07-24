import { useState } from 'react'
import Field from '../../components/Field'
import { TEXT } from '../../text'

interface StaffLoginProps {
  title: string
  subtitle: string
  onLogin: () => void
}

/** Visual-only staff login (psychologist / coordinator). Any input logs in. */
function StaffLogin({ title, subtitle, onLogin }: StaffLoginProps) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const { login } = TEXT.auth

  return (
    <div style={{ maxWidth: 440, margin: '40px auto 0' }}>
      <div className="card">
        <h1 style={{ fontSize: 24 }}>{title}</h1>
        <p className="subtitle" style={{ marginBottom: 20 }}>
          {subtitle}
        </p>
        <div className="field-grid" style={{ gridTemplateColumns: '1fr' }}>
          <Field label={login.emailLabel}>
            <input
              type="email"
              value={email}
              placeholder={login.emailPlaceholder}
              onChange={(e) => setEmail(e.target.value)}
            />
          </Field>
          <Field label={login.passwordLabel}>
            <input
              type="password"
              value={password}
              placeholder={login.passwordPlaceholder}
              onChange={(e) => setPassword(e.target.value)}
            />
          </Field>
        </div>
        <button
          type="button"
          className="btn primary"
          style={{ width: '100%', marginTop: 18 }}
          onClick={onLogin}
        >
          {login.enter}
        </button>
        <p className="footer-note">{login.demoNote}</p>
      </div>
    </div>
  )
}

export default StaffLogin
