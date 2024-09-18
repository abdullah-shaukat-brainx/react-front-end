import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteTodoFromBackend,
  updateTodoInBackend,
} from "../../../features/todoThunk";
import { useState } from "react";
import "./TodoItem.css";
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";

function TodoItem({ text, id, status }) {
  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state.todos);
  const [inputData, setInputData] = useState({ text, status });
  const [edit, setEdit] = useState(false);

  const removeTodo = () => {
    dispatch(deleteTodoFromBackend(id))
      .unwrap()
      .then(() => {
        toast.success("Todo Removed Successfully.");
      })
      .catch((error) => {
        toast.error("Something went wrong!");
      });
  };

  const options = {
    title: "Delete Todo",
    message: "Are you sure you want to delete this todo item?",
    buttons: [
      {
        label: "Yes",
        onClick: () => removeTodo(),
      },
      {
        label: "No",
        onClick: () => {},
      },
    ],
    closeOnEscape: true,
    closeOnClickOutside: true,
    keyCodeForClose: [8, 32],
    overlayClassName: "overlay-custom-class-name",
  };

  const handleDelete = async () => {
    confirmAlert(options);
  };

  function handleChange(e) {
    setInputData({ ...inputData, [e.target.name]: e.target.value });
  }

  const handleUpdate = async (e) => {
    e.preventDefault();
    if (inputData.text.trim() === "") {
      toast.error("Can't accept empty Text Field");
      return;
    }
    dispatch(
      updateTodoInBackend({
        id,
        text: inputData.text.trim(),
        status: inputData.status,
      })
    )
      .unwrap()
      .then(() => {
        toast.success("Todo Updated Successfully!");
      })
      .catch((error) => {
        toast.error("Something went wrong!");
      });
    setEdit(false);
  };

  return (
    <>
      {!edit ? (
        <div className="todo-item">
          <div
            className={`todo-item-text ${
              status === "Completed" ? "completed-item" : "incomplete-item"
            }`}
          >
            {text}
            <div className="status">{status}</div>
          </div>
          <div className="todo-item-controls">
            <div className="update-todo-button">
              <input
                type="button"
                value="Edit"
                onClick={() => setEdit(!edit)}
                disabled={loading}
              />
            </div>
            <div className="delete-todo-button">
              <input
                type="button"
                value="Delete"
                onClick={handleDelete}
                disabled={loading}
              />
            </div>
          </div>
        </div>
      ) : (
        <div className="edit-field">
          <form className="form" onSubmit={handleUpdate}>
            <div className="update-todo-card">
              <div className="update-input-field-div">
                <div className="todo-item-text">
                  <input
                    type="text"
                    name="text"
                    value={inputData.text}
                    onChange={handleChange}
                  />
                </div>
                <div className="todo-status">
                  <select
                    id="status"
                    name="status"
                    value={inputData.status}
                    onChange={handleChange}
                  >
                    <option value="Pending">Select a Status</option>
                    <option value="Pending">Pending</option>
                    <option value="Ongoing">Ongoing</option>
                    <option value="Completed">Completed</option>
                  </select>
                </div>
              </div>
              <div className="todo-submit-button">
                <input
                  type="submit"
                  value={loading ? "Updating..." : "Update"}
                  className="submit-button"
                  disabled={loading}
                />
              </div>
            </div>
          </form>
        </div>
      )}
    </>
  );
}

export default TodoItem;
