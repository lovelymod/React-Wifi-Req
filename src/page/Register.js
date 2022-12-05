import "../style/Register.css";
import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { useForm } from "react-hook-form";
import { motion } from "framer-motion";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import VisibilityIcon from "@mui/icons-material/Visibility";

const Register = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [Username, setUsername] = useState("");
  const [Password, setPassword] = useState("");
  const [confPassword, setConfPassword] = useState("");
  const [hidePwd, setHidePwd] = useState("password");
  const [hideconfPwd, setHideconfPwd] = useState("password");

  const showPwd = () => {
    if (hidePwd === "password") {
      setHidePwd("text");
    } else {
      setHidePwd("password");
    }
  };

  const showconfPwd = () => {
    if (hideconfPwd === "password") {
      setHideconfPwd("text");
    } else {
      setHideconfPwd("password");
    }
  };

  const navigate = useNavigate();
  const Back = () => navigate("/login");
  const OnSubmit = () => Register();
  
  const Register = async () => {
    try {
      await axios
        .post("http://localhost:5000/usersadmin", {
          Username: Username,
          Password: Password,
          confPassword: confPassword,
        })
        .then((response) => {
          Swal.fire({
            icon: "success",
            title: `${response.data.msg}`,
            showConfirmButton: false,
            timer: 1200,
            timerProgressBar: true,
          });
          setTimeout(() => {
            navigate("/login");
          }, 1500);
        });
    } catch (error) {
      if (error.response) {
        Swal.fire({
          icon: "error",
          title: `${error.response.data.msg}`,
          showConfirmButton: false,
          timer: 2000,
          timerProgressBar: true,
        });
      }
    }
  };

  return (
    <motion.div
      className="App-regis"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ delay: 0.1 }}
    >
      <div className="container-regis">
        <form onSubmit={handleSubmit(OnSubmit)} className="box-regis">
          <img className="logo-regis" src="img/LS-01.png" alt="" srcSet="" />
          <div className="field">
            <div className="controls">
              <input
                type="text"
                className="form-control inputreg"
                placeholder="Username"
                value={Username}
                {...register("Username", {
                  onChange: (e) => setUsername(e.target.value),
                  required: true,
                })}
              />
            </div>
            {errors.Username && (
              <p className="fill-message2">Please fill this form</p>
            )}
          </div>
          <div className="field">
            <div className="controls-pwd">
              <input
                type={hidePwd}
                className="inputreg-pwd"
                placeholder="Password"
                value={Password}
                {...register("Password", {
                  onChange: (e) => setPassword(e.target.value),
                  required: true,
                })}
              />
              {hidePwd === "password" ? (
                <VisibilityOffIcon
                  className="eyeVisit"
                  onClick={() => showPwd()}
                />
              ) : (
                <VisibilityIcon
                  className="eyeVisit"
                  onClick={() => showPwd()}
                />
              )}
            </div>
            {errors.Password && (
              <p className="fill-message2">Please fill this form</p>
            )}
          </div>
          <div className="field">
            <div className="controls-pwd">
              <input
                type={hideconfPwd}
                className="inputreg-pwd"
                placeholder="Confirm Password"
                value={confPassword}
                {...register("ConfirmPassword", {
                  onChange: (e) => setConfPassword(e.target.value),
                  required: true,
                })}
              />
              {hideconfPwd === "password" ? (
                <VisibilityOffIcon
                  className="eyeVisit"
                  onClick={() => showconfPwd()}
                />
              ) : (
                <VisibilityIcon
                  className="eyeVisit"
                  onClick={() => showconfPwd()}
                />
              )}
            </div>
            {errors.ConfirmPassword && (
              <p className="fill-message2">Please fill this form</p>
            )}
          </div>
          <div className="field-button">
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="btn loginbutt-regis"
            >
              Register
            </motion.button>
            <motion.input
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              type="button"
              value="Back"
              className="btn loginbutt-regis"
              onClick={() => {
                Back();
              }}
            />
          </div>
        </form>
      </div>
    </motion.div>
  );
};

export default Register;
