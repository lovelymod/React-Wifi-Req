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
  Typography,
  IconButton,
} from "@mui/material";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { userSchema } from "../utils/schema";
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
  const [information, setInformation] = useState({
    name: "",
    role: "",
    tel: "",
    email: "",
    device_type: "",
    etc: "",
    device_brand: "",
    device_name: "",
    start_date: "",
    end_date: "",
    remark: "",
  });

  const {
    register,
    handleSubmit,
    control,
    setValue,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(userSchema),
    defaultValues: {
      name: "",
      role: "",
      tel: "",
      email: "",
      device_type: "",
      etc: "",
      device_brand: "",
      device_name: "",
      start_date: "",
      end_date: "",
      remark: "",
    },
  });

  const resetForm = () => {
    const resetValue = {
      name: "",
      role: "",
      tel: "",
      email: "",
      device_type: "",
      etc: "",
      device_brand: "",
      device_name: "",
      start_date: "",
      end_date: "",
      remark: "",
    };

    setInformation(resetValue);
    reset(resetValue);
  };

  const chgWidth = () => {
    if (window.innerWidth < 600) {
      return "column";
    } else {
      return "row";
    }
  };

  const handleClose = () => {
    setOpen(false);
  };

  const onSubmit = async () => {
    const telFormat =
      information.tel.slice(0, 3) +
      "-" +
      information.tel.slice(3, 6) +
      "-" +
      information.tel.slice(6, 10);
    const dates = moment().format("yy-mm-d , H:mm:ss");

    await axios
      .post("http://localhost:5000/users", {
        ...information,
        submit_date: dates,
        tel: telFormat,
        device_type:
          information.device_type === "etc"
            ? information.etc
            : information.device_type,
        end_date: information.role === "staff" ? "" : information.end_date,
      })
      .then((response) => {
        if (response.data.msg === "User Created") {
          setTimeout(() => {
            window.location.reload();
          }, 1200);
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
    <>
      <Dialog
        open={open}
        onClose={handleClose}
        maxWidth="md"
        TransitionComponent={Transition}
        fullWidth
      >
        <DialogTitle component="div" sx={{ display: "flex" }}>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            Add User
          </Typography>
          <IconButton color="error" onClick={handleClose}>
            <CloseRoundedIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent dividers>
          <DialogContentText>
            Please fill out user information.
          </DialogContentText>
          <form onSubmit={handleSubmit(onSubmit)} noValidate autoComplete="off">
            <Stack direction={chgWidth()} spacing={5} width="70%" mt={3}>
              <TextField
                variant="standard"
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
            <Stack direction={chgWidth()} spacing={5} width="70%" mt={3}>
              <TextField
                variant="standard"
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
                variant="standard"
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
            <Stack direction={chgWidth()} spacing={5} width="70%" mt={3}>
              <TextField
                variant="standard"
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
                variant="standard"
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
              justifyContent="flex-end"
              width="70%"
              mt={3}
              sx={{
                display: `${information.device_type === "etc" ? "" : "none"}`,
              }}
            >
              <TextField
                variant="standard"
                label="อื่นๆ"
                value={information.etc}
                {...register("etc", {
                  onChange: (e) =>
                    setInformation({ ...information, etc: e.target.value }),
                })}
                error={!!errors?.etc}
                helperText={errors?.etc?.message}
                fullWidth
                required={information.device_type === "etc"}
              />
            </Stack>
            <Stack direction={chgWidth()} spacing={5} width="70%" mt={3}>
              <TextField
                variant="standard"
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
                variant="standard"
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
            <Stack direction={chgWidth()} spacing={5} width="70%" mt={3}>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <Controller
                  control={control}
                  name="start_date"
                  render={({ field: { name, ...field } }) => (
                    <DatePicker
                      {...field}
                      label="เข้าวันที่"
                      inputFormat="YYYY/MM/DD"
                      value={information.start_date}
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
                          variant="standard"
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
                          variant="standard"
                          error={!!errors?.end_date}
                          helperText={errors?.end_date?.message}
                          fullWidth
                          required={information.role !== "staff"}
                          sx={{
                            display: `${
                              information.role === "staff" ? "none" : ""
                            }`,
                          }}
                        />
                      )}
                    />
                  )}
                />
              </LocalizationProvider>
            </Stack>
            <Stack direction={chgWidth()} spacing={5} width="70%" mt={3}>
              <TextField
                variant="standard"
                label="หมายเหตุ"
                value={information.remark}
                rows={4}
                {...register("remark", {
                  onChange: (e) =>
                    setInformation({ ...information, remark: e.target.value }),
                })}
                error={!!errors?.remark}
                helperText={errors?.remark?.message}
                multiline
                fullWidth
              />
            </Stack>
            <DialogActions sx={{ width: "100%" }}>
              <Stack direction={chgWidth()} spacing={5} mt={3} width="30%">
                <Button type="submit" variant="contained" fullWidth>
                  submit
                </Button>
                <Button
                  type="button"
                  variant="outlined"
                  color="warning"
                  onClick={resetForm}
                  fullWidth
                >
                  Reset
                </Button>
              </Stack>
            </DialogActions>
          </form>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default AdminDialog;
