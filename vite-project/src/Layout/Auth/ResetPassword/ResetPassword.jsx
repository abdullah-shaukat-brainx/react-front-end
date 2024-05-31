import "./ResetPassword.css";
import { useState } from "react";
import { resetPassword } from "../../../Services/authServices";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { isValidPasswordFormat } from "../../../Services/utilServices";
import { Link } from "react-router-dom";

function ResetPassword() {
  const initialData = { token: "", newPassword: "", confirmNewPassword: "" };
  const [inputData, setInputData] = useState(initialData);

  function handleChange(e) {
    setInputData({ ...inputData, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    if (
      !inputData.token ||
      !inputData.newPassword ||
      !inputData.confirmNewPassword
    ) {
      alert("Can't accept empty field!!!");
      return;
    }
    if (!isValidPasswordFormat(inputData.newPassword)) {
      alert("Wrong password format");
      return;
    }
    if (inputData.newPassword !== inputData.confirmNewPassword) {
      alert("Password not matching with confirm password");
      return;
    }

    resetPassword(
      inputData.token,
      inputData.newPassword,
      inputData.confirmNewPassword
    )
      .then((data) => {
        toast.success("Password Updated Sucessfully.");
        setInputData(initialData)
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
        <div className="heading">Reset Password</div>
        <form className="form" onSubmit={handleSubmit}>
          <div className="form-entry">
            <label htmlFor="token">
              <strong>Token</strong>
            </label>
            <input
              type="text"
              name="token"
              value={inputData.token}
              onChange={handleChange}
              className="form-input"
              placeholder="Paste Token Here"
              required
            />
          </div>
          <div className="form-entry">
            <label htmlFor="newPassword">
              <strong>New Password</strong>
            </label>
            <input
              type="password"
              name="newPassword"
              value={inputData.newPassword}
              onChange={handleChange}
              className="form-input"
              placeholder="Enter new Password"
              required
            />
          </div>
          <div className="form-entry">
            <label htmlFor="confirmNewPassword">
              <strong>Confirm Password</strong>
            </label>
            <input
              type="password"
              name="confirmNewPassword"
              value={inputData.confirmNewPassword}
              onChange={handleChange}
              className="form-input"
              placeholder="Confirm New Password"
              required
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

export default ResetPassword;
