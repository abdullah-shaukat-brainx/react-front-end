import { ToastContainer, toast } from "react-toastify";
import { useEffect, useState, useRef } from "react";
import { getTodos } from "../../../Services/todoServices";
import CreateTodo from "../CreateTodo/CreateTodo";
import "./TodoHome.css";
import TodoItem from "../TodoItem/TodoItem";

function TodoHome() {
  const [todos, setTodos] = useState([]);

  const [refresh, setRefresh] = useState();
  const updateRefresh = () => {
    setRefresh(!refresh);
  };

  const fetchTodos = async () => {
    try {
      const response = await getTodos();
      setTodos(response.data.Todos);
    } catch (error) {
      toast.error(`${error?.response?.data?.error}` || "Unable to Fetch Todos");
    }
  };

  useEffect(() => {
    fetchTodos();
  }, [refresh]);

  return (
    <>
      <div className="username-header">
        <strong> Todos for: </strong>
        {JSON.parse(localStorage.getItem("user_details"))?.email}
      </div>
      <ToastContainer />
      <CreateTodo updateRefresh={updateRefresh} />
      {todos.length === 0 ? (
        <h2>Your todo list is empty.</h2>
      ) : (
        <div className="todos-card">
          <ul>
            {todos.map((todo, index) => (
              <li key={todo._id}>
                <TodoItem
                  id={todo._id}
                  text={todo.text}
                  status={todo.status}
                  updateRefresh={updateRefresh}
                />
              </li>
            ))}
          </ul>
        </div>
      )}
    </>
  );
}

export default TodoHome;
