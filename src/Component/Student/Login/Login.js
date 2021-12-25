import React from "react";
import { loginAdmin } from "../../../Firebase/Firebase";
import { useNavigate } from "react-router-dom";

class Login extends React.Component {
  state = {
    email: "",
    password: "",
  };

  changeHandler = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  login = async () => {
    const { email, password } = this.state;
    if ((email.trim() === "", password.trim() === "")) {
      alert("All Fields are required");
      return;
    }

    try {
      const response = await loginAdmin(email, password);
      if (response) {
        window.location.replace("/dash");
      }
    } catch (error) {
      alert(error.message);
    }
  };

  render() {
    return (
      <div className="loginContainer">
        <div className="frame">
          <div className="loginnav">
            <ul className="links">
              <li className="signin-active">
                <a href="/" className="btn">
                  Sign in
                </a>
              </li>
            </ul>
          </div>
          <div>
            <div className="form-signin">
              <label for="username">Email</label>
              <input
                className="form-styling"
                type="email"
                name="email"
                placeholder=""
                onChange={this.changeHandler}
              />
              <label for="password">Password</label>
              <input
                className="form-styling"
                type="password"
                name="password"
                onChange={this.changeHandler}
                placeholder=""
              />

              <div className="btn-animate">
                <button onClick={this.login} className="btn-signin">
                  Sign in
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

function WithNavigate(props) {
  let navigate = useNavigate();
  return <Login {...props} navigate={navigate} />;
}

export default WithNavigate;
