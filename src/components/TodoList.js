import React from "react";
import callApi from "../ultils/apiCaller";

function TodoList(props) {
  const { todos, setTodos, setEditTodo } = props;

  const handleComplete = ({ title, idUser, completed, id }) => {
    callApi(`todos/${id}`, "PUT", {
      title,
      idUser,
      completed: !completed,
      id,
    })
    setTodos(
      todos.map((item) => {
        if (item.id === id) {
          return { ...item, completed: !item.completed };
        }
        return item;
      })
    );
  };

  const handleEdit = ({ id }) => {
    const findTodo = todos.find((todo) => todo.id === id);
    if (findTodo.completed) {
      alert("Unable to edit a completed todo");
    } else {
      setEditTodo(findTodo);
    }
  };

  const handleDelete = ({ id }) => {
    callApi(`todos/${id}`, "DELETE", null)
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  return (
    <div>
      {todos.map((todo) => (
        <li className="list-item" key={todo.id}>
          <input
            type="text"
            value={todo.title}
            className={`list ${todo.completed ? "complete" : ""}  `}
            onChange={(e) => e.preventDefault()}
          />

          <button
            className="button-complete task-button"
            onClick={() => handleComplete(todo)}
          >
            <i className="fa fa-check-circle"></i>
          </button>

          <button
            className="button-edit task-button"
            onClick={() => {
              handleEdit(todo);
            }}
          >
            <i className="fa fa-edit"></i>
          </button>

          <button
            className="button-delete task-button"
            onClick={() => handleDelete(todo)}
          >
            <i className="fa fa-trash"></i>
          </button>
        </li>
      ))}
    </div>
  );
}

export default TodoList;
