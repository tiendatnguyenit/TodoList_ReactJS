import React, { useState, useEffect, useRef } from "react";
import { v4 as uuidv4 } from "uuid";

function Form(props) {
  const { todos, setTodos, editTodo, setEditTodo } = props;
  const [input, setInput] = useState("");

  const inputRef = useRef();

  const updateTodo = (title, id, completed) => {
    const newTodo = todos.map((todo) =>
      todo.id === id ? { title, id, completed } : todo
    );
    setTodos(newTodo);
    setEditTodo("");
  };

  useEffect(() => {
    if (editTodo) {
      setInput(editTodo.title);
      inputRef.current.focus();
    } else {
      setInput("");
    }
  }, [setInput, editTodo]);

  const onInputChange = (e) => {
    setInput(e.target.value);
  };

  const onFormSubmit = (e) => {
    e.preventDefault();
    if (!editTodo) {
      if (!input || /^\s*$/.test(input)) {
        setInput("");
        inputRef.current.focus();
        alert("Invalid input data. Please try again!");
        return;
      }

      setTodos([
        ...todos,
        {
          id: uuidv4(),
          title: input.trim(),
          completed: false,
        },
      ]);

      setInput("");
      inputRef.current.focus();
    } else {
      if (!input || /^\s*$/.test(input)) {
        setInput("");
        inputRef.current.focus();
        alert("Invalid input data. Please try again!");
        return;
      }
      updateTodo(input.trim(), editTodo.id, editTodo.completed);
    }
  };
  return (
    <form className="form" onSubmit={onFormSubmit}>
      <input
        ref={inputRef}
        type="text"
        placeholder="Enter a Todo ..."
        className="task-input"
        value={input}
        required
        onChange={onInputChange}
      />
      <button className="button-add" type="submit">
        {editTodo ? "OK" : "ADD"}
      </button>
    </form>
  );
}

export default Form;
