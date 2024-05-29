import { Link } from "react-router-dom";
function HomePage() {
  return (
    <>
      <h1>Home Page</h1>
      <Link to="/users/signup">Signup</Link>
      <br />
      <Link to="users/login">Login</Link>
      <br />
      <Link to="users/verify_email/123">Verify</Link>
    </>
  );
}
export default HomePage;
