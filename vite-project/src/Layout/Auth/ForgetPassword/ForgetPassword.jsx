import "./ForgetPassword.css";
import { useState } from "react";
import { forgetPassword } from "../../../Services/authServices";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { isValidEmailFormat } from "../../../Services/utilServices";
import { Link } from "react-router-dom";

function ForgetPassword() {
  const initialData = { email: "" }; //it should be state
  const [inputData, setInputData] = useState(initialData);

  function handleChange(e) {
    setInputData({ ...inputData, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    if (!inputData.email) {
      alert("Can't accept empty field!!!");
      return;
    }
    if (!isValidEmailFormat(inputData.email)) {
      alert("Wrong email format");
      return;
    }

    forgetPassword(inputData.email)
      .then((data) => {
        toast.success(data?.message);
        setInputData(initialData)
      })
      .catch((error) => {
        console.log(error);
        toast.error(error?.response?.data?.error || "Something went Wrong.");
      });
  }

  return (
    <div className="container">
      <div className="content">
        <ToastContainer />
        <div className="heading">Forget Password</div>
        <form className="form" onSubmit={handleSubmit}>
          <div className="form-entry">
            <label htmlFor="email">
              <strong>Email</strong>
            </label>
            <input
              type="email"
              name="email"
              value={inputData.email}
              onChange={handleChange}
              className="form-input"
              placeholder="Enter Email"
              required
            />
          </div>
          <div className="form-entry">
            <input type="submit" value="Submit" className="submit-button" />
          </div>
        </form>
        <div className="login-link">
          <Link to="/users/login">Click here to Log In</Link>
        </div>
      </div>
    </div>
  );
}

export default ForgetPassword;
