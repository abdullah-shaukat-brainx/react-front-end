import { toast } from "react-toastify";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addTodoToBackend } from "../../../features/todoThunk"; // Redux action
import "./CreateTodo.css";

function CreateTodo() {
  const dispatch = useDispatch();
  const [inputData, setInputData] = useState({ text: "", status: "Pending" });
  const { loading } = useSelector((state) => state.todos); // Get loading state from Redux

  function handleChange(e) {
    setInputData({ ...inputData, [e.target.name]: e.target.value });
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (!inputData.text.trim()) {
      toast.error("Can't accept empty text field!!!");
      return;
    }

    dispatch(
      addTodoToBackend({ text: inputData.text, status: inputData.status })
    )
      .unwrap()
      .then(() => {
        toast.success("Todo added to your records.");
        setInputData({ text: "", status: "Pending" });
      })
      .catch((error) => {
        console.error(error);
        toast.error(error?.message || "Failed to add todo.");
      });
  }

  return (
    <>
      <form className="form" onSubmit={handleSubmit}>
        <div className="create-todo-card">
          <div className="todo-text">
            <input
              type="text"
              name="text"
              value={inputData.text}
              onChange={handleChange}
              disabled={loading}
            />
          </div>
          <div className="todo-submit-button">
            <input
              type="submit"
              value={loading ? "Adding..." : "Add"}
              className="submit-button"
              disabled={loading}
            />
          </div>
        </div>
      </form>
    </>
  );
}

export default CreateTodo;
