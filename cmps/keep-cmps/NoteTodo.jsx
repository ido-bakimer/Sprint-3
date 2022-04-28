export function NoteTodo({ note, toggleTodo, deleteTodo, addTodo }) {
    return (
        <React.Fragment>
            <h3>{note.info.label}</h3>
            <ul className="note-todo-list clean-list ">
                {note.info.todos.map((todo, idx) => {
                    return (
                        <li key={idx} className={`note-todo-item flex space-between ${todo.isDone && 'done'} `} onClick={() => {
                            toggleTodo(idx)
                        }}>
                            {todo.txt}
                            <button onClick={(ev) => {
                                deleteTodo(ev, idx)
                            }}>
                                <i className="fas fa-times"></i>
                            </button>
                        </li>
                    )
                })
                }
            </ul>

            <input className="note-todo-input" type="text" name="" placeholder="Enter a todo..." onKeyDown={(ev) => {
                addTodo(ev, ev.target.value);
            }} />

        </React.Fragment>
    )
}