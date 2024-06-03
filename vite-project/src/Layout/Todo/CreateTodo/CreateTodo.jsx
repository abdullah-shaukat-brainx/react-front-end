import { ToastContainer, toast } from "react-toastify";
import { addTodo } from "../../../Services/todoServices";
import { useState } from "react";
import "./CreateTodo.css";

function CreateTodo({ updateRefresh }) {
  const [inputData, setInputData] = useState({ text: "", status: "Pending" });

  function handleChange(e) {
    setInputData({ ...inputData, [e.target.name]: e.target.value });
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (!inputData.text.trim()) {
      toast.error("Can't accept empty text field!!!");
      return;
    }
    addTodo(inputData.text, inputData.status)
      .then((data) => {
        toast.success("Todo added to your records.");
        updateRefresh();
      })
      .catch((error) => {
        console.log(error);
        toast.error(error?.response?.data?.error);
      });

    setInputData({ ...inputData, text: "" }); // Clear the input field after submission
  }

  return (
    <>
      <form className="form" onSubmit={handleSubmit}>
        <div className="create-todo-card">
          <div className="todo-text">
            <input
              type="text"
              name="text"
              id=""
              value={inputData.text}
              onChange={handleChange}
            />
          </div>
          <div className="todo-submit-button">
            <input type="submit" value="Add" className="submit-button" />
          </div>
        </div>
      </form>
    </>
  );
}

export default CreateTodo;
