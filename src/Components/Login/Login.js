import React from "react";
import { Link, useHistory } from "react-router-dom";
import Logo from "../../olx-logo.png";
import "./Login.css";
import { useState, useContext } from "react";
import { FirebaseContext } from "../../store/Context";
import OlxLogo from "../../assets/OlxLogo";

function Login() {
  const [email, setemail] = useState("");
  const [error, seterror] = useState("");
  const [success, setsuccess] = useState("");
  const [loading, setloading] = useState(false);
  const [password, setpassword] = useState("");
  const history = useHistory();
  const { firebase } = useContext(FirebaseContext);
  const Login = (e) => {
    e.preventDefault();
    setloading(true)
    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then((res) => {
        setloading(false)
       setsuccess("success")
       setTimeout(() => {
         history.push("/")
       }, 800);
      })
      .catch((err) => {
        setloading(false)
        seterror(err.message)
      });
  };
  return (
    <div>
      <nav class="navbar navbar-light bg-light">
        <div className="brandName ml-2" onClick={() => history.push("/")}>
          <OlxLogo></OlxLogo>
        </div>
      </nav>
      <div className="loginParentDiv">
        <img width="100px" height="100px" src={Logo}></img>
        <form onSubmit={Login}>
          <label htmlFor="fname">Email</label>
          <br />
          <input
            className="input"
            type="email"
            value={email}
            onChange={(e) => setemail(e.target.value)}
            id="fname"
            name="email"
            placeholder="John"
            required
          />
          <br />
          <label htmlFor="lname">Password</label>
          <br />
          <input
            className="input"
            type="password"
            value={password}
            onChange={(e) => setpassword(e.target.value)}
            id="lname"
            name="password"
            placeholder="Doe"
            required
            minLength='6'
          />
          <br />
          <br />
         {error?
           <div class="alert alert-danger w-100" role="alert">
           {error}
          </div>:<span></span>
        } 
          {success?
           <div class="alert alert-success w-100" role="alert">
           {success}
          </div>:<span></span>
        }    
         {loading? <button disabled>Logging in</button>:<button>Login</button>}
        </form>
        <Link to="/signup">Signup</Link>
      </div>
    </div>
  );
}

export default Login;
