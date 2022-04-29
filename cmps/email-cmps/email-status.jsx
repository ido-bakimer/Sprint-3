

export function EmailStatus({ onStartComposing, onSetShowByStatus, }) {

    return <section className="email-status">
        <i className="add-email fa-solid fa-plus" onClick={onStartComposing}>compose</i>
        <button className="email-status-btn" onClick={() => onSetShowByStatus(null)}>All</button>
        <button className="email-status-btn" onClick={() => onSetShowByStatus('inbox')}>Inbox</button>
        <button className="email-status-btn" onClick={() => onSetShowByStatus('sent')}>Sent</button>
    </section>
}