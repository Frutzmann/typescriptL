import React, {useRef} from 'react';
import "./AddTodo.css";

interface iNewTodo {
    onAddTodo: (todoText: string) => void
}

const NewTodo : React.FC<iNewTodo> = (props) => {
    const textInputRef = useRef<HTMLInputElement>(null);
    const todoSubmitHandler = (event: React.FormEvent) => {
        event.preventDefault();
        props.onAddTodo(textInputRef.current!.value);
        textInputRef.current!.value = '';
    }
    return <form className="form-control" onSubmit={todoSubmitHandler}>
            <div>
            <label htmlFor="text" id="todo-text">
                Todo Text
            </label>
            <input type="text" id="todo-text" ref={textInputRef}/>
            </div>
            <button type="submit">ADD</button>
        </form>
}

export default NewTodo;