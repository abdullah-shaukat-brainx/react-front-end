import "../Styles/Login.css";
import { useState } from "react";

function LogInForm() {
  const data = { email: "", password: "", confirmPassword: "" };
  const [inputData, setInputData] = useState(data);

  function handleChange(e) {
    setInputData({ ...inputData, [e.target.name]: e.target.value });
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (!inputData.email || !inputData.password)
      alert("Can't accept empty field!!!");
    else {
      // Proceed with form submission
      console.log("Form submitted", inputData);
    }
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
      </div>
    </div>
  );
}

export default LogInForm;
