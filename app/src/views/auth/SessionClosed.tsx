import { TEXT } from '../../text'

function SessionClosed() {
  return (
    <section className="view active">
      <div className="card" style={{ maxWidth: 440, margin: '40px auto 0' }}>
        <h1 style={{ fontSize: 24 }}>{TEXT.auth.closedTitle}</h1>
        <p className="subtitle">{TEXT.auth.closedNote}</p>
      </div>
    </section>
  )
}

export default SessionClosed
