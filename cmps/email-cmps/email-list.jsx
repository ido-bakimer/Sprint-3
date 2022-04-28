import { EmailFilter } from './email-filter.jsx'
import { EmailPreview } from './email-preview.jsx'

export function EmailList({ emails, onPreviewClick, onRemove, onStartComposing, onSetShowByStatus, onSetFilter, loadEmails, onToggleStar,onToggleRead }) {
    return <section className="email-list">
        <section>
            <i className="add-email fa-solid fa-plus" onClick={onStartComposing}>compose</i>
            <button onClick={() => onSetShowByStatus(null)}>ALL</button>
            <button onClick={() => onSetShowByStatus('inbox')}>Inbox</button>
            <button onClick={() => onSetShowByStatus('sent')}>Sent</button>
        </section>
        <EmailFilter onSetFilter={onSetFilter} emails={emails} loadEmails={loadEmails} />
        {emails.map(email => <EmailPreview email={email} onPreviewClick={onPreviewClick} onRemove={onRemove} key={email.id} onToggleStar={onToggleStar} onToggleRead={onToggleRead} />)}
    </section>
}