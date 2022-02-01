import React, { useState } from 'react';
import './App.css';
import SearchBar from './components/SearchBar';
import TodoList from './components/TodoList';
import { Todo } from "./model";
import { DragDropContext, DropResult } from 'react-beautiful-dnd';


const App:React.FC = () => {


  const [todo, setTodo] = useState<string>("");
  const [todos, setTodos] = useState<Todo[]>([]);
  const [importantTodos, setImportantTodos] = useState<Todo[]>([]);

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();

    if (todo){
      setTodos([...todos, { id: Date.now(), todo, isDone: false  }]);
      setTodo("");
    }
  };

  const onDragEnd = (result:DropResult) => {
    const { source, destination } = result;

    if(!destination) return;

    if(destination.droppableId===source.droppableId && destination.index===source.index) return;

    let add, casual = todos, important = importantTodos;

    if (source.droppableId==='TodosList') {
      add = casual[source.index];
      casual.splice(source.index, 1);
    } else {
      add = important[source.index];
      important.splice(source.index, 1);
    }

    if (destination.droppableId==='TodosList') {
      casual.splice(destination.index, 0, add);
    } else {
      important.splice(destination.index,0,add);
    }

    setImportantTodos(important);
    setTodos(casual);
  };



  return (
    <DragDropContext onDragEnd={ onDragEnd }>
    <div className="App">
      <span className="heading">Managify</span>

      <SearchBar todo={todo} setTodo={setTodo} handleAdd={ handleAdd } />

      <TodoList todos={ todos } setTodos={ setTodos } importantTodos={ importantTodos } setImportantTodos={ setImportantTodos } />
    </div>
    </DragDropContext>
  );
}

export default App;
