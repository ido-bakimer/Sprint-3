import { noteService } from '../services/Keep.service.js';
import { eventBusService } from '../services/event-bus-service.js'

import { CreateNote } from '../cmps/keep-cmps/CreateNote.jsx';
import { NoteList } from '../cmps/keep-cmps/NoteList.jsx';
import { Loader } from '../cmps/Loader.jsx';
import { EmailCompose } from '../cmps/email-cmps/email-compose.jsx';

export class KeepApp extends React.Component {

  state = {
    notes: null,
    isCopmposing: false,
    info:'',
  }

  componentDidMount() {
    eventBusService.emit('changeHeader',`Keep`)
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

  onStartComposing = (info) => {
    
    this.setState({ isCopmposing: true, info:info })
  }

  onEndComposing = () => {
    this.setState({ isCopmposing: false })
  }
  render() {
    const { notes } = this.state;
    if (!notes) return <Loader />
    const pinnedNotes = this.getPinnedNotes();
    const unPinnedNotes = this.getUnpinnedNotes();

    return (
      <section className="note-app container">
        <CreateNote loadNotes={this.loadNotes} />
        <NoteList notes={pinnedNotes} onStartComposing={this.onStartComposing} loadNotes={this.loadNotes} />
        <NoteList notes={unPinnedNotes} onStartComposing={this.onStartComposing} loadNotes={this.loadNotes} />
        {this.state.isCopmposing && <EmailCompose onEndComposing={this.onEndComposing} info={this.state.info} />}
      </section>
    )
  }
}