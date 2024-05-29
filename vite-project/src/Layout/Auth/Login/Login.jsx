import "./Login.css";
import { useState } from "react";
import { login } from "../../../Services/authServices";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  isValidEmailFormat,
  isValidPasswordFormat,
} from "../../../Services/utilServices";
import { Link } from "react-router-dom";
function LogInForm() {
  const data = { email: "", password: "" };
  const [inputData, setInputData] = useState(data);
  function handleChange(e) {
    setInputData({ ...inputData, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    if (!inputData.email || !inputData.password) {
      alert("Can't accept empty field!!!");
      return;
    }
    if (
      !isValidEmailFormat(inputData.email) ||
      !isValidPasswordFormat(inputData.password)
    ) {
      alert("Wrong email or password format");
      return;
    }

    login(inputData.email, inputData.password)
      .then((data) => {
        toast.success("User login successful.");
      })
      .catch((error) => {
        console.log(error);
        toast.error(error?.response?.data?.error);
      });
  }

  return (
    <div className="container">
      <div className="content">
        <ToastContainer />
        <div className="heading">Log In</div>
        <form className="form" onSubmit={handleSubmit}>
          <div className="form-entry">
            <label htmlFor="email">
              <strong>Email</strong>
            </label>
            <input
              type="email"
              name="email"
              required
              value={inputData.email}
              onChange={handleChange}
              className="form-input"
              placeholder="Enter Email"
            />
          </div>
          <div className="form-entry">
            <label htmlFor="password">
              <strong>Password</strong>
            </label>
            <input
              type="password"
              name="password"
              required
              value={inputData.password}
              onChange={handleChange}
              className="form-input"
              placeholder="Enter Password"
            />
          </div>
          <div className="form-entry">
            <input type="submit" value="Submit" className="submit-button" />
          </div>
        </form>
        <div className="signup-link">
          <Link to="/users/signup">
            Not Signed Up yet? Click here to Sign In!
          </Link>
        </div>
      </div>
    </div>
  );
}

export default LogInForm;
