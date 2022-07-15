import React, { useState, useEffect, useRef } from "react";
import callApi from "../ultils/apiCaller";

function Form(props) {
  const { todos, setTodos, editTodo, setEditTodo } = props;
  const [input, setInput] = useState("");

  const inputRef = useRef();

  const updateTodo = (title, idUser, completed, id) => {
    const newTodo = todos.map((todo) =>
      todo.id === id ? { title, idUser, completed, id } : todo
    );

    callApi(`todos/${id}`, "PUT", {
      title,
      completed,
      idUser,
    }).then((res) => {
      setTodos(newTodo);
      setEditTodo("");
    });
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

      callApi("todos", "POST", {
        title: input.trim(),
        completed: false,
        idUser: 1,
      }).then((res) => {
        setTodos([
          ...todos,
          {
            id: res.data.id,
            title: input.trim(),
            completed: false,
            idUser: 1,
          },
        ]);
      });

      setInput("");
      inputRef.current.focus();
    } else {
      if (!input || /^\s*$/.test(input)) {
        setInput("");
        inputRef.current.focus();
        alert("Invalid input data. Please try again!");
        return;
      }
      updateTodo(
        input.trim(),
        editTodo.idUser,
        editTodo.completed,
        editTodo.id
      );
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
