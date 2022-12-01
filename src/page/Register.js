import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./Register.css";
import Swal from "sweetalert2";
import { useForm } from "react-hook-form";
import { motion } from "framer-motion";

const Register = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [Username, setUsername] = useState("");
  const [Password, setPassword] = useState("");
  const [confPassword, setConfPassword] = useState("");

  const navigate = useNavigate();

  const OnSubmit = () => {
    Register();
  };

  const Back = () => {
    navigate("/login");
  };

  const Register = async () => {
    try {
      await axios
        .post("http://localhost:5000/usersadmin", {
          Username: Username,
          Password: Password,
          confPassword: confPassword,
        })
        .then((response) => {
          console.log(response.data.msg);
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
          timer: 1200,
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
              {errors.Username && (
                <p className="fill-message2">Please fill this form</p>
              )}
            </div>
          </div>
          <div className="field">
            <div className="controls">
              <input
                type="Password"
                className="form-control inputreg"
                placeholder="Password"
                value={Password}
                {...register("Password", {
                  onChange: (e) => setPassword(e.target.value),
                  required: true,
                })}
              />
              {errors.Password && (
                <p className="fill-message2">Please fill this form</p>
              )}
            </div>
          </div>
          <div className="field">
            <div className="controls">
              <input
                type="Password"
                className="form-control inputreg"
                placeholder="Confirm Password"
                value={confPassword}
                {...register("ConfirmPassword", {
                  onChange: (e) => setConfPassword(e.target.value),
                  required: true,
                })}
              />
              {errors.ConfirmPassword && (
                <p className="fill-message2">Please fill this form</p>
              )}
            </div>
          </div>
          <div className="field">
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
