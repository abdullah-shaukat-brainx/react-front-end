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
  const [inputData, setInputData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  function handleChange(e) {
    setInputData({ ...inputData, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    if (!inputData.email || !inputData.password || !inputData.confirmPassword) {
      toast.error("Can't accept empty field!!!");
      return;
    }
    if (!isValidEmailFormat(inputData.email)) {
      toast.error("Wrong email format");
      return;
    }

    if (!isValidPasswordFormat(inputData.password)) {
      toast.error("Wrong password format");
      return;
    }

    if (inputData.password !== inputData.confirmPassword) {
      toast.error("Password not matching with confirm password");
      return;
    }

    signup(inputData.email, inputData.password, inputData.confirmPassword)
      .then((data) => {
        toast.success(
          "User sign up successful, check email for verification link."
        );
        setInputData({ email: "", password: "", confirmPassword: "" });
      })
      .catch((error) => {
        console.log(error);
        toast.error(error?.response?.data?.error);
      });
  }

  return (
    <div className="container">
      <div className="content">
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
              type={showPassword ? "text" : "password"}
              name="password"
              value={inputData.password}
              onChange={handleChange}
              className="form-input"
              placeholder="Enter Password"
              required
            />
          </div>
          <div className="show-password">
            Show Password:{" "}
            <input
              id="check"
              type="checkbox"
              value={showPassword}
              onChange={() => setShowPassword((prev) => !prev)}
            />
          </div>
          <div className="form-entry">
            <label htmlFor="confirmPassword">
              <strong>Confirm Password</strong>
            </label>
            <input
              type={showConfirmPassword ? "text" : "password"}
              name="confirmPassword"
              value={inputData.confirmPassword}
              onChange={handleChange}
              className="form-input"
              placeholder="Confirm Password"
              required
            />
          </div>
          <div className="show-password">
            Show Password:{" "}
            <input
              id="check"
              type="checkbox"
              value={showPassword}
              onChange={() => setShowConfirmPassword((prev) => !prev)}
            />
          </div>
          <div className="form-entry">
            <input type="submit" value="Submit" className="submit-button" />
          </div>
        </form>
        <div className="login-link">
          <Link to="/users/login">
            Already Signed up? Click here to Log in!
          </Link>
        </div>
      </div>
    </div>
  );
}

export default SignUpForm;
