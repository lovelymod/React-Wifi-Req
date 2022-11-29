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

  const OnSubmit = () => {
    authLogin();
  };

  const authLogin = async () => {
    try {
      await Axios.post("http://localhost:3002/login", {
        Username: username,
        Password: password,
      });
      Swal.fire({
        icon: "success",
        title: "LOGGED IN",
        showConfirmButton: false,
        timer: 1200,
        timerProgressBar: true,
      });
      localStorage.setItem("auth", "loggedIn");
      setTimeout(function () {
        navigate("/table");
      }, 1500);
    } catch (error) {
      if (
        error.response.data.msg === "not Matched" ||
        error.response.data.msg === "Username not found"
      ) {
        Swal.fire({
          icon: "error",
          title: "Wrong Username or Password",
          showConfirmButton: false,
          timer: 1200,
          timerProgressBar: true,
        });
      }
    }
  };

  const checkLogin = () => {
    const chk = localStorage.getItem("auth");
    if (chk === "loggedIn") {
      navigate("/table");
    }
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
          </form>
        </div>
      </div>
    </motion.div>
  );
}

export default Login;
