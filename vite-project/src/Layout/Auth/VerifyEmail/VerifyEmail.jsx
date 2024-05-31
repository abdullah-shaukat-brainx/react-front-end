import { Link, useParams, useNavigate } from "react-router-dom";
import { verify } from "../../../Services/authServices";
import { ToastContainer, toast } from "react-toastify";
import { useEffect, useState, useRef } from "react";

function VerifyEmail() {
  const [progress, setProgress] = useState(false);
  const params = useParams();
  const navigate = useNavigate();
  const hasVerified = useRef(false); // Using useRef to keep track if verification has been done

  const verifyAndNavigate = async () => {
    setProgress(true);

    try {
      await verify(params.token);
      toast.success("Successfully Verified.");
    } catch (error) {
      toast.error(
        `${error?.response?.data?.error}.` || "Unable to verify Email"
      );
    } finally {
      setProgress(false);
      setTimeout(() => {
        navigate("/users/login");
      }, 5000);
    }
  };

  useEffect(() => {
    if (!hasVerified.current) {
      hasVerified.current = true; // Set the flag to true after first run
      verifyAndNavigate();
    }
  }, []); // Empty dependency array ensures this runs only once on mount

  return (
    <>
      <ToastContainer />
      <h1>Verify User Page</h1>
      {!progress && (
        <h2>Verification under progress, wait for a few seconds...</h2>
      )}
    </>
  );
}

export default VerifyEmail;
