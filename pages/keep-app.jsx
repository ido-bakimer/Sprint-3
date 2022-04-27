import { CreateNote } from '../cmps/keep-cmps/CreateNote.jsx';
import { NoteList } from '../cmps/keep-cmps/NoteList.jsx';
import { noteService } from '../services/Keep.service.js';
import { Loader } from '../cmps/Loader.jsx';

export class KeepApp extends React.Component {

  state = {
    notes: null
  }

  componentDidMount() {
    this.loadNotes();
  }

  loadNotes = () => {
    noteService.query().then((notes) => {
      this.setState({ notes });
    })
  }

  getPinnedNotes = () => {
    if (!this.state.notes) return
    const pinnedNotes = this.state.notes.filter(note => {
      return note.isPinned;
    })
    return pinnedNotes;
  }

  getUnpinnedNotes = () => {
    if (!this.state.notes) return
    const unPinnedNotes = this.state.notes.filter(note => {
      return !note.isPinned;
    })
    return unPinnedNotes
  }

  render() {
    const { notes } = this.state;
    if (!notes) return <Loader />
    const pinnedNotes = this.getPinnedNotes();
    const unPinnedNotes = this.getUnpinnedNotes();

    return (
      <section className="note-app container">
        <CreateNote loadNotes={this.loadNotes} />
        <NoteList notes={pinnedNotes} loadNotes={this.loadNotes} />
        <NoteList notes={unPinnedNotes} loadNotes={this.loadNotes} />
      </section>
    )
  }
}