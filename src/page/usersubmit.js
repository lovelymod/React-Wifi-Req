import "../style/usersubmit.css";
import { useState, useEffect } from "react";
import axios from "axios";
import { useForm, Controller } from "react-hook-form";
import moment from "moment";
import Swal from "sweetalert2";
import { motion } from "framer-motion";
import { yupResolver } from "@hookform/resolvers/yup";
import { userSchema } from "../components/schema";
import { AppBar, Box, MenuItem, Stack, TextField, Toolbar, Typography, Switch } from "@mui/material";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import thaiFlag from "../img/thaiFlag.svg";
import usFlag from "../img/usFlag.png";

function UserSubmit() {
  const [fname, setFname] = useState("");
  const [lname, setLname] = useState("");
  const [utype, setUtype] = useState("");
  const [tel, setTel] = useState("");
  const [email, setEmail] = useState("");
  const [dtype, setDtype] = useState("");
  const [etc, setEtc] = useState("");
  const [dbrand, setDbrand] = useState("");
  const [dname, setDname] = useState("");
  const [startdate, setStartdate] = useState("");
  const [enddate, setEnddate] = useState("");
  const [remark, setRemark] = useState("");
  const [internalIP, setInternalIP] = useState("");

  const {
    register,
    handleSubmit,
    reset,
    control,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(userSchema),
    defaultValues: {
      Firstname: "",
      Lastname: "",
      Email: "",
      Tel: "",
      UserType: "",
      Device_Type: "",
      DeviceBrand: "",
      DeviceName: "",
      StartDate: "",
      EndDate: "",
      Remark: "",
    },
  });

  const resetForm = () => {
    setFname("");
    setLname("");
    setEmail("");
    setTel("");
    setUtype("");
    setDtype("");
    setDbrand("");
    setDname("");
    setStartdate(null);
    setEnddate(null);
    setRemark("");
    reset({
      Firstname: "",
      Lastname: "",
      Email: "",
      Tel: "",
      UserType: "",
      DeviceType: "",
      DeviceBrand: "",
      DeviceName: "",
      StartDate: "",
      EndDate: "",
      Remark: "",
    });
  };

  const GetIP = async () => {
    await axios.post("http://localhost:5000/getip").then((response) => {
      setInternalIP(response.data[1].address);
    });
  };

  const chgWidth = () => {
    if (window.innerWidth < 600) {
      return "column";
    } else {
      return "row";
    }
  };

  const OnSubmit = () => {
    const telFormat = tel.slice(0, 3) + "-" + tel.slice(3, 6) + "-" + tel.slice(6, 10);
    const dates = moment().format("YYYY-MM-DD");
    const times = moment().format("HH:mm");

    axios
      .post("http://localhost:5000/users", {
        Firstname: fname,
        Lastname: lname,
        User_Type: utype,
        Tel: telFormat,
        Email: email,
        Device_Type: dtype === "etc" ? etc : dtype,
        Device_Brand: dbrand,
        Device_Name: dname,
        Start_Date: startdate,
        End_Date: utype === "staff" ? "" : enddate,
        Remark: remark,
        Dates: dates,
        Times: times,
        Ip_Addr: internalIP,
      })
      .then((response) => {
        if (response.data.msg === "User Created") {
          Swal.fire({
            icon: "success",
            title: "Submited",
            showConfirmButton: false,
            timer: 1500,
            timerProgressBar: true,
          });
          setTimeout(() => {
            window.location.reload();
          }, 1400);
        } else {
          Swal.fire({
            icon: "error",
            title: "Error",
            text: "Something went wrong!",
            showConfirmButton: false,
          });
        }
      });
  };

  useEffect(() => {
    GetIP();
  }, []);

  return (
    <div className="App1">
      <Box mb={1}>
        <AppBar position="static">
          <Toolbar>
            <img src="img/LS-02.png" alt="logo" width="50" height="50" />
            <Typography variant="h5" component="div" sx={{ flexGrow: 1, marginLeft: "10px" }}>
              WIFI Request
            </Typography>
            <img src={thaiFlag} alt="thai" width="20px" height="15px" />
            <Switch color="default" />
            <img src={usFlag} alt="uslish" width="20px" height="15px" />
          </Toolbar>
        </AppBar>
      </Box>
      <Box
        component={motion.div}
        className="bg1"
        initial={{ scale: 0 }}
        animate={{ scale: 0.95 }}
        transition={{
          delay: 0.3,
        }}
        sx={{ boxShadow: "15" }}
      >
        <Box className="images1">
          <img className="logo1" src="img/LS-02.png" alt="" srcSet="" width="125px" height="125px" />
        </Box>

        <Typography variant="h4" color="#ffb401" textAlign="center" mb={5}>
          Please fill out a request form
        </Typography>

        <Box>
          <Stack component="form" spacing={5} onSubmit={handleSubmit(OnSubmit)} noValidate autoComplete="off">
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
              sx={{ display: `${dtype === "etc" ? "" : "none"}` }}
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
                          onKeyDown={(e) => e.preventDefault()}
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
                          onKeyDown={(e) => e.preventDefault()}
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
                fullWidth
              />
            </Stack>
            <Stack direction="row" justifyContent="space-around" spacing={5} width="60%">
              <motion.input
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                type="submit"
                className="btn regisbutt"
                value="Submit"
              />

              <motion.input
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                type="button"
                className="btn backbutt"
                value="Reset"
                onClick={() => resetForm()}
              />
            </Stack>
          </Stack>
        </Box>
      </Box>
    </div>
  );
}

export default UserSubmit;
