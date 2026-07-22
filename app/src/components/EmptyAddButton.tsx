interface EmptyAddButtonProps {
  label: string
  onClick: () => void
}

function EmptyAddButton({ label, onClick }: EmptyAddButtonProps) {
  return (
    <button type="button" className="empty-add" aria-label={label} onClick={onClick}>
      <span>+</span>
    </button>
  )
}

export default EmptyAddButton
