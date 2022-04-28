

export function EmailStatus({ onStartComposing, onSetShowByStatus, }) {

    return <section className="email-status">
        <i className="add-email fa-solid fa-plus" onClick={onStartComposing}>compose</i>
        <button onClick={() => onSetShowByStatus(null)}>ALL</button>
        <button onClick={() => onSetShowByStatus('inbox')}>Inbox</button>
        <button onClick={() => onSetShowByStatus('sent')}>Sent</button>
    </section>
}