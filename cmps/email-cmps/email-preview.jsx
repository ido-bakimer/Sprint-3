import { EmailBtns } from "./email-btns.jsx"
import { LongText } from "../long-text"

const { Link } = ReactRouterDOM
export function EmailPreview({ email, onPreviewClick, onRemove, onToggleStar,onToggleRead, onRecycle, makeNotefromEmail }) {
    // console.log(email);
    const date = new Date(email.sentAt)
    const month = date.toLocaleString('en-us', { month: 'short' })
    const year = date.getFullYear()
    return <div
        onClick={() => onPreviewClick(email)} className={'email-preview flex space-between ' + (email.isRead ? 'read' : '')}>
        <div className="from">{email.status === 'inbox' ? `${email.from}(${email.status})` : `${email.to}(${email.status})`}</div>
        <div className="subject">{email.subject}</div>
        <EmailBtns onRemove={onRemove} onToggleStar={onToggleStar} onToggleRead={onToggleRead} onRecycle={onRecycle} email={email} makeNotefromEmail={makeNotefromEmail} />
        <div className="date">{date.getDate()}/{month}/{year}</div>
    </div>

}