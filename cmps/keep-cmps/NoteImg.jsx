export function NoteImg({ note, addDefaultImgSrc }) {
    return (
        <img src={note.info.imgUrl} onError={addDefaultImgSrc}></img>
    )
}
