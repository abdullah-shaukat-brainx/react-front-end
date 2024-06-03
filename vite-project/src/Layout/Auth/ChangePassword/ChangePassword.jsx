import "./ChangePassword.css";
import { useState } from "react";
import { changePassword } from "../../../Services/authServices";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { isValidPasswordFormat } from "../../../Services/utilServices";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

function ChangePassword() {
  const navigate = useNavigate();
  const [inputData, setInputData] = useState({
    oldPassword: "",
    newPassword: "",
    confirmNewPassword: "",
  });

  function handleChange(e) {
    setInputData({ ...inputData, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    if (
      (!inputData.oldPassword || !inputData.newPassword,
      !inputData.confirmNewPassword)
    ) {
      alert("Can't accept empty field!!!");
      return;
    }
    if (
      !isValidPasswordFormat(inputData.oldPassword) ||
      !isValidPasswordFormat(inputData.newPassword)
    ) {
      alert("Wrong password format");
      return;
    }
    if (inputData.newPassword !== inputData.confirmNewPassword) {
      alert("New password not matching with confirm new password");
      return;
    }

    changePassword(
      
      inputData.oldPassword,
      inputData.newPassword,
      inputData.confirmNewPassword
    )
      .then((data) => {
        toast.success("Password successfully changed!.");
        localStorage.clear();
        navigate("/users/login");
      })
      .catch((error) => {
        console.log(error);
        toast.error(error?.response?.data?.error);
      });
  }

  return (
    <div className="container">
      <div className="content">
        <div className="heading">Change Password</div>
        <form className="form" onSubmit={handleSubmit}>
          <div className="form-entry">
            <label htmlFor="oldPassword">
              <strong>Old Password</strong>
            </label>
            <input
              type="password"
              name="oldPassword"
              value={inputData.oldPassword}
              onChange={handleChange}
              className="form-input"
              placeholder="Enter Old Password"
              required
            />
          </div>
          <div className="form-entry">
            <label htmlFor="newPassword">
              <strong>Enter New Password</strong>
            </label>
            <input
              type="password"
              name="newPassword"
              value={inputData.newPassword}
              onChange={handleChange}
              className="form-input"
              placeholder="New Password"
              required
            />
          </div>
          <div className="form-entry">
            <label htmlFor="confirmNewPassword">
              <strong>Confirm New Password</strong>
            </label>
            <input
              type="password"
              name="confirmNewPassword"
              value={inputData.confirmNewPassword}
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
          <Link to="/users/login">Click here to Log in!</Link>
        </div>
      </div>
    </div>
  );
}

export default ChangePassword;
