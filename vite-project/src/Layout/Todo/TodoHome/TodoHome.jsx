import { toast } from "react-toastify";
import { useEffect, useState } from "react";
import { getTodos } from "../../../Services/todoServices";
import CreateTodo from "../CreateTodo/CreateTodo";
import "./TodoHome.css";
import TodoItem from "../TodoItem/TodoItem";
import { InfinitySpin } from "react-loader-spinner";
import { useNavigate } from "react-router";

function TodoHome() {
  const navigate = useNavigate();
  const [spinner, setSpinner] = useState(false);
  const [todos, setTodos] = useState([]);

  const [refresh, setRefresh] = useState();
  const updateRefresh = () => {
    setRefresh(!refresh);
  };

  const fetchTodos = async () => {
    setSpinner(true);
    try {
      const response = await getTodos();
      setTodos(response?.data?.Todos);
    } catch (error) {
      toast.error(`${error?.response?.data?.error}` || "Unable to Fetch Todos");
    } finally {
      setSpinner(false);
    }
  };
  useEffect(() => {
    fetchTodos();
  }, [refresh]);

  const handleLogout = () => {
    localStorage.clear();
    toast.success("User Logged out!");
    navigate("/users/login");
  };

  return (
    <>
      <div className="username-header">
        <div className="user-details">
          <strong> Todos for: </strong>
          {JSON.parse(localStorage.getItem("user_details"))?.email}
        </div>
        <div className="control-buttons">
          <div className="logout-button" onClick={handleLogout}>
            Logout
          </div>
          <div
            className="change-password-button"
            onClick={() => {
              navigate("/users/change_password");
            }}
          >
            Change Password
          </div>
        </div>
      </div>
      <CreateTodo updateRefresh={updateRefresh} />
      {todos.length === 0 ? (
        <h2>Your todo list is empty.</h2>
      ) : (
        <div className="todos-card">
          {spinner && (
            <div className="spinner">
              <InfinitySpin />
            </div>
          )}
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
