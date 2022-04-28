import { NoteText } from './NoteText.jsx';
import { NoteImg } from './NoteImg.jsx';
import { NoteVideo } from './NoteVideo.jsx';
import { NoteTodo } from './NoteTodo.jsx';

export function DynamicNote({ note, addDefaultImgSrc, toggleTodo, deleteTodo, addTodo }) {
    switch (note.type) {
        case 'NoteText':
            return <NoteText note={note} />
        case 'NoteImg':
            return <NoteImg note={note} addDefaultImgSrc={addDefaultImgSrc} />
        case 'NoteVideo':
            return <NoteVideo note={note} />

        case 'NoteTodos':
            return <NoteTodo note={note} toggleTodo={toggleTodo} deleteTodo={deleteTodo} addTodo={addTodo} />
        default:
            console.log('switch error');
            return <NoteText note={note} />
    }
}