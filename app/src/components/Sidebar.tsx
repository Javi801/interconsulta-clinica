import { TEXT } from '../text'

export type ViewId = 'patient' | 'psych'

const NAV_ITEMS: { id: ViewId; label: string }[] = [
  { id: 'patient', label: TEXT.nav.items.patient },
  { id: 'psych', label: TEXT.nav.items.psych },
]

interface SidebarProps {
  activeView: ViewId
  onNavigate: (view: ViewId) => void
}

function Sidebar({ activeView, onNavigate }: SidebarProps) {
  return (
    <aside>
      <div className="brand">
        {TEXT.nav.brand}
        <small>{TEXT.nav.brandSubtitle}</small>
      </div>
      {NAV_ITEMS.map(({ id, label }) => (
        <button
          key={id}
          type="button"
          className={`nav-btn${activeView === id ? ' active' : ''}`}
          onClick={() => onNavigate(id)}
        >
          {label}
        </button>
      ))}
    </aside>
  )
}

export default Sidebar
