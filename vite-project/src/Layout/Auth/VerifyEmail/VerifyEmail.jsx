import { Link, useParams } from "react-router-dom";
import { verify } from "../../../Services/authServices";
import { ToastContainer, toast } from "react-toastify";
import { useState } from "react";

function VerifyEmail() {
  const [success, setSuccess] = useState(false);
  const params = useParams();

  function handleChange() {
    verify(params.token)
      .then((data) => {
        toast.success(`Successfully Verified.`);
        setSuccess(true);
      })
      .catch((error) => {
        toast.error(error?.response?.data?.error);
        setSuccess(false);
      });
  }
  return (
    <>
      <ToastContainer />
      <h1>Verify User Page</h1>
      <div className="verify-button">
        <input
          type="submit"
          value="Click me to verify"
          className="verify-button"
          onClick={handleChange}
        />
      </div>
      {success && <h2>User Verified. You may log in now!</h2>}
      <Link to="users/login">Login</Link>
    </>
  );
}
export default VerifyEmail;
