import { EmailFilter } from './email-filter.jsx'
import { EmailPreview } from './email-preview.jsx'

export function EmailList({ emails, onPreviewClick, onRemove, onToggleStar, onToggleRead, onRecycle, makeNotefromEmail }) {
    return <section className="email-list">
        {emails.map(email => <EmailPreview email={email} onPreviewClick={onPreviewClick} onRemove={onRemove} key={email.id} onToggleStar={onToggleStar} onToggleRead={onToggleRead} onRecycle={onRecycle} makeNotefromEmail={makeNotefromEmail} />)}
    </section>
}