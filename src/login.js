import "./login.css";
import { useState } from "react";
import Axios from "axios";
import { useNavigate } from "react-router-dom";
import Swal from 'sweetalert2'

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();


  const login = () => {
    Axios.post("http://localhost:3001/login", {
      username: username,
      password: password,
    }).then((response) => {
      if (response.data.message === "Matched") {
        Swal.fire({
          icon: 'success',
          title: 'LOGGED IN',
          showConfirmButton: false,  
          timer: 1200,
          timerProgressBar: true,
        })
        setTimeout(function() {
          navigate("/table");
        }, 1500);
        
      } else {
        Swal.fire({
          icon: 'error',
          title: 'Wrong Username or Password', 
        })
      }
    });
  };
  return (
    <div className="App2">
      <div className="bg2">
        <div className="images2">
          <img className="logo2" src="img/LS-02.png" alt="" srcSet="" />
        </div>
        <div className="container2">
          <form>
            <div className="row-contain-login2">
              <input
                type="text"
                className="form-control input2"
                id="username"
                placeholder="Username"
                onChange={(e) => {
                  setUsername(e.target.value);
                }}
              />
            </div>
            <div className="row-contain-login2">
              <input
                type="password"
                className="form-control input2"
                id="password"
                placeholder="Password"
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
              />
            </div>

            <input
              type=""
              className="btn loginbutt2"
              value="Login"
              onClick={login}
            />
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;
