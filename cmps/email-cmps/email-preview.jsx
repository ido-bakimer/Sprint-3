const { Link } = ReactRouterDOM
export function EmailPreview({ email, onPreviewClick,onRemove }) {
    // console.log(email);
    const date = new Date(email.sentAt)
    const month = date.toLocaleString('default', { month: 'short' })
    return <div
        onClick={() => onPreviewClick(email)} className={'email-preview flex space-between ' + (email.isRead ? 'read' : '')}>
        <span className="from">{email.status==='inbox'?`${email.from}(${email.status})`:`${email.to}(${email.status})`}</span>
        <span className="subject">{email.subject}</span>
        <div className="btns">
        <button onClick={(ev)=>onRemove(ev,email.id)} title="Delete email">🗑️</button>
        </div>
        <span className="date">{date.getDate()}/{month}</span>
    </div>

}