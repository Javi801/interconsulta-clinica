export type ViewId = 'patient' | 'psych'

const NAV_ITEMS: { id: ViewId; label: string }[] = [
  { id: 'patient', label: 'Vista paciente' },
  { id: 'psych', label: 'Vista psicólogo' },
]

interface SidebarProps {
  activeView: ViewId
  onNavigate: (view: ViewId) => void
}

function Sidebar({ activeView, onNavigate }: SidebarProps) {
  return (
    <aside>
      <div className="brand">
        Derivación Clínica
        <small>Mockup de demostración</small>
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
