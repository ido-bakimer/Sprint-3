import { NoteText } from './NoteText.jsx';

export function DynamicNote({ note, addDefaultImgSrc, toggleTodo, deleteTodo, addTodo }) {
    console.log(note.type)
    return <NoteText note={note} />

}