import React from "react";
import ReactDOM from "react-dom/client";
import SignUpForm from "../src/Layout/Auth/Signup/Signup";
import LogInForm from "./Layout/Auth/Login/Login";
import HomePage from "./Layout/Home/Home";
import VerifyEmail from "./Layout/Auth/VerifyEmail/VerifyEmail";
import TodoHome from "./Layout/Todo/TodoHome/TodoHome";
import ForgetPassword from "./Layout/Auth/ForgetPassword/ForgetPassword";
import ResetPassword from "./Layout/Auth/ResetPassword/ResetPassword";
import ChangePassword from "./Layout/Auth/ChangePassword/ChangePassword";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { Navigate } from "react-router-dom";
import { isAuthenticated } from "./Utils";
import "react-toastify/dist/ReactToastify.css";

const PrivateRoute = ({ children }) => {
  return isAuthenticated() ? children : <Navigate to="/users/login" />;
};

const router = createBrowserRouter([
  // User Routes
  {
    path: "/users/signup",
    element: <SignUpForm />,
  },
  {
    path: "/users/login",
    element: <LogInForm />,
  },
  {
    path: "/users/verify_email/:token",
    element: <VerifyEmail />,
  },
  {
    path: "/users/reset_password/:token",
    element: <ResetPassword />,
  },
  {
    path: "/users/forget_password",
    element: <ForgetPassword />,
  },
  {
    // Default
    path: "*",
    element: <LogInForm />,
  },
  {
    path: "/",
    element: <HomePage />,
  },
  // Protected Routes
  {
    path: "/users/change_password/",
    element: (
      <PrivateRoute>
        <ChangePassword />
      </PrivateRoute>
    ),
  },
  {
    path: "/todos/todo_home/",
    element: (
      <PrivateRoute>
        <TodoHome />
      </PrivateRoute>
    ),
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ToastContainer />
    <RouterProvider router={router} />
  </React.StrictMode>
);
