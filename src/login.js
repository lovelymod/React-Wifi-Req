import "./login.css";
import { useState } from "react";
import Axios from "axios";
import { useNavigate } from "react-router-dom";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const [loginStat, setLoginstat] = useState("");

  const testdata = () => {
    console.log(loginStat);
  };

  const login = () => {
    Axios.post("http://localhost:3001/login", {
      username: username,
      password: password,
    }).then((response) => {
      console.log(response.data.message);
      console.log(response.data.result);
      if (response.data.message === "Matched") {
        setLoginstat("true");
        navigate("/table");
      } else {
        setLoginstat("false");
      }
    });
  };
  return (
    <div className="App2">
      <div className="bg2">
        <div className="images">
          <img className="logo" src="img/LS-02.png" alt="" srcSet="" />
        </div>
        <div className="container">
          <form>
            <div className="row-contain-login">
              <input
                type="text"
                className="form-control input"
                id="username"
                placeholder="Username"
                onChange={(e) => {
                  setUsername(e.target.value);
                }}
              />
            </div>
            <div className="row-contain-login">
              <input
                type="password"
                className="form-control input"
                id="password"
                placeholder="Password"
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
              />
            </div>

            {/* <button
              type="submit"
              className="btn regisbutt"
              onClick={() => login()}
            >
              Submit
            </button> */}

            <input
              type=""
              className="btn loginbutt"
              value="Submit"
              onClick={login}
            />

            <h1>{loginStat}</h1>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;
