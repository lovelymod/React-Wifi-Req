import "../style/edituser.css";
import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Controller, useForm } from "react-hook-form";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import Swal from "sweetalert2";
import Cookies from "js-cookie";
import axios from "axios";
import { yupResolver } from "@hookform/resolvers/yup";
import { userSchema } from "../components/schema";
import { AppBar, Box, Button, IconButton, MenuItem, Stack, TextField, Toolbar, Typography } from "@mui/material";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";

function EditUser() {
  const navigate = useNavigate();
  const location = useLocation();
  const rowData = location.state.rowData;
  const prevPath = location.state.pathName;
  const [fname, setFname] = useState(rowData.Firstname);
  const [lname, setLname] = useState(rowData.Lastname);
  const [email, setEmail] = useState(rowData.Email);
  const [tel, setTel] = useState(
    rowData.Tel.length > 10 ? rowData.Tel.slice(0, 3) + rowData.Tel.slice(4, 7) + rowData.Tel.slice(8, 12) : rowData.Tel
  );
  const [utype, setUtype] = useState(rowData.User_Type);
  const [dtype, setDtype] = useState(
    rowData.Device_Type === "mobile" ||
      rowData.Device_Type === "notebook" ||
      rowData.Device_Type === "tablet" ||
      rowData.Device_Type === "ipad"
      ? rowData.Device_Type
      : "etc"
  );
  const [etc, setEtc] = useState(dtype === "etc" ? rowData.Device_Type : "");
  const [dbrand, setDbrand] = useState(rowData.Device_Brand);
  const [dname, setDname] = useState(rowData.Device_Name);
  const [startdate, setStartdate] = useState(rowData.Start_Date);
  const [enddate, setEnddate] = useState(rowData.End_Date);
  const [remark, setRemark] = useState(rowData.Remark);

  const {
    register,
    handleSubmit,
    control,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(userSchema),
    defaultValues: {
      Firstname: fname,
      Lastname: lname,
      Email: email,
      Tel: tel,
      UserType: utype,
      DeviceType: dtype,
      DeviceBrand: dbrand,
      DeviceName: dname,
      StartDate: startdate,
      EndDate: enddate,
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
    const telFormat = tel.slice(0, 3) + "-" + tel.slice(3, 6) + "-" + tel.slice(6, 10);
    await axios
      .patch("http://localhost:5000/updateusers", {
        id: id,
        Firstname: fname,
        Lastname: lname,
        Email: email,
        Tel: telFormat,
        User_Type: utype,
        Device_Type: dtype === "etc" ? etc : dtype,
        Device_Brand: dbrand,
        Device_Name: dname,
        Start_Date: startdate,
        End_Date: utype === "staff" ? "" : enddate,
        Remark: remark,
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
      .catch((err) => {});
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
            <IconButton onClick={() => navigate(prevPath, { state: { rowData } })}>
              <ArrowBackIosIcon sx={{ color: "white" }} />
            </IconButton>
            <img src="img/LS-02.png" alt="logo" width="50" height="50" />
            <Typography variant="h5" component="div" sx={{ flexGrow: 1, marginLeft: "10px" }}>
              User Edit
            </Typography>
            <Button color="inherit" onClick={Logout}>
              Logout
            </Button>
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
              value={fname}
              {...register("Firstname", { onChange: (e) => setFname(e.target.value) })}
              error={!!errors?.Firstname}
              helperText={errors?.Firstname?.message}
              required
              fullWidth
            />

            <TextField
              variant="outlined"
              label="นามสกุล"
              value={lname}
              {...register("Lastname", { onChange: (e) => setLname(e.target.value) })}
              error={!!errors?.Lastname}
              helperText={errors?.Lastname?.message}
              required
              fullWidth
            />
          </Stack>
          <Stack direction={chgWidth()} spacing={5} width="60%">
            <TextField
              variant="outlined"
              label="อีเมล"
              value={email}
              {...register("Email", { onChange: (e) => setEmail(e.target.value) })}
              error={!!errors?.Email}
              helperText={errors?.Email?.message}
              required
              fullWidth
            />
            <TextField
              variant="outlined"
              label="เบอร์โทร"
              value={tel}
              {...register("Tel", { onChange: (e) => setTel(e.target.value) })}
              error={!!errors?.Tel}
              helperText={errors?.Tel?.message}
              required
              fullWidth
            />
          </Stack>
          <Stack direction={chgWidth()} spacing={5} width="60%">
            <TextField
              variant="outlined"
              label="ประเภท"
              value={utype}
              {...register("UserType", { onChange: (e) => setUtype(e.target.value) })}
              error={!!errors?.UserType}
              helperText={errors?.UserType?.message}
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
              value={dtype}
              {...register("DeviceType", { onChange: (e) => setDtype(e.target.value) })}
              error={!!errors?.DeviceType}
              helperText={errors?.DeviceType?.message}
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
              display: dtype === "etc" ? "" : "none",
            }}
          >
            <TextField
              variant="outlined"
              label="อื่นๆ"
              value={etc}
              {...register("Etc", { onChange: (e) => setEtc(e.target.value) })}
              error={!!errors?.Etc}
              helperText={errors?.Etc?.message}
              fullWidth
              required
            />
          </Stack>
          <Stack direction={chgWidth()} spacing={5} width="60%">
            <TextField
              variant="outlined"
              label="แบรนด์"
              value={dbrand}
              {...register("DeviceBrand", { onChange: (e) => setDbrand(e.target.value) })}
              error={!!errors?.DeviceBrand}
              helperText={errors?.DeviceBrand?.message}
              required
              fullWidth
            />
            <TextField
              variant="outlined"
              label="ชื่ออุปกรณ์"
              value={dname}
              {...register("DeviceName", { onChange: (e) => setDname(e.target.value) })}
              error={!!errors?.DeviceName}
              helperText={errors?.DeviceName?.message}
              required
              fullWidth
            />
          </Stack>
          <Stack direction={chgWidth()} spacing={5} width="60%">
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <Controller
                control={control}
                name="StartDate"
                render={({ field: { name, ...field } }) => (
                  <DatePicker
                    {...field}
                    label="เข้าวันที่"
                    inputFormat="YYYY/MM/DD"
                    value={startdate}
                    onChange={(newValue) => {
                      const date = `${newValue.$y}-${newValue.$M + 1}-${newValue.$D}`;
                      setValue("StartDate", date);
                      setStartdate(date);
                    }}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        error={!!errors?.StartDate}
                        helperText={errors?.StartDate?.message}
                        fullWidth
                        required
                      />
                    )}
                  />
                )}
              />
              <Controller
                control={control}
                name="EndDate"
                render={({ field: { name, ...field } }) => (
                  <DatePicker
                    {...field}
                    label="ออกวันที่"
                    inputFormat="YYYY/MM/DD"
                    value={enddate}
                    onChange={(newValue) => {
                      const date = `${newValue.$y}-${newValue.$M + 1}-${newValue.$D}`;
                      setValue("EndDate", date);
                      setEnddate(date);
                    }}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        error={!!errors?.EndDate}
                        helperText={errors?.EndDate?.message}
                        fullWidth
                        required
                        sx={{ display: `${utype !== "staff" ? "" : "none"}` }}
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
              value={remark}
              rows={2}
              {...register("Remark", { onChange: (e) => setRemark(e.target.value) })}
              multiline
              required
              fullWidth
            />
          </Stack>
          <Stack direction="row" justifyContent="space-around" spacing={5} width="60%">
            <Button type="submit" variant="contained">
              Submit
            </Button>
            <Button type="button" variant="outlined" onClick={() => navigate(prevPath, { state: { rowData } })}>
              Cancel
            </Button>
          </Stack>
        </Stack>
      </div>
    </div>
  );
}

export default EditUser;
