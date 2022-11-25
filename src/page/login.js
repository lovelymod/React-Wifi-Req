import "./login.css";
import { useState, useEffect } from "react";
import Axios from "axios";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { motion } from "framer-motion";
import { useForm } from "react-hook-form";

function Login() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const checkLogin = () => {
    const auth = localStorage.getItem("auth");
    if (auth === "adminLogin") {
      navigate("/table");
    }
  };

  const OnSubmit = () => {
    login();
  };

  const login = () => {
    Axios.post("http://localhost:3002/login", {
      Username: username,
      Password: password,
    }).then(async (response) => {
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
      } else if (response.data.msg === "not Matched") {
        Swal.fire({
          icon: "error",
          title: "Wrong Username or Password",
          showConfirmButton: false,
          timer: 1200,
          timerProgressBar: true,
        });
      }
    });
  };

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
          <form onSubmit={handleSubmit(OnSubmit)}>
            <div className="row-contain-login2">
              <input
                type="text"
                className="form-control input2"
                id="username"
                placeholder="Username"
                {...register("username", {
                  onChange: (e) => setUsername(e.target.value),
                  required: true,
                })}
              />
              {errors.username && (
                <p className="fill-message">Please fill this form</p>
              )}
            </div>
            <div className="row-contain-login2">
              <input
                type="password"
                className="form-control input2"
                id="password"
                placeholder="Password"
                {...register("password", {
                  onChange: (e) => setPassword(e.target.value),
                  required: true,
                })}
              />
              {errors.password && (
                <p className="fill-message">Please fill this form</p>
              )}
            </div>
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="btn loginbutt2"
            >
              Login
            </motion.button>

            {/* <input
              type="button"
              className="btn loginbutt2"
              value="Login"
              onClick={() => {
              }}
            /> */}
          </form>
        </div>
      </div>
    </motion.div>
  );
}

export default Login;
