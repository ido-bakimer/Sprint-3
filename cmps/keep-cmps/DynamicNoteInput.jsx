export function DynamicNoteInput({ noteType, handleInputSumbit }) {


    return (
        <input name='NoteText' placeholder="type a note" onKeyDown={handleInputSumbit} />
    )
}