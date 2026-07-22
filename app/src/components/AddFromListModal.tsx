import { useState } from 'react'
import Modal from './Modal'

interface AddFromListModalProps {
  title: string
  label: string
  options: string[]
  otherOption: string
  onAdd: (name: string) => void
  onClose: () => void
}

function AddFromListModal({
  title,
  label,
  options,
  otherOption,
  onAdd,
  onClose,
}: AddFromListModalProps) {
  const [selected, setSelected] = useState(options[0])
  const [customName, setCustomName] = useState('')

  const isOther = selected === otherOption
  const name = isOther ? customName.trim() : selected

  return (
    <Modal open>
      <h2>{title}</h2>
      <div className="field" style={{ marginTop: 16 }}>
        <label>{label}</label>
        <select value={selected} onChange={(e) => setSelected(e.target.value)}>
          {options.map((option) => (
            <option key={option}>{option}</option>
          ))}
        </select>
      </div>
      {isOther && (
        <div className="field" style={{ marginTop: 12 }}>
          <label>Especificar</label>
          <input
            value={customName}
            onChange={(e) => setCustomName(e.target.value)}
            autoFocus
          />
        </div>
      )}
      <div className="modal-actions">
        <button type="button" className="btn" onClick={onClose}>
          Cancelar
        </button>
        <button type="button" className="btn primary" disabled={!name} onClick={() => onAdd(name)}>
          Agregar
        </button>
      </div>
    </Modal>
  )
}

export default AddFromListModal
