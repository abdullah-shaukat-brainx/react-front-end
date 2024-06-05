import { toast } from "react-toastify";
import { useEffect, useState } from "react";
import { getTodos } from "../../../Services/todoServices";
import CreateTodo from "../CreateTodo/CreateTodo";
import "./TodoHome.css";
import TodoItem from "../TodoItem/TodoItem";
import { InfinitySpin } from "react-loader-spinner";
import { useNavigate } from "react-router";
import { useSearchParams } from "react-router-dom";
import Pagination from "@mui/material/Pagination";

function TodoHome() {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const [spinner, setSpinner] = useState(false);
  const [todos, setTodos] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [refresh, setRefresh] = useState();
  const [totalPagesCount, setTotalPagesCount] = useState(1);
  const updateRefresh = () => {
    setRefresh(!refresh);
  };

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

  const [currentPage, setCurrentPage] = useState(
    parseInt(searchParams?.get("page")) || 1
  );
  const [limit, setLimit] = useState(parseInt(searchParams?.get("limit")) || 5);

  const fetchTodos = async (page, limit) => {
    setSpinner(true);
    try {
      const response = await getTodos({
        searchQuery: searchQuery.trim(),
        page: page,
        limit: limit,
      });
      setTotalPagesCount(parseInt(response?.data?.count));
      setTodos(response?.data?.Todos);
    } catch (error) {
      toast.error(`${error?.response?.data?.error}` || "Unable to Fetch Todos");
    } finally {
      setSpinner(false);
    }
  };

  useEffect(() => {
    fetchTodos(currentPage, limit);
  }, [refresh, debouncedSearchQuery, currentPage, limit, searchParams]);

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
      <CreateTodo updateRefresh={updateRefresh} />
      {todos.length === 0 ? (
        <h2>No todos to show.</h2>
      ) : (
        <>
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
          <div className="pages">
            <Pagination
              color="primary"
              defaultPage={1}
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
                  // setSearchParams({ page: 1, limit: {limit} });
                  setLimit(parseInt(e.target.value));
                  setCurrentPage(1);
                }}
              >
                <option value="3">3</option>
                <option value="5">5</option>
                {/* <option value="10">10</option> */}
              </select>
            </div>
          </div>
        </>
      )}
    </>
  );
}

export default TodoHome;
