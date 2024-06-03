import "./Login.css";
import { useEffect, useState } from "react";
import { login } from "../../../Services/authServices";
import { ToastContainer, toast } from "react-toastify";
import {
  isValidEmailFormat,
  isValidPasswordFormat,
} from "../../../Services/utilServices";
import { Link, useNavigate } from "react-router-dom";

function LogInForm() {
  useEffect(() => {
    if (localStorage.getItem("access_token")) {
      navigate("todos/todo_home");
    }
  });

  const navigate = useNavigate();

  const [inputData, setInputData] = useState({ email: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);
  function handleChange(e) {
    setInputData({ ...inputData, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    if (!inputData.email || !inputData.password) {
      toast.error("Can't accept empty field!!!");
      return;
    }
    if (
      !isValidEmailFormat(inputData.email) ||
      !isValidPasswordFormat(inputData.password)
    ) {
      toast.error("Wrong email or password format");
      return;
    }

    login(inputData.email, inputData.password)
      .then((data) => {
        localStorage.setItem("access_token", data?.access_token);
        localStorage.setItem("user_details", JSON.stringify(data?.data?.User));

        toast.success("Login successful, redirecting to your Todos Page.");
        setInputData({ email: "", password: "" });
        navigate("/todos/todo_home");
      })
      .catch((error) => {
        console.log(error);
        toast.error(`${error?.response?.data?.error}` || `Failed to Log in.`);
      });
  }

  return (
    <div className="container">
      <div className="content">
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
              type={showPassword ? "text" : "password"}
              name="password"
              required
              value={inputData.password}
              onChange={handleChange}
              className="form-input"
              placeholder="Enter Password"
            />
            <div className="show-password">
              Show Password:{" "}
              <input
                id="check"
                type="checkbox"
                value={showPassword}
                onChange={() => setShowPassword((prev) => !prev)}
              />
            </div>
          </div>
          <div className="forget-password-link">
            <Link to="/users/forget_password">Forgot your password?</Link>
          </div>
          <div className="form-entry">
            <input type="submit" value="Submit" className="submit-button" />
          </div>
        </form>
        <div className="signup-link">
          <Link to="/users/signup">
            Not Signed Up yet? Click here to Sign Up!
          </Link>
        </div>
      </div>
    </div>
  );
}

export default LogInForm;
