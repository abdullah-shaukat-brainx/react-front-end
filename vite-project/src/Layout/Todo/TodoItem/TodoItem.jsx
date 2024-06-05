import { toast } from "react-toastify";
import { deleteTodo, updateTodo } from "../../../Services/todoServices";
import { useState } from "react";
import "./TodoItem.css";
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";

function TodoItem({ text, id, status, updateRefresh }) {
  const removeTodo = () => {
    deleteTodo(id)
      .then(() => {
        toast.success(`Todo Removed Successfully.`);
        updateRefresh();
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
        onClick: () => {
          removeTodo();
        },
      },
      {
        label: "No",
        onClick: () => {
          return;
        },
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

  const [inputData, setInputData] = useState({ text, status });
  const [edit, setEdit] = useState(false);

  function handleChange(e) {
    setInputData({ ...inputData, [e.target.name]: e.target.value });
  }
  const handleUpdate = async (e) => {
    e.preventDefault(); // Prevent form submission from refreshing the page
    setEdit(true);
    if (inputData.text.trim() === "") {
      toast.error("Cant accept empty Text Field");
      return;
    }
    try {
      const response = await updateTodo(
        id,
        inputData.text.trim(),
        inputData.status
      );
      toast.success(`Todo Updated Successfully!`);
    } catch (error) {
      toast.error("Something went wrong!");
    } finally {
      setEdit(false);
      updateRefresh();
    }
  };
  return (
    <>
      {!edit ? (
        <>
          <div className="todo-item">
            <div
              className={`todo-item-text ${
                status === "Completed" ? "completed-item" : "incomplete-item"
              }`}
            >
              {`${text}`}
              <div className="status">{status}</div>
            </div>
            <div className="todo-item-controls">
              <div className="update-todo-button">
                <input
                  type="button"
                  value="Edit"
                  onClick={() => setEdit(!edit)}
                />
              </div>
              <div className="delete-todo-button">
                <input type="button" value="Delete" onClick={handleDelete} />
              </div>
            </div>
          </div>
        </>
      ) : (

        <div className="edit-field">
          <form className="form" onSubmit={handleUpdate}>
            <div className="update-todo-card">
              <div className="update-input-field-div">
                <div className="todo-item-text">
                  <input
                    type="text"
                    name="text"
                    id=""
                    value={inputData.text}
                    onChange={handleChange}
                  />
                </div>
                <div className="todo-status">
                  <select id="status" name="status" onChange={handleChange}>
                    <option value="Pending">Select a Status</option>
                    <option value="Pending">Pending</option>
                    <option value="Ongoing">Ongoing</option>
                    <option value="Completed">Completed</option>
                  </select>
                </div>
              </div>
              <div className="todo-submit-button">
                <input type="submit" value="Update" className="submit-button" />
              </div>
            </div>
          </form>
        </div>
      )}
    </>
  );
}
export default TodoItem;
