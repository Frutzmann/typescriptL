import TodoList from "./components/TodoList";
import NewTodo from "./components/AddTodo";
import { Todo } from "./models/Todo";
import {useState} from 'react';


const App = () => {
  const [todos, setTodos] = useState<Todo[]>([])
  const todoAddHandler = (text: string) =>{
    const newTodo= {id: Math.random().toString(), text:text };
    setTodos(prevTodos => [...prevTodos, newTodo]);
  }

  const toDoDeleteHandler = (id: string) => {
    setTodos(prev => {
      return prev.filter(td => td.id !== id);
    })
  }
  return (
    <div className="App">
      <NewTodo onAddTodo={todoAddHandler} />
      <TodoList todos={todos} onDelTodo={toDoDeleteHandler} />
    </div>
  );
}

export default App;
