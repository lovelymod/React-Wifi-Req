import "../style/Register.css";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { useForm } from "react-hook-form";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import VisibilityIcon from "@mui/icons-material/Visibility";
import {
  TextField,
  Button,
  Box,
  AppBar,
  Typography,
  Toolbar,
  InputAdornment,
  IconButton,
} from "@mui/material";
import { yupResolver } from "@hookform/resolvers/yup";
import { registerSchema } from "../utils/schema";

const Register = () => {
  const [infomation, setInfomation] = useState({
    username: "",
    password: "",
    confPassword: "",
  });
  const [hidePwd, setHidePwd] = useState(true);
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(registerSchema),
    defaultValues: {
      regUsername: "",
      regPassword: "",
      regConfPassword: "",
    },
  });

  const OnSubmit = async () => {
    try {
      await axios
        .post("http://localhost:5000/usersadmin", {
          username: infomation.username,
          password: infomation.password,
          confPassword: infomation.confPassword,
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
            navigate("/");
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
    <div className="App-regis">
      <Box mb={1}>
        <AppBar position="static">
          <Toolbar>
            <img src="img/LS-02.png" alt="logo" width="50px" height="50px" />
            <Typography
              variant="h5"
              component="div"
              sx={{ flexGrow: 1, marginLeft: "10px" }}
            >
              Register
            </Typography>
          </Toolbar>
        </AppBar>
      </Box>
      <div className="bg-regis">
        <Box className="container-regis" sx={{ boxShadow: 5 }}>
          <form
            onSubmit={handleSubmit(OnSubmit)}
            style={{ width: "300px" }}
            noValidate
            autoComplete="off"
          >
            <img src="img/LS-01.png" alt="logo" width="150px" height="150px" />
            <TextField
              variant="standard"
              label="Enter Username"
              {...register("regUsername", {
                onChange: (e) =>
                  setInfomation({ ...infomation, username: e.target.value }),
              })}
              error={!!errors?.regUsername}
              helperText={errors?.regUsername?.message}
              required
              fullWidth
              autoFocus
              sx={{ marginTop: "10px" }}
            />

            <TextField
              variant="standard"
              label="Enter Password"
              type={hidePwd ? "password" : "text"}
              {...register("regPassword", {
                onChange: (e) =>
                  setInfomation({ ...infomation, password: e.target.value }),
              })}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton onClick={() => setHidePwd(!hidePwd)}>
                      {hidePwd ? <VisibilityOffIcon /> : <VisibilityIcon />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
              error={!!errors?.regPassword}
              helperText={errors?.regPassword?.message}
              required
              fullWidth
              sx={{ marginTop: "10px" }}
            />

            <TextField
              variant="standard"
              label="Enter Confirm Password"
              type={hidePwd ? "password" : "text"}
              {...register("regConfPassword", {
                onChange: (e) =>
                  setInfomation({
                    ...infomation,
                    confPassword: e.target.value,
                  }),
              })}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton onClick={() => setHidePwd(!hidePwd)}>
                      {hidePwd ? <VisibilityOffIcon /> : <VisibilityIcon />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
              error={!!errors?.regConfPassword}
              helperText={errors?.regConfPassword?.message}
              required
              fullWidth
              sx={{ marginTop: "10px" }}
            />
            <Button
              type="submit"
              variant="contained"
              size="large"
              fullWidth
              sx={{ marginTop: "10px" }}
            >
              register
            </Button>
            <Button
              type="button"
              onClick={() => navigate("/")}
              variant="outlined"
              size="large"
              fullWidth
              sx={{ marginTop: "10px" }}
            >
              back
            </Button>
          </form>
        </Box>
      </div>
    </div>
  );
};

export default Register;
