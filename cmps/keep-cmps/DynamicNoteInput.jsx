export function DynamicNoteInput({ noteType, handleInputSumbit }) {
    let plcholder;
    switch (noteType) {
        case 'NoteText':
            plcholder = "Enter text..."
            break;
        case 'NoteImg':
            plcholder = "Enter image url..."
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
        <input autoComplete="off" name={noteType} placeholder={plcholder} onKeyDown={handleInputSumbit} />
    )
}