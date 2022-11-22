import "./login.css";
import { useState, useEffect } from "react";
import Axios from "axios";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { motion } from "framer-motion";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const checkLogin = () => {
    const auth = localStorage.getItem("auth");
    if (auth === "adminLogin") {
      navigate("/table");
    }
  };

  const login = () => {
    Axios.post("http://localhost:3002/login", {
      Username: username,
      Password: password,
    }).then((response) => {
      if (response.data.msg === "Matched") {
        localStorage.setItem("auth", "adminLogin");
        Swal.fire({
          icon: "success",
          title: "LOGGED IN",
          showConfirmButton: false,
          timer: 1200,
          timerProgressBar: true,
        });
        setTimeout(function () {
          navigate("/table");
        }, 1500);
      } else if (response.data.msg === "not Matched"){
        Swal.fire({
          icon: "error",
          title: "Wrong Username or Password",
        });
      }
    });
  };

  // const login = () => {
  //   Axios.post("http://localhost:3001/login", {
  //     username: username,
  //     password: password,
  //   }).then((response) => {
  //     if (response.data.message === "Matched") {
  //       localStorage.setItem("auth", "adminLogin");
  //       Swal.fire({
  //         icon: "success",
  //         title: "LOGGED IN",
  //         showConfirmButton: false,
  //         timer: 1200,
  //         timerProgressBar: true,
  //       });
  //       setTimeout(function () {
  //         navigate("/table");
  //       }, 1500);
  //     } else {
  //       Swal.fire({
  //         icon: "error",
  //         title: "Wrong Username or Password",
  //       });
  //     }
  //   });
  // };

  useEffect(() => {
    checkLogin();
  }, []);
  return (
    <motion.div
      className="App2"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ delay: 0.1 }}

    >
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
              onClick={() => {
                login();
              }}
            />
          </form>
        </div>
      </div>
    </motion.div>
  );
}

export default Login;
