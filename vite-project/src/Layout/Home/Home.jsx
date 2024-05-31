import { Link } from "react-router-dom";
function HomePage() {
  return (
    <>
      <h1>Home Page</h1>
      <Link to="/users/signup">Signup</Link>
      <br />
      <Link to="users/login">Login</Link>
      <br />
      {/* <Link to="users/verify_email/123">Verify</Link>
      <br/> */}
      <Link to="users/forget_password/">Forget Password</Link>
      <br/>
      <Link to="users/change_password/">Change Password</Link>
    </>
  );
}
export default HomePage;
