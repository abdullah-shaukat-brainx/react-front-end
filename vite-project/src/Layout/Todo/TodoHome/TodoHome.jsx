import { toast } from "react-toastify";
import { useEffect, useState } from "react";
import { InfinitySpin } from "react-loader-spinner";
import { useNavigate } from "react-router";
import { useSearchParams } from "react-router-dom";
import Pagination from "@mui/material/Pagination";
import { useDispatch, useSelector } from "react-redux";
import { fetchTodosFromApi } from "../../../features/todoThunk";
import CreateTodo from "../CreateTodo/CreateTodo";
import TodoItem from "../TodoItem/TodoItem";
import "./TodoHome.css";

function TodoHome() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchQuery, setSearchQuery] = useState("");
  const [refresh, setRefresh] = useState(false);
  const [currentPage, setCurrentPage] = useState(
    parseInt(searchParams.get("page")) || 1
  );
  const [limit, setLimit] = useState(parseInt(searchParams.get("limit")) || 5);

  const { todos, totalPagesCount, loading } = useSelector(
    (state) => state.todos
  );

  const useDebouncedValue = (inputValue, delay) => {
    const [debouncedValue, setDebouncedValue] = useState(inputValue);

    useEffect(() => {
      const handler = setTimeout(() => {
        setDebouncedValue(inputValue);
      }, delay);

      return () => {
        clearTimeout(handler);
      };
    }, [inputValue, delay]);

    return debouncedValue;
  };

  const debouncedSearchQuery = useDebouncedValue(searchQuery, 500);

  const handleChange = (e) => {
    setSearchQuery(e.target.value);
    setCurrentPage(1);
  };

  const fetchTodos = () => {
    dispatch(
      fetchTodosFromApi({
        searchQuery: searchQuery.trim(),
        page: currentPage,
        limit: limit,
      })
    );
  };

  useEffect(() => {
    if (!todos) {
      fetchTodos();
    }
  }, [refresh]);

  useEffect(() => {
    fetchTodos();
  }, [currentPage, debouncedSearchQuery, limit]);

  useEffect(() => {
    setSearchParams({ page: currentPage, limit: limit });
  }, [currentPage, limit]);

  const handleLogout = () => {
    localStorage.clear();
    toast.success("User Logged out!");
    navigate("/users/login");
  };

  const handlePageChange = (event, value) => {
    setCurrentPage(value);
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
        <div className="search-box">
          <input
            type="text"
            onChange={handleChange}
            placeholder="Search Todo text here"
          />
        </div>
      </div>
      <CreateTodo onRefresh={() => setRefresh(!refresh)} />
      {loading ? (
        <div className="spinner">
          <InfinitySpin />
        </div>
      ) : todos.length === 0 ? (
        <h2>No todos to show.</h2>
      ) : (
        <>
          <div className="todos-card">
            <ul>
              {todos?.map((todo) => (
                <li key={todo._id}>
                  <TodoItem
                    id={todo._id}
                    text={todo.text}
                    status={todo.status}
                    onUpdate={() => setRefresh(!refresh)} // Ensure refresh is toggled
                  />
                </li>
              ))}
            </ul>
          </div>
          <div className="pages">
            <Pagination
              color="primary"
              count={Math.ceil(totalPagesCount / limit)}
              page={currentPage}
              onChange={handlePageChange}
              size="large"
            />
            <div className="limit-selection">
              Showing {limit} items per Page
              <select
                name="limit"
                value={limit}
                onChange={(e) => {
                  setLimit(parseInt(e.target.value));
                  setCurrentPage(1);
                }}
              >
                <option value="3">3</option>
                <option value="5">5</option>
              </select>
            </div>
          </div>
        </>
      )}
    </>
  );
}

export default TodoHome;
