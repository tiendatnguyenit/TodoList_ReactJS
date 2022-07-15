import React from "react";
import callApi from "../ultils/apiCaller";

function Footer(props) {
  const {
    todos,
    setTodos,
    isActive,
    setIsActive,
    isAll,
    setIsAll,
    isCompleted,
    setIsCompleted,
  } = props;

  const handleClear = () => {
    todos.map(todo => {
      if(todo.completed){
        callApi(`todos/${todo.id}`, "DELETE", null)
      }
    })
    setTodos(todos.filter((todo) => todo.completed === false));
  };

  const checkComplete = () =>
    todos.filter((todo) => todo.completed === true).length;

  const itemLeft = () => {
    const list = todos.filter((todo) => todo.completed === false);
    return list.length;
  };

  //filterAll
  const handleAll = () => {
    setIsAll(true);
    setIsActive(false);
    setIsCompleted(false);
  };

  //filterActive
  const handleActive = () => {
    setIsActive(true);
    setIsAll(false);
    setIsCompleted(false);
  };

  //filterCompleted
  const handleCompleted = () => {
    setIsCompleted(true);
    setIsAll(false);
    setIsActive(false);
  };

  return (
    <div className="footer">
      <span className="todo-count">
        <strong>{itemLeft()}</strong> item left
      </span>
      <ul className="filters">
        <li>
          <a
            className={`${isAll ? "selected" : ""}`}
            href="#/"
            onClick={handleAll}
          >
            All
          </a>
        </li>
        <li>
          <a
            className={`${isActive ? "selected" : ""}`}
            href="#/active"
            onClick={handleActive}
          >
            Active
          </a>
        </li>
        <li>
          <a
            className={`${isCompleted ? "selected" : ""}`}
            href="#/completed"
            onClick={handleCompleted}
          >
            Completed
          </a>
        </li>
      </ul>

      <button
        className={`clear-completed ${checkComplete() ? "" : "hide"}`}
        onClick={handleClear}
      >
        Clear completed
      </button>
    </div>
  );
}

export default Footer;
