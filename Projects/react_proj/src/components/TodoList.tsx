import './TodoList.css';

interface TodoListProps {
    todos: {id: string, text: string}[];
    onDelTodo: (id: string) => void
}
const TodoList: React.FC<TodoListProps> = props => {
    return (
        <div className="todolist-component">
            <ul>
                {props.todos.map(todo => (
                    <li key={todo.id}>
                        <span>{todo.text}</span>
                        <button onClick={props.onDelTodo.bind(null, todo.id)}>DELETE</button>
                    </li>
                ))}
            </ul>
        </div>
    )
}

export default TodoList;