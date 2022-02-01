import React, { useRef } from 'react';
import './searchbarStyle.css';

interface Props {
    todo : string;
    setTodo : React.Dispatch<React.SetStateAction<string>>;
    handleAdd : (e: React.FormEvent)=>void;
}

const SearchBar = ({todo, setTodo, handleAdd} : Props) => {

const inputRef = useRef<HTMLInputElement>(null);

  return <form className='input' onSubmit={ (e)=> {
      handleAdd(e)
      inputRef.current?.blur();
      } }>
      <input 
      ref={ inputRef }
      type="input"
      value={ todo }
      onChange={ 
          (e)=>setTodo(e.target.value)
       }
      placeholder='Enter a task' className='input__box' />
      <button className='input__submit' type='submit'>Add</button>
    </form>;
};

export default SearchBar;
