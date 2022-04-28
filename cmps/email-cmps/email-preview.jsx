const { Link } = ReactRouterDOM
export function EmailPreview({ email, onPreviewClick, onRemove, onToggleStar,onToggleRead }) {
    // console.log(email);
    const date = new Date(email.sentAt)
    const month = date.toLocaleString('default', { month: 'short' })
    const year = date.getFullYear()
    return <div
        onClick={() => onPreviewClick(email)} className={'email-preview flex space-between ' + (email.isRead ? 'read' : '')}>
        <span className="from">{email.status === 'inbox' ? `${email.from}(${email.status})` : `${email.to}(${email.status})`}</span>
        <span className="subject">{email.subject}</span>
        <div className="btns">
            <i onClick={(ev) => onRemove(ev, email.id)} title="Delete email" className="fa-solid fa-trash-can"></i>
            {email.isStarred && <i onClick={(ev) => onToggleStar(ev, email)} className="fa-solid fa-star"></i>}
            {!email.isStarred && <i onClick={(ev) => onToggleStar(ev, email)} className="far fa-star"></i>}
            {email.isRead&&<i onClick={(ev) => onToggleRead(ev, email)} className="fa-solid fa-envelope-open"></i>}
            {!email.isRead&&<i onClick={(ev) => onToggleRead(ev, email)} className="fa-solid fa-envelope"></i>}
        </div>
        <span className="date">{date.getDate()}/{month}/{year}</span>
    </div>

}