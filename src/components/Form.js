import React, {useEffect} from 'react'
import {v4 as uuidv4} from 'uuid'

function Form(props) {
    const {input, setInput, todos, setTodos, editTodo, setEditTodo} = props

    const updateTodo = (title, id, completed) => {
        const newTodo = todos.map((todo) =>
            todo.id === id ? {title, id, completed}: todo
        )
        setTodos(newTodo)
        setEditTodo('')
    }

    useEffect(()=> {
        if(editTodo){
            setInput(editTodo.title)
        } else{
            setInput('')
        }
    }, [setInput, editTodo])

    const onInputChange = e => {
        setInput(e.target.value)
    }

    const onFormSubmit = (e) => {
        e.preventDefault()

        if(!editTodo){
            setTodos([{
                id: uuidv4(), 
                title: input,
                complete: false
            }, ...todos])

            setInput('')

        } else {
            updateTodo(input, editTodo.id, editTodo.completed)
        }


    }
  return (
    <form onSubmit={onFormSubmit}>
        <input 
            type="text"
            placeholder="Enter a Todo ..."
            className="task-input"
            value={input}
            required
            onChange={onInputChange}
        />
        <button 
            className="button-add"
            type="submit"
        >
            {editTodo ? 'OK' : 'ADD'}
        </button>
    </form>

  )
}

export default Form