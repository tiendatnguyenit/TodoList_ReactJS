import React, { useState, useEffect } from "react";
import "./App.css";
import Header from "./components/Header";
import Form from "./components/Form";
import TodoList from "./components/TodoList";
import Footer from "./components/Footer";
import callApi from "./ultils/apiCaller";

function App() {
  const [todos, setTodos] = useState([]);
  const [editTodo, setEditTodo] = useState(null);
  const [isAll, setIsAll] = useState(true);
  const [isActive, setIsActive] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);

  useEffect(() => {
    callApi("todos", "GET", null).then((res) => {
      setTodos(res.data);
    });
  }, []);

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
