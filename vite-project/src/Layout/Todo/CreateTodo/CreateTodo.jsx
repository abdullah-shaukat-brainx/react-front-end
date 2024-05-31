import { ToastContainer, toast } from "react-toastify";
import { addTodo } from "../../../Services/todoServices";
import { useState } from "react";
import "./CreateTodo.css";

function CreateTodo({ updateRefresh }) {
  const initialData = { text: "", status: "Pending" };
  const [inputData, setInputData] = useState(initialData);

  function handleChange(e) {
    setInputData({ ...inputData, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    if (!inputData.text) {
      alert("Can't accept empty text field!!!");
      return;
    }
    const response = await addTodo(inputData.text, inputData.status)
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
      {/* <ToastContainer /> */}
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
