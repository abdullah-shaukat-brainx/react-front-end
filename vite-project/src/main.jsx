import React from "react";
import ReactDOM from "react-dom/client";
import SignUpForm from "../src/Layout/Auth/Signup/Signup";
import LogInForm from "./Layout/Auth/Login/Login";
import HomePage from "./Layout/Home/Home"
import VerifyEmail from "./Layout/Auth/VerifyEmail/VerifyEmail";
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

const router = createBrowserRouter([
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
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
