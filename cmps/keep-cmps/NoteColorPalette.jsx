
export function NoteColorPalette({ changeBgColor }) {

    const setNoteBgColor = (ev) => {
        changeBgColor(ev.target.value);
    }

    return (
        <div className="note-color-palette flex space-around">
            <button className="note-color-palette-button note-color-1" value="#b1ffaa" onClick={setNoteBgColor}></button>
            <button className="note-color-palette-button note-color-2" value="#68fff0" onClick={setNoteBgColor}></button>
            <button className="note-color-palette-button note-color-3" value="#75acff" onClick={setNoteBgColor}></button>
            <button className="note-color-palette-button note-color-4" value="#c988ff" onClick={setNoteBgColor}></button>
            <button className="note-color-palette-button note-color-5" value="#ff8882" onClick={setNoteBgColor}></button>
            <button className="note-color-palette-button note-color-6" value="#ffc996" onClick={setNoteBgColor}></button>
        </div>
    )
}

