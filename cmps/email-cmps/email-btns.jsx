export function EmailBtns({onToggleStar, onToggleRead, onRemove, email, onReplying}){

    return<div className="email-btns">
    <i onClick={(ev) => onRemove(ev, email.id)} title="Delete email" className="fa-solid fa-trash-can"></i>
    {email.isStarred && <i onClick={(ev) => onToggleStar(ev, email)} title="unstar" className="fa-solid fa-star"></i>}
    {!email.isStarred && <i onClick={(ev) => onToggleStar(ev, email)} title="star" className="far fa-star"></i>}
    {email.isRead&&<i onClick={(ev) => onToggleRead(ev, email)} title="Mark as unread" className="fa-solid fa-envelope-open"></i>}
    {!email.isRead&&<i onClick={(ev) => onToggleRead(ev, email)} title="Mark as read" className="fa-solid fa-envelope"></i>}
    {onReplying&&<i onClick={onReplying} title="Reply" className="fa-solid fa-reply"></i>}
</div>
}