import { ToastContainer, toast } from "react-toastify";
import { deleteTodo, updateTodo } from "../../../Services/todoServices";
import { useEffect, useState, useRef } from "react";
import "./TodoItem.css";

function TodoItem({ text, id, status, updateRefresh }) {
  const data = ({ text, status } = { text, status }); //Coming from Props.
  const [inputData, setInputData] = useState(data);

  const handleDelete = async () => {
    try {
      const response = await deleteTodo(id);
      toast.success(`${response?.data?.message}`);
      updateRefresh();
    } catch (error) {
      toast.error(`${error?.response?.data?.error}` || "Something went wrong!");
    }
  };

  //Update Functionality Here
  const [edit, setEdit] = useState(false);
  function handleChange(e) {
    setInputData({ ...inputData, [e.target.name]: e.target.value });
  }
  const handleUpdate = async () => {
    setEdit(true);
    try {
      const response = await updateTodo(id, inputData.text, inputData.status);
      toast.success(`${response?.data?.message}`);
      updateRefresh();
    } catch (error) {
      toast.error(`${error?.response?.data?.error}` || "Something went wrong!");
    } finally {
      setEdit(false);
    }
  };
  return (
    <>
      {!edit ? ( //if edit is false
        <div className="todo-item">
          <div
            className={`todo-item-text ${status === "Completed" ? "completed-item" : ""}`}
          >{`${text}: ${status}`}</div>
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
      ) : (
        //else (if edit is true)

        <div className="edit-field">
          <form className="form" onSubmit={handleUpdate}>
            <div className="update-todo-card">
              <div className="update-input-fields-div">
                <div className="todo-text">
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
