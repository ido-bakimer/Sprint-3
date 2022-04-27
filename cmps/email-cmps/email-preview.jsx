const { Link } = ReactRouterDOM
export function EmailPreview({ email, onPreviewClick}){
    // console.log(email);

    return<div onClick={onPreviewClick(email)} className={'email-preview ' + (email.isRead ? 'read' : '')}>
        {email.subject}</div>

}