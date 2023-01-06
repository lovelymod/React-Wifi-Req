import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Stack,
  TextField,
  MenuItem,
  Button,
} from "@mui/material";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { userSchema } from "./schema";
import { useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import moment from "moment";
import * as React from "react";
import Slide from "@mui/material/Slide";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const AdminDialog = ({ open, setOpen }) => {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(userSchema),
  });
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

  const strUtype = utype;
  let strDtype = dtype;

  let winWidth = window.innerWidth;

  const chgWidth = (width) => {
    if (width < 600) {
      return "column";
    } else {
      return "row";
    }
  };

  const swapData = () => {
    if (strDtype === "etc.") {
      strDtype = etc;
    }
  };

  const handleClose = () => {
    setOpen(false);
  };
  const onSubmit = async () => {
    swapData();
    const dates = moment().format("YYYY-MM-DD");
    const times = moment().format("HH:mm");

    await axios
      .post("http://localhost:5000/users", {
        Firstname: fname,
        Lastname: lname,
        User_Type: strUtype,
        Tel: tel,
        Email: email,
        Device_Type: strDtype,
        Device_Brand: dbrand,
        Device_Name: dname,
        Start_Date: startdate,
        End_Date: strUtype === "staff" ? "" : enddate,
        Remark: remark,
        Dates: dates,
        Times: times,
      })
      .then((response) => {
        if (response.data.msg === "User Created") {
          handleClose();
          Swal.fire({
            icon: "success",
            title: "Submited",
            showConfirmButton: false,
            timerProgressBar: true,
            timer: 1200,
          });
        }
      });
  };
  return (
    <Dialog open={open} onClose={handleClose} maxWidth="md" TransitionComponent={Transition} fullWidth>
      <DialogTitle>Add User</DialogTitle>
      <DialogContent dividers>
        <DialogContentText>Please fill out user information.</DialogContentText>
        <form onSubmit={handleSubmit(onSubmit)} noValidate autoComplete="off">
          <Stack direction={chgWidth(winWidth)} spacing={5} width="70%" mt={3}>
            <TextField
              variant="standard"
              label="Firstname"
              value={fname}
              {...register("Firstname", {
                onChange: (e) => setFname(e.target.value),
              })}
              error={!!errors?.Firstname}
              helperText={errors?.Firstname?.message}
              required
              fullWidth
            />
            <TextField
              variant="standard"
              label="Lastname"
              value={lname}
              {...register("Lastname", {
                onChange: (e) => setLname(e.target.value),
              })}
              error={!!errors?.Lastname}
              helperText={errors?.Lastname?.message}
              required
              fullWidth
            />
          </Stack>
          <Stack direction={chgWidth(winWidth)} spacing={5} width="70%" mt={3}>
            <TextField
              variant="standard"
              label="Email"
              value={email}
              {...register("Email", {
                onChange: (e) => setEmail(e.target.value),
              })}
              error={!!errors?.Email}
              helperText={errors?.Email?.message}
              required
              fullWidth
            />
            <TextField
              variant="standard"
              label="Tel"
              value={tel}
              {...register("Tel", {
                onChange: (e) => setTel(e.target.value),
              })}
              error={!!errors?.Tel}
              helperText={errors?.Tel?.message}
              required
              fullWidth
            />
          </Stack>
          <Stack direction={chgWidth(winWidth)} spacing={5} width="70%" mt={3}>
            <TextField
              variant="standard"
              label="UserType"
              value={utype}
              {...register("UserType", {
                onChange: (e) => setUtype(e.target.value),
              })}
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
              variant="standard"
              label="DeviceType"
              value={dtype}
              {...register("DeviceType", {
                onChange: (e) => setDtype(e.target.value),
              })}
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
            direction={chgWidth(winWidth)}
            justifyContent="flex-end"
            width="70%"
            mt={3}
            sx={{ display: `${dtype === "etc" ? "" : "none"}` }}
          >
            <TextField
              variant="standard"
              label="Etc"
              value={etc}
              {...register("Etc", {
                onChange: (e) => setEtc(e.target.value),
              })}
              error={!!errors?.Etc}
              helperText={errors?.Etc?.message}
              required={dtype === "etc"}
            />
          </Stack>
          <Stack direction={chgWidth(winWidth)} spacing={5} width="70%" mt={3}>
            <TextField
              variant="standard"
              label="DeviceBrand"
              value={dbrand}
              {...register("DeviceBrand", {
                onChange: (e) => setDbrand(e.target.value),
              })}
              error={!!errors?.DeviceBrand}
              helperText={errors?.DeviceBrand?.message}
              required
              fullWidth
            />
            <TextField
              variant="standard"
              label="DeviceName"
              value={dname}
              {...register("DeviceName", {
                onChange: (e) => setDname(e.target.value),
              })}
              error={!!errors?.DeviceName}
              helperText={errors?.DeviceName?.message}
              required
              fullWidth
            />
          </Stack>
          <Stack direction={chgWidth(winWidth)} spacing={5} width="70%" mt={3}>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <Controller
                control={control}
                name="StartDate"
                render={({ field: { onChange, name, ...field } }) => (
                  <DatePicker
                    {...field}
                    label="StartDate"
                    inputFormat="YYYY/MM/DD"
                    value={startdate}
                    onChange={onChange}
                    onAccept={(newValue) => {
                      setStartdate(`${newValue.$y}-${newValue.$M + 1}-${newValue.$D}`);
                    }}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        variant="standard"
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
                render={({ field: { onChange, onBlur, name, ...field } }) => (
                  <DatePicker
                    {...field}
                    label="EndDate"
                    inputFormat="YYYY/MM/DD"
                    value={enddate}
                    disabled={utype === "staff"}
                    onChange={onChange}
                    onAccept={(newValue) => {
                      setEnddate(`${newValue.$y}-${newValue.$M + 1}-${newValue.$D}`);
                    }}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        variant="standard"
                        error={!!errors?.EndDate}
                        helperText={errors?.EndDate?.message}
                        fullWidth
                        required={utype !== "staff"}
                        sx={{ display: `${utype === "staff" ? "none" : ""}` }}
                      />
                    )}
                  />
                )}
              />
            </LocalizationProvider>
          </Stack>
          <Stack direction={chgWidth(winWidth)} spacing={5} width="70%" mt={3}>
            <TextField
              variant="standard"
              label="Remark"
              value={remark}
              rows={4}
              {...register("Remark", {
                onChange: (e) => setRemark(e.target.value),
              })}
              error={!!errors?.Remark}
              helperText={errors?.Remark?.message}
              multiline
              required
              fullWidth
            />
          </Stack>
          <DialogActions sx={{ width: "100%" }}>
            <Stack direction={chgWidth(winWidth)} spacing={5} mt={3} width="30%">
              <Button type="submit" variant="contained" fullWidth>
                submit
              </Button>
              <Button type="button" variant="outlined" onClick={handleClose} fullWidth>
                Close
              </Button>
            </Stack>
          </DialogActions>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default AdminDialog;
