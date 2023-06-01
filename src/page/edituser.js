import "../style/edituser.css";
import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Controller, useForm } from "react-hook-form";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import Swal from "sweetalert2";
import Cookies from "js-cookie";
import axios from "axios";
import { yupResolver } from "@hookform/resolvers/yup";
import { userSchema } from "../utils/schema";
import {
  AppBar,
  Box,
  Button,
  IconButton,
  MenuItem,
  Stack,
  TextField,
  Toolbar,
  Tooltip,
  Typography,
} from "@mui/material";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import LogoutRoundedIcon from "@mui/icons-material/LogoutRounded";

function EditUser() {
  const navigate = useNavigate();
  const location = useLocation();
  const rowData = location.state.rowData;
  const prevPath = location.state.pathName;
  const [information, setInformation] = useState({
    name: rowData.name,
    role: rowData.role,
    tel: rowData.tel.split("-").join(""),
    email: rowData.email,
    device_type:
      rowData.device_type === "mobile" ||
      rowData.device_type === "notebook" ||
      rowData.device_type === "tablet" ||
      rowData.device_type === "ipad"
        ? rowData.device_type
        : "etc",
    etc: rowData.device_type === "etc" ? rowData.device_type : "",
    device_brand: rowData.device_brand,
    device_name: rowData.device_name,
    start_date: rowData.start_date,
    end_date: rowData.end_date,
    remark: rowData.remark,
  });

  const {
    register,
    handleSubmit,
    control,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(userSchema),
    defaultValues: {
      name: information.name,
      role: information.role,
      tel: information.tel,
      email: information.email,
      device_type: information.device_type,
      etc: information.etc,
      device_brand: information.device_brand,
      device_name: information.device_name,
      start_date: information.start_date,
      end_date: information.end_date,
      remark: information.remark,
    },
  });

  const refreshToken = async () => {
    try {
      const refreshToken = Cookies.get("refreshToken");
      await axios.get("http://localhost:5000/token", {
        params: { refreshToken: refreshToken },
      });
    } catch (error) {
      if (error.response) {
        navigate("/login");
      }
    }
  };

  const Logout = async () => {
    try {
      const refreshToken = Cookies.get("refreshToken");
      await axios.delete("http://localhost:5000/logout", {
        params: { refreshToken: refreshToken },
      });
      Cookies.remove("refreshToken");
      navigate("/login");
    } catch (error) {
      console.log(error);
    }
  };

  const OnSubmit = async (id) => {
    const telFormat =
      information.tel.slice(0, 3) +
      "-" +
      information.tel.slice(3, 6) +
      "-" +
      information.tel.slice(6, 10);
    await axios
      .patch("http://localhost:5000/updateusers", {
        id: id,
        ...information,
        tel: telFormat,
        device_type:
          information.device_type === "etc"
            ? information.etc
            : information.device_type,
        end_date: information.role === "staff" ? "" : information.end_date,
      })
      .then((response) => {
        if (response.data.msg === "User Updated") {
          Swal.fire({
            icon: "success",
            title: "Editted",
            timer: 1200,
            timerProgressBar: true,
            showConfirmButton: false,
          });
          setTimeout(function () {
            navigate("/table");
          }, 1500);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const chgWidth = () => {
    if (window.innerWidth < 600) {
      return "column";
    } else {
      return "row";
    }
  };

  useEffect(() => {
    refreshToken();
  }, []);

  return (
    <div className="App6">
      <Box mb={5}>
        <AppBar position="static">
          <Toolbar>
            <Tooltip title="Back">
              <IconButton
                onClick={() => navigate(prevPath, { state: { rowData } })}
              >
                <ArrowBackIosIcon sx={{ color: "white", fontSize: "30px" }} />
              </IconButton>
            </Tooltip>
            <img src="img/LS-02.png" alt="logo" width="50" height="50" />
            <Typography
              variant="h5"
              component="div"
              sx={{ flexGrow: 1, marginLeft: "10px" }}
            >
              User Edit
            </Typography>
            <Tooltip title="Logout" arrow>
              <IconButton
                aria-label="logout"
                onClick={Logout}
                sx={{ color: "white" }}
              >
                <LogoutRoundedIcon sx={{ fontSize: "30px" }} />
              </IconButton>
            </Tooltip>
          </Toolbar>
        </AppBar>
      </Box>
      <div className="bg6">
        <Stack
          component="form"
          width="1000px"
          spacing={5}
          onSubmit={handleSubmit(() => OnSubmit(rowData.id))}
          noValidate
          autoComplete="off"
        >
          <Stack direction={chgWidth()} spacing={5} width="60%">
            <TextField
              variant="outlined"
              label="ชื่อ"
              value={information.name}
              {...register("name", {
                onChange: (e) =>
                  setInformation({ ...information, name: e.target.value }),
              })}
              error={!!errors?.name}
              helperText={errors?.name?.message}
              required
              fullWidth
            />
          </Stack>
          <Stack direction={chgWidth()} spacing={5} width="60%">
            <TextField
              variant="outlined"
              label="อีเมล"
              value={information.email}
              {...register("email", {
                onChange: (e) =>
                  setInformation({ ...information, email: e.target.value }),
              })}
              error={!!errors?.email}
              helperText={errors?.email?.message}
              required
              fullWidth
            />
            <TextField
              variant="outlined"
              label="เบอร์โทร"
              value={information.tel}
              {...register("tel", {
                onChange: (e) =>
                  setInformation({ ...information, tel: e.target.value }),
              })}
              error={!!errors?.tel}
              helperText={errors?.tel?.message}
              required
              fullWidth
            />
          </Stack>
          <Stack direction={chgWidth()} spacing={5} width="60%">
            <TextField
              variant="outlined"
              label="ประเภท"
              value={information.role}
              {...register("role", {
                onChange: (e) =>
                  setInformation({ ...information, role: e.target.value }),
              })}
              error={!!errors?.role}
              helperText={errors?.role?.message}
              select
              required
              fullWidth
            >
              <MenuItem value="staff">Staff</MenuItem>
              <MenuItem value="internship">Internship</MenuItem>
              <MenuItem value="guest">Guest</MenuItem>
            </TextField>
            <TextField
              variant="outlined"
              label="ชนิดอุปกรณ์"
              value={information.device_type}
              {...register("device_type", {
                onChange: (e) =>
                  setInformation({
                    ...information,
                    device_type: e.target.value,
                  }),
              })}
              error={!!errors?.device_type}
              helperText={errors?.device_type?.message}
              select
              required
              fullWidth
            >
              <MenuItem value="mobile">Mobile</MenuItem>
              <MenuItem value="notebook">Notebook</MenuItem>
              <MenuItem value="tablet">Tablet</MenuItem>
              <MenuItem value="ipad">iPad</MenuItem>
              <MenuItem value="etc">Etc.</MenuItem>
            </TextField>
          </Stack>

          <Stack
            direction={chgWidth()}
            spacing={5}
            width="60%"
            justifyContent="flex-end"
            sx={{
              display: information.device_type === "etc" ? "" : "none",
            }}
          >
            <TextField
              variant="outlined"
              label="อื่นๆ"
              value={information.etc}
              {...register("etc", {
                onChange: (e) =>
                  setInformation({ ...information, etc: e.target.value }),
              })}
              error={!!errors?.etc}
              helperText={errors?.etc?.message}
              fullWidth
              required
            />
          </Stack>
          <Stack direction={chgWidth()} spacing={5} width="60%">
            <TextField
              variant="outlined"
              label="แบรนด์"
              value={information.device_brand}
              {...register("device_brand", {
                onChange: (e) =>
                  setInformation({
                    ...information,
                    device_brand: e.target.value,
                  }),
              })}
              error={!!errors?.device_brand}
              helperText={errors?.device_brand?.message}
              required
              fullWidth
            />
            <TextField
              variant="outlined"
              label="ชื่ออุปกรณ์"
              value={information.device_name}
              {...register("device_name", {
                onChange: (e) =>
                  setInformation({
                    ...information,
                    device_name: e.target.value,
                  }),
              })}
              error={!!errors?.device_name}
              helperText={errors?.device_name?.message}
              required
              fullWidth
            />
          </Stack>
          <Stack direction={chgWidth()} spacing={5} width="60%">
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <Controller
                control={control}
                name="start_date"
                render={({ field: { name, ...field } }) => (
                  <DatePicker
                    {...field}
                    label="เข้าวันที่"
                    inputFormat="YYYY/MM/DD"
                    value={information.startdate}
                    onChange={(newValue) => {
                      const date = `${newValue.$y}-${newValue.$M + 1}-${
                        newValue.$D
                      }`;
                      setValue("start_date", date);
                      setInformation({ ...information, start_date: date });
                    }}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        onKeyDown={(e) => e.preventDefault()}
                        error={!!errors?.start_date}
                        helperText={errors?.start_date?.message}
                        fullWidth
                        required
                      />
                    )}
                  />
                )}
              />
              <Controller
                control={control}
                name="end_date"
                render={({ field: { name, ...field } }) => (
                  <DatePicker
                    {...field}
                    label="ออกวันที่"
                    inputFormat="YYYY/MM/DD"
                    value={information.end_date}
                    onChange={(newValue) => {
                      const date = `${newValue.$y}-${newValue.$M + 1}-${
                        newValue.$D
                      }`;
                      setValue("end_date", date);
                      setInformation({ ...information, end_date: date });
                    }}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        onKeyDown={(e) => e.preventDefault()}
                        error={!!errors?.end_date}
                        helperText={errors?.end_date?.message}
                        fullWidth
                        required={information.role !== "staff"}
                        sx={{
                          display: `${
                            information.role !== "staff" ? "" : "none"
                          }`,
                        }}
                      />
                    )}
                  />
                )}
              />
            </LocalizationProvider>
          </Stack>
          <Stack direction={chgWidth()} spacing={5} width="60%">
            <TextField
              variant="outlined"
              label="หมายเหตุ"
              value={information.remark}
              rows={2}
              {...register("remark", {
                onChange: (e) =>
                  setInformation({ ...information, remark: e.target.value }),
              })}
              multiline
              fullWidth
            />
          </Stack>
          <Stack
            direction="row"
            justifyContent="space-around"
            spacing={5}
            width="60%"
          >
            <Button type="submit" variant="contained">
              Submit
            </Button>
            <Button
              type="button"
              variant="outlined"
              color="warning"
              onClick={() => navigate(prevPath, { state: { rowData } })}
            >
              Cancel
            </Button>
          </Stack>
        </Stack>
      </div>
    </div>
  );
}

export default EditUser;
