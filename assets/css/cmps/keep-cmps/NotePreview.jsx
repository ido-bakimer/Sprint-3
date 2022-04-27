import { noteService } from '../services/Keep.service.js';
import { NoteColorPalette } from './NoteColorPalette.jsx';
import { DynamicNote } from './DynamicNote.jsx';

// TODO: fix the bug when updating a todo title
// TODO: fix isPanelHover state bug when notes change position
// TODO: fix and uncomment the Edit button

export class NotePreview extends React.Component {
    state = {
        note: this.props.note,
        isEditModeOn: false,
        isPanelHover: false,
        isShowColorPalette: false
    }

    onDeleteNote = () => {
        noteService.deleteNote(this.state.note.id);
        this.props.loadNotes();
    }

    onCopyNote = () => {
        noteService.copyNote(this.state.note.id);
        this.props.loadNotes();
    }

    onToggleEditNote = () => {
        this.setState({ isEditModeOn: !this.state.isEditModeOn })
    }

    handleMouseHover = () => {
        this.setState({
            isPanelHover: !this.state.isPanelHover,
        })
        if (this.state.isPanelHover === false) {
            this.setState({
                isShowColorPalette: false,
            })
        }
    }

    showColorPalette = () => {
        this.setState({ isShowColorPalette: !this.state.isShowColorPalette })
    }

    addDefaultImgSrc(ev) {
        ev.target.src = 'https://media.giphy.com/media/hrRJ41JB2zlgZiYcCw/giphy.gif';
    }

    handleInputSumbit = ({ keyCode, target }) => {
        // if user hit enter
        if (keyCode == 13) {
            let infoKey = this.getFirstInfoKey();
            let value = target.value;
            this.setState({
                note: {
                    ...this.state.note,
                    info: {
                        ...this.state.info,
                        [infoKey]: value
                    }
                }
            }, () => {
                noteService.updateNote(this.state.note.id, this.state.note);
            })

            this.setState({ isEditModeOn: !this.state.isEditModeOn })
            this.clearFields(target);
        }
    }

    // onEditBtn(ev) {
    //     console.log('onEditBtn func. my ev.target is:', ev.target);
    // }

    clearFields(target) {
        target.value = '';
    }

    getFirstInfoKey = () => {
        let infoFirstKey;
        let infoObj = this.state.note.info
        for (let prop in infoObj) {
            infoFirstKey = prop;
            break;
        }
        return infoFirstKey;
    }

    toggleTodo = (idx) => {
        // Messy. Ask for better way
        let todoIdx = idx;
        let currTodos = this.state.note.info.todos;
        let currTodo = currTodos[todoIdx];
        currTodo.isDone = !currTodo.isDone;
        currTodos[todoIdx] = currTodo;

        this.setState({
            note: {
                ...this.state.note,
                info: {
                    ...this.state.note.info,
                    todos: [
                        ...currTodos
                    ]
                }
            }
        }, () => {
            noteService.updateNote(this.state.note.id, this.state.note);
        })
    }

    deleteTodo = (ev, idx) => {
        ev.stopPropagation();
        let todoIdx = idx;
        let currTodos = this.state.note.info.todos;
        currTodos.splice(todoIdx, 1)
        this.setState({
            note: {
                ...this.state.note,
                info: {
                    ...this.state.note.info,
                    todos: [
                        ...currTodos
                    ]
                }
            }
        }, () => {
            noteService.updateNote(this.state.note.id, this.state.note);
        })
    }

    addTodo = (ev, value) => {
        if (ev.target.value === '') return
        if (ev.keyCode == 13) {

            const currTodo = {
                txt: value,
                isDone: false
            }
            const currTodos = this.state.note.info.todos;
            currTodos.push(currTodo);
            this.setState({
                note: {
                    ...this.state.note,
                    info: {
                        ...this.state.note.info,
                        todos: [
                            ...currTodos
                        ]
                    }
                }
            });
            noteService.updateNote(this.state.note.id, this.state.note);
            ev.target.value = '';
        }
    }

    changeBgColor = (color) => {
        this.setState({
            note: {
                ...this.state.note,
                style: {
                    backgroundColor: color
                }
            }
        }, () => {
            noteService.updateNote(this.state.note.id, this.state.note)
        }
        );
    }

    togglePin = () => {
        this.setState({
            note: {
                ...this.state.note,
                isPinned: !this.state.note.isPinned
            }
        }, () => {
            noteService.updateNote(this.state.note.id, this.state.note)
        });
        this.props.loadNotes();
    }

    render() {
        const { note, isEditModeOn, isPanelHover } = this.state;
        let infoKey = this.getFirstInfoKey()

        return (
            <div className="note-preview " onMouseEnter={this.handleMouseHover} onMouseLeave={this.handleMouseHover} style={{ backgroundColor: note.style.backgroundColor }}>
                <section className="note-preview-details" >
                    {<DynamicNote note={note} addDefaultImgSrc={this.addDefaultImgSrc} toggleTodo={this.toggleTodo} deleteTodo={this.deleteTodo} addTodo={this.addTodo} />}
                </section>


                <section className={`note-preview-control-panel flex justify-end align-end ${!isPanelHover && 'visibility-hidden'}`}>

                    <div className="note-preview-btn-container ">
                        <button onClick={this.togglePin}>
                            <i className="note-btn fas fa-thumbtack"></i>
                        </button>
                    </div>
                    <div className="note-preview-btn-container ">
                        <button onClick={this.showColorPalette}>
                            <i className="note-btn fas fa-palette"></i>
                        </button>
                    </div>
                    <div className="note-preview-btn-container ">
                        <button onClick={this.onToggleEditNote}>
                            <i className="note-btn fas fa-edit"></i>
                        </button>
                    </div>
                    <div className="note-preview-btn-container ">
                        <button onClick={this.onCopyNote}>
                            <i className="note-btn fas fa-copy"></i>
                        </button>
                    </div>
                    <div className="note-preview-btn-container ">
                        <button onClick={this.onDeleteNote}>
                            <i className="note-btn fas fa-trash"></i>
                        </button>
                    </div>
                </section>
                {isEditModeOn &&
                    <section className="note-edit-control-panel flex column justify-end">

                        <input type="text" defaultValue={note.info[infoKey]} onKeyDown={this.handleInputSumbit} />
                        <div className="note-edit-btn-container flex space-between">
                            {/* <button onClick={this.onEditBtn}>Update</button> */}
                            <button onClick={this.onToggleEditNote}>Cancel</button>
                        </div>
                    </section>}
                {this.state.isShowColorPalette && this.state.isPanelHover && <NoteColorPalette changeBgColor={this.changeBgColor} />}
            </div >
        )
    }
}