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

const router = createBrowserRouter([
  //User Routes
  {
    path: "/",
    element: <HomePage />,
  },
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
    path: "/users/change_password/",
    element: <ChangePassword />,
  },
  {
    path: "/users/reset_password",
    element: <ResetPassword />,
  },
  {
    path: "/users/forget_password",
    element: <ForgetPassword />,
  },

  //Todo Route
  {
    path: "/todos/todo_home/",
    element: <TodoHome />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
