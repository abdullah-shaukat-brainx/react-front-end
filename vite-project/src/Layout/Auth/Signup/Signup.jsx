import "./Signup.css";
import { useState } from "react";
import { signup } from "../../../Services/authServices";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  isValidEmailFormat,
  isValidPasswordFormat,
} from "../../../Services/utilServices";
import { Link } from "react-router-dom";


function SignUpForm() {
  const data = { email: "", password: "", confirmPassword: "" };
  const [inputData, setInputData] = useState(data);

  function handleChange(e) {
    setInputData({ ...inputData, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    if (!inputData.email || !inputData.password || !inputData.confirmPassword) {
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
    if (inputData.password !== inputData.confirmPassword) {
      alert("Password not matching with confirm password");
      return;
    }

    signup(inputData.email, inputData.password, inputData.confirmPassword)
      .then((data) => {
        toast.success("User sign up successful, check email for verification link.");
      })
      .catch((error) => {
        console.log(error)
        toast.error(error?.response?.data?.error)
      });
  }

  return (
    <div className="container">
      <div className="content">
      <ToastContainer />
        <div className="heading">Sign Up</div>
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
            <label htmlFor="password">
              <strong>Password</strong>
            </label>
            <input
              type="password"
              name="password"
              value={inputData.password}
              onChange={handleChange}
              className="form-input"
              placeholder="Enter Password"
              required
            />
          </div>
          <div className="form-entry">
            <label htmlFor="confirmPassword">
              <strong>Confirm Password</strong>
            </label>
            <input
              type="password"
              name="confirmPassword"
              value={inputData.confirmPassword}
              onChange={handleChange}
              className="form-input"
              placeholder="Confirm Password"
              required
            />
          </div>
          <div className="form-entry">
            <input type="submit" value="Submit" className="submit-button" />
          </div>
        </form>
        <div className="login-link">
        <Link to="/users/login">Already Signed up? Click here to Log in!</Link>
        </div>
      </div>
    </div>
  );
}

export default SignUpForm;
