import { NotePreview } from './NotePreview.jsx';

export function NoteList({ notes, loadNotes }) {
    if (notes.length === 0) {
        return null;
    }
    const isPinned = notes[0].isPinned;
    return (
        <div className="note-list">
            <h3>{isPinned && 'Pinned Notes' || !isPinned && 'Unpinned Notes'}</h3>
            <div className="note-list-container">

                {notes.map(note => {
                    return <NotePreview note={note} key={note.id} loadNotes={loadNotes} />
                })}
            </div>
        </div>
    )
}