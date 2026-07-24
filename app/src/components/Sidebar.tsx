import { TEXT } from '../text'

export type ViewId = 'patient' | 'psych' | 'coordinator'

const NAV_ITEMS: { id: ViewId; label: string }[] = [
  { id: 'patient', label: TEXT.nav.items.patient },
  { id: 'psych', label: TEXT.nav.items.psych },
  { id: 'coordinator', label: TEXT.nav.items.coordinator },
]

function LockIcon({ open }: { open: boolean }) {
  return (
    <svg
      className="lock-icon"
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <rect x="3" y="11" width="18" height="11" rx="2" />
      {open ? <path d="M7 11V7a5 5 0 0 1 9.9-1" /> : <path d="M7 11V7a5 5 0 0 1 10 0v4" />}
    </svg>
  )
}

interface SidebarProps {
  activeView: ViewId
  onNavigate: (view: ViewId) => void
  loggedIn: Record<ViewId, boolean>
  onToggleSession: (view: ViewId) => void
}

function Sidebar({ activeView, onNavigate, loggedIn, onToggleSession }: SidebarProps) {
  return (
    <aside>
      <div className="brand">
        {TEXT.nav.brand}
        <small>{TEXT.nav.brandSubtitle}</small>
      </div>
      {NAV_ITEMS.map(({ id, label }) => {
        const sessionLabel = loggedIn[id] ? TEXT.nav.session.close : TEXT.nav.session.open
        return (
          <div key={id} className="nav-row">
            <button
              type="button"
              className="lock-btn"
              onClick={() => onToggleSession(id)}
              title={sessionLabel}
              aria-label={sessionLabel}
            >
              <LockIcon open={loggedIn[id]} />
            </button>
            <button
              type="button"
              className={`nav-btn${activeView === id ? ' active' : ''}`}
              onClick={() => onNavigate(id)}
            >
              {label}
            </button>
          </div>
        )
      })}
    </aside>
  )
}

export default Sidebar
