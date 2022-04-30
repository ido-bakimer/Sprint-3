export function DynamicNoteInput({ noteType, handleInputSumbit }) {
    let plcholder;
    switch (noteType) {
        case 'NoteText':
            plcholder = "Enter text..."
            break;
        case 'NoteImg':
            plcholder = "Enter img url..."
            break;
        case 'NoteVideo':
            plcholder = "Enter video url..."
            break;
        case 'NoteTodos':
            plcholder = "Enter list title..."
            break;
        default:
            plcholder = 'Switch error';
            break;
    }

    return (
        <input name={noteType} placeholder={plcholder} onKeyDown={handleInputSumbit} />
    )
}