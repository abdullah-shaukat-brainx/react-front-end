import "../Styles/Signup.css";

function SignUpForm() {
  return (
    <div className="container">
      <div className="content">
        <div className="heading">Sign Up</div>
        <div className="form">
          <form action="/" method="post">
            <div className="form-entry">
              <label htmlFor="email">
                <strong>Email</strong>
              </label>
              <input
                type="email"
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
                className="form-input"
                placeholder="Enter Password"
              />
            </div>
            <div className="form-entry">
              <label htmlFor="password">
                <strong>Confirm Password</strong>
              </label>
              <input
                type="password"
                className="form-input"
                placeholder="Confirm Password"
              />
            </div>
            <div className="form-entry">
              <input type="button" value="submit" className="submit-button"/>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
export default SignUpForm;
