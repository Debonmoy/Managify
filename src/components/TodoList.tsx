import React from 'react';
import { Droppable } from 'react-beautiful-dnd';
import { Todo } from '../model';
import SingleTodo from './SingleTodo';
import './todoStyles.css';


interface Props {
    todos : Todo[];
    setTodos : React.Dispatch<React.SetStateAction<Todo[]>>;
    importantTodos : Todo[];
    setImportantTodos : React.Dispatch<React.SetStateAction<Todo[]>>;
}


const TodoList:React.FC<Props> = ({ todos, setTodos, importantTodos, setImportantTodos }) => {
  return (
      <div className="container">
          <Droppable droppableId='TodosList'>
              {
                  (provided, snapshot)=> (
                      <div className={`todos ${snapshot.isDraggingOver ? 'dragCasual' : "" }`} ref={provided.innerRef} {...provided.droppableProps}>
                        <span className="todos__heading">
                            Causal Tasks
                        </span>
                {
                    todos.map((todo, index)=>(
                        <SingleTodo index={index} todo={todo} todos={todos} key={todo.id} setTodos={setTodos} />
                    ))
                }
                {provided.placeholder}
          </div>
                  )
              }
            
          </Droppable>
          
          {/* Important Todos List */}
          <Droppable droppableId='TodoImportantList'>
              {
                  (provided, snapshot)=> (
                    <div className={`todos remove ${snapshot.isDraggingOver ? 'dragImportant' : "" }`} ref={provided.innerRef} {...provided.droppableProps}>
                        <span className="todos__heading">
                            Important Tasks
                        </span>
                        {
                            importantTodos.map((todo, index)=>(
                                <SingleTodo index={index} todo={todo} todos={importantTodos} key={todo.id} setTodos={setImportantTodos} />
                            ))
                        }
                        {provided.placeholder}
                    </div>  
                  )
              }
          
          </Droppable>
      </div>
  );
};

export default TodoList;

