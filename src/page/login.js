import "../style/login.css";
import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { loginSchema } from "../components/schema";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import VisibilityIcon from "@mui/icons-material/Visibility";
import Cookies from "js-cookie";
import { TextField, Button, Box, AppBar, Typography, Toolbar, InputAdornment, IconButton } from "@mui/material";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [hidePwd, setHidePwd] = useState(true);
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(loginSchema),
    defaultValues: {
      Username: "",
      Password: "",
    },
  });

  const OnSubmit = async () => {
    try {
      await axios
        .post("http://localhost:5000/login", {
          Username: username,
          Password: password,
        })
        .then((response) => {
          Cookies.set("refreshToken", response.data.refreshToken, { expires: 1 });
        });
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
    } catch (error) {
      if (error.response.data.msg === "not Matched" || error.response.data.msg === "Username not found") {
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

  const checkLogin = async () => {
    try {
      const refreshToken = Cookies.get("refreshToken");
      await axios.get("http://localhost:5000/token", {
        params: { refreshToken: refreshToken },
      });
      navigate("/table");
    } catch (error) {
      // console.log(error);
    }
  };
  useEffect(() => {
    checkLogin();
  });
  return (
    <div className="App2">
      <Box mb={1}>
        <AppBar position="static">
          <Toolbar>
            <img src="img/LS-02.png" alt="logo" width="50" height="50" />
            <Typography variant="h5" component="div" sx={{ flexGrow: 1, marginLeft: "10px" }}>
              Login
            </Typography>
          </Toolbar>
        </AppBar>
      </Box>
      <div className="bg2">
        <Box className="container2" sx={{ boxShadow: 5 }}>
          <img className="logo2" src="img/LS-01.png" alt="logo" width="150px" height="150px" />
          <form
            className="formlogin"
            style={{ width: "300px" }}
            onSubmit={handleSubmit(OnSubmit)}
            noValidate
            autoComplete="off"
          >
            <TextField
              variant="standard"
              label="Username"
              {...register("Username", {
                onChange: (e) => setUsername(e.target.value),
              })}
              error={!!errors?.Username}
              helperText={errors?.Username?.message}
              fullWidth
              required
              autoFocus
              sx={{ marginTop: "10px" }}
            />
            <TextField
              variant="standard"
              label="Password"
              type={hidePwd ? "password" : "text"}
              {...register("Password", {
                onChange: (e) => setPassword(e.target.value),
              })}
              error={!!errors?.Password}
              helperText={errors?.Password?.message}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton onClick={() => setHidePwd(!hidePwd)}>
                      {hidePwd ? <VisibilityOffIcon /> : <VisibilityIcon />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
              fullWidth
              required
              sx={{ marginTop: "10px" }}
            />
            <Button type="submit" variant="contained" size="large" fullWidth sx={{ marginTop: "10px" }}>
              login
            </Button>
            <Button
              type="button"
              variant="outlined"
              size="large"
              onClick={() => navigate("/register")}
              fullWidth
              sx={{ marginTop: "10px" }}
            >
              register
            </Button>
          </form>
        </Box>
      </div>
    </div>
  );
}

export default Login;
