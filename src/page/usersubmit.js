import "../style/usersubmit.css";
import { useState, useEffect } from "react";
import axios from "axios";
import { useForm, Controller } from "react-hook-form";
import moment from "moment";
import Swal from "sweetalert2";
import { motion } from "framer-motion";
import { yupResolver } from "@hookform/resolvers/yup";
import { userSchema } from "../utils/schema";
import { Box, MenuItem, Stack, TextField, Typography } from "@mui/material";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";

import langJSON from "../language/language.json";
import UserAppBar from "../components/userAppBar";

function UserSubmit() {
  const defaultLanguage = window.localStorage.getItem("lang");
  const [toggleLanguage, setToggleLanguage] = useState(!!defaultLanguage);
  const [information, setInformation] = useState({
    ip_addr: "",
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
    reset,
    control,
    setValue,
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

  const handleLanguage = (e) => {
    setToggleLanguage(e.target.checked);
    if (e.target.checked) {
      window.localStorage.setItem("lang", "en/us");
    } else {
      window.localStorage.removeItem("lang");
    }
  };

  const OnSubmit = () => {
    const telFormat =
      information.tel.slice(0, 3) +
      "-" +
      information.tel.slice(3, 6) +
      "-" +
      information.tel.slice(6, 10);
    const dates = moment().format("yy-mm-d , H:mm:ss");

    axios
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
          Swal.fire({
            icon: "success",
            title: "Submited",
            showConfirmButton: false,
            timer: 1500,
            timerProgressBar: true,
          });
          setTimeout(() => {
            // window.location.reload();
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
    const GetIP = async () => {
      await axios.post("http://localhost:5000/getip").then((response) => {
        setInformation({ ...information, ip_addr: response.data[1].address });
      });
    };

    GetIP();
  }, []);

  return (
    <div className="App1">
      <UserAppBar
        toggleLanguage={toggleLanguage}
        handleLanguage={handleLanguage}
      />
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
          <img
            className="logo1"
            src="img/LS-02.png"
            alt=""
            srcSet=""
            width="125px"
            height="125px"
          />
        </Box>

        <Typography variant="h4" color="#ffb401" textAlign="center" mb={5}>
          {toggleLanguage ? langJSON.title.eng : langJSON.title.th}
        </Typography>

        <Box>
          <Stack
            component="form"
            spacing={5}
            onSubmit={handleSubmit(OnSubmit)}
            noValidate
            autoComplete="off"
          >
            <Stack direction={chgWidth()} spacing={5} width="60%">
              <TextField
                variant="outlined"
                label={toggleLanguage ? langJSON.name.eng : langJSON.name.th}
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
                label={toggleLanguage ? langJSON.email.eng : langJSON.email.th}
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
                label={toggleLanguage ? langJSON.tel.eng : langJSON.tel.th}
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
                label={
                  toggleLanguage
                    ? langJSON.user_type.eng
                    : langJSON.user_type.th
                }
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
                label={
                  toggleLanguage
                    ? langJSON.device_type.eng
                    : langJSON.device_type.th
                }
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
                display: `${information.device_type === "etc" ? "" : "none"}`,
              }}
            >
              <TextField
                variant="outlined"
                label={toggleLanguage ? langJSON.etc.eng : langJSON.etc.th}
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
                label={
                  toggleLanguage
                    ? langJSON.device_brand.eng
                    : langJSON.device_brand.th
                }
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
                label={
                  toggleLanguage
                    ? langJSON.device_name.eng
                    : langJSON.device_name.th
                }
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
                      label={
                        toggleLanguage
                          ? langJSON.start_date.eng
                          : langJSON.start_date.th
                      }
                      inputFormat="YYYY/MM/DD"
                      value={information.start_date}
                      onChange={(newValue) => {
                        const date = `${newValue.$y}-${newValue.$M + 1}-${
                          newValue.$D
                        }`;
                        setValue("start_date", date);
                        setInformation({
                          ...information,
                          start_date: date,
                        });
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
                      label={
                        toggleLanguage
                          ? langJSON.end_date.eng
                          : langJSON.end_date.th
                      }
                      inputFormat="YYYY/MM/DD"
                      value={information.end_date}
                      onChange={(newValue) => {
                        const date = `${newValue.$y}-${newValue.$M + 1}-${
                          newValue.$D
                        }`;
                        setValue("end_date", date);
                        setInformation({
                          ...information,
                          end_date: date,
                        });
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
                label={
                  toggleLanguage ? langJSON.remark.eng : langJSON.remark.th
                }
                value={information.remark}
                rows={2}
                {...register("remark", {
                  onChange: (e) =>
                    setInformation({
                      ...information,
                      remark: e.target.value,
                    }),
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
              <motion.input
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                type="submit"
                className="btn regisbutt"
                value={toggleLanguage ? langJSON.btn1.eng : langJSON.btn1.th}
              />

              <motion.input
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                type="button"
                className="btn backbutt"
                value={toggleLanguage ? langJSON.btn2.eng : langJSON.btn2.th}
                onClick={resetForm}
              />
            </Stack>
          </Stack>
        </Box>
      </Box>
    </div>
  );
}

export default UserSubmit;
