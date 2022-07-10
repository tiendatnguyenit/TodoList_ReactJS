import React, { useState, useEffect } from "react";
import "./App.css";
import Header from "./components/Header";
import Form from "./components/Form";
import TodoList from "./components/TodoList";
import Footer from "./components/Footer";

function App() {
  const initialState = JSON.parse(localStorage.getItem("todos")) || [];
  const [todos, setTodos] = useState(initialState);
  const [editTodo, setEditTodo] = useState(null);
  const [isAll, setIsAll] = useState(true);
  const [isActive, setIsActive] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  return (
    <div className="container">
      <div className="app-wrapper">
        <Header />
        <Form
          todos={todos}
          setTodos={setTodos}
          editTodo={editTodo}
          setEditTodo={setEditTodo}
        />
        {isAll && (
          <TodoList
            todos={todos}
            setTodos={setTodos}
            setEditTodo={setEditTodo}
          />
        )}
        {isActive && (
          <TodoList
            todos={todos.filter((item) => item.completed === false)}
            setTodos={setTodos}
            setEditTodo={setEditTodo}
          />
        )}
        {isCompleted && (
          <TodoList
            todos={todos.filter((item) => item.completed)}
            setTodos={setTodos}
            setEditTodo={setEditTodo}
          />
        )}
        {todos.length > 0 ? (
          <Footer
            todos={todos}
            setTodos={setTodos}
            isAll={isAll}
            setIsAll={setIsAll}
            isActive={isActive}
            setIsActive={setIsActive}
            isCompleted={isCompleted}
            setIsCompleted={setIsCompleted}
          />
        ) : (
          ""
        )}
      </div>
    </div>
  );
}

export default App;
