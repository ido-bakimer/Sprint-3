import { EmailPreview } from './email-preview.jsx'

export function EmailList({ emails, onPreviewClick}) {
    return <section className="email-list">
        {emails.map(email => <EmailPreview email={email} onPreviewClick={onPreviewClick} key={email.id}/>)}
    </section>
}