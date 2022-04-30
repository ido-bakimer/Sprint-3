

export function EmailStatus({ onStartComposing, onSetShowByStatus, showByStatus, }) {
const all = !showByStatus? 'active':''
let inbox = showByStatus==='inbox'? 'active':''
let sent = showByStatus==='sent'? 'active':''
let trash = showByStatus==='trash'? 'active':''
    return <section className="email-status">
        <i className="add-email fa-solid fa-plus" onClick={onStartComposing}>compose</i>
        <button className={`email-status-btn ${all}`} onClick={() => onSetShowByStatus(null)}>All</button>
        <button className={`email-status-btn ${inbox}`} onClick={() => onSetShowByStatus('inbox')}>Inbox</button>
        <button className={`email-status-btn ${sent}`} onClick={() => onSetShowByStatus('sent')}>Sent</button>
        <button className={`email-status-btn ${trash}`} onClick={() => onSetShowByStatus('trash')}>trash</button>
    </section>
}