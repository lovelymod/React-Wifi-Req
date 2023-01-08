import "../style/showdata.css";
import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import Axios from "axios";
import Swal from "sweetalert2";
import { motion } from "framer-motion";
import Cookies from "js-cookie";
import axios from "axios";
import {
  AppBar,
  Box,
  Toolbar,
  Typography,
  Button,
  IconButton,
  TextField,
  Stack,
  MenuItem,
  InputLabel,
} from "@mui/material";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";

function ShowData() {
  const navigate = useNavigate();
  const location = useLocation();
  const rowData = location.state.rowData;
  console.log("🚀 ~ file: showdata.js:29 ~ rowData", rowData);

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

  const DeleteUser = (id) => {
    Swal.fire({
      title: "Confirm Delete?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#28a745",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
      reverseButtons: true,
    }).then((result) => {
      if (result.isConfirmed) {
        Axios.delete(`http://localhost:5000/users/${id}`).then((response) => {
          if (response.data.msg === "User Deleted") {
            Swal.fire({
              icon: "success",
              title: "Deleted!",
              timer: 1200,
              timerProgressBar: true,
              showConfirmButton: false,
            });
            setTimeout(function () {
              navigate("/table");
            }, 1500);
          }
        });
      }
    });
  };

  const chgWidth = () => {
    if (window.innerWidth < 600) {
      return "column";
    } else {
      return "row";
    }
  };

  // const edituser = (id) => {
  //   const newMemberList = showNewMember.filter((val) => val.id === id);
  //   navigate("/edituser", { state: { newMemberList } });
  // };

  useEffect(() => {
    refreshToken();
  }, []);

  return (
    <div className="App5">
      <Box mb={5}>
        <AppBar position="static">
          <Toolbar>
            <IconButton onClick={() => navigate("/table")}>
              <ArrowBackIosIcon sx={{ color: "white" }} />
            </IconButton>
            <img src="img/LS-02.png" alt="logo" width="50" height="50" />
            <Typography variant="h5" component="div" sx={{ flexGrow: 1, marginLeft: "10px" }}>
              User Detail
            </Typography>
            <Button color="inherit" onClick={Logout}>
              Logout
            </Button>
          </Toolbar>
        </AppBar>
      </Box>
      <div className="bg5">
        <Box>
          <Box>
            <InputLabel sx={{ color: "black" }}>IP Address:</InputLabel>
            <TextField variant="outlined" defaultValue={rowData.Ip_Addr ? rowData.Ip_Addr : "-"} fullWidth />
          </Box>

          <Stack direction={chgWidth()} justifyContent="space-between" mt={3} spacing={3}>
            <Box width="100%">
              <InputLabel sx={{ color: "black" }}>Firstname:</InputLabel>
              <TextField variant="outlined" defaultValue={rowData.Firstname} fullWidth />
            </Box>
            <Box width="100%">
              <InputLabel sx={{ color: "black" }}>Lastname:</InputLabel>
              <TextField variant="outlined" defaultValue={rowData.Lastname} fullWidth />
            </Box>
          </Stack>
          <Stack direction={chgWidth()} justifyContent="space-between" mt={3} spacing={3}>
            <Box width="100%">
              <InputLabel sx={{ color: "black" }}>Email:</InputLabel>
              <TextField variant="outlined" defaultValue={rowData.Email} fullWidth />
            </Box>
            <Box width="100%">
              <InputLabel sx={{ color: "black" }}>Tel:</InputLabel>
              <TextField variant="outlined" defaultValue={rowData.Tel} fullWidth />
            </Box>
          </Stack>
          <Stack direction={chgWidth()} mt={3} spacing={3}>
            <Box width="100%">
              <InputLabel sx={{ color: "black" }}>User Type:</InputLabel>
              <TextField variant="outlined" defaultValue={rowData.User_Type} select fullWidth>
                <MenuItem value="staff">Staff</MenuItem>
                <MenuItem value="internship">Internship</MenuItem>
                <MenuItem value="guest">Guest</MenuItem>
              </TextField>
            </Box>
            <Box width="100%">
              <InputLabel sx={{ color: "black" }}>Device Type:</InputLabel>
              <TextField
                variant="outlined"
                defaultValue={
                  rowData.Device_Type === "mobile" ||
                  rowData.Device_Type === "notebook" ||
                  rowData.Device_Type === "tablet" ||
                  rowData.Device_Type === "ipad"
                    ? rowData.Device_Type
                    : "etc"
                }
                select
                fullWidth
              >
                <MenuItem value="mobile">Mobile</MenuItem>
                <MenuItem value="notebook">Notebook</MenuItem>
                <MenuItem value="tablet">Tablet</MenuItem>
                <MenuItem value="ipad">iPad</MenuItem>
                <MenuItem value="etc">Etc.</MenuItem>
              </TextField>
            </Box>
          </Stack>
          <Stack
            direction={chgWidth()}
            mt={2}
            sx={{
              display:
                rowData.Device_Type === "mobile" ||
                rowData.Device_Type === "notebook" ||
                rowData.Device_Type === "tablet" ||
                rowData.Device_Type === "ipad"
                  ? "none"
                  : "",
            }}
          >
            <Box width="100%">
              <InputLabel sx={{ color: "black" }}>Etc:</InputLabel>
              <TextField
                variant="outlined"
                defaultValue={
                  rowData.Device_Type === "mobile" ||
                  rowData.Device_Type === "notebook" ||
                  rowData.Device_Type === "tablet" ||
                  rowData.Device_Type === "ipad"
                    ? null
                    : rowData.Device_Type
                }
                fullWidth
              />
            </Box>
          </Stack>
          <Stack direction={chgWidth()} justifyContent="space-between" mt={3} spacing={3}>
            <Box width="100%">
              <InputLabel sx={{ color: "black" }}>Device Brand:</InputLabel>
              <TextField variant="outlined" defaultValue={rowData.Device_Brand} fullWidth />
            </Box>
            <Box width="100%">
              <InputLabel sx={{ color: "black" }}>Device Name:</InputLabel>
              <TextField variant="outlined" defaultValue={rowData.Device_Name} fullWidth />
            </Box>
          </Stack>
          <Stack direction={chgWidth()} justifyContent="space-between" mt={3} spacing={3}>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <Box width="100%">
                <InputLabel sx={{ color: "black" }}>Start Date:</InputLabel>
                <DatePicker
                  inputFormat="YYYY/MM/DD"
                  value={new Date(rowData.Start_Date)}
                  onChange
                  renderInput={(params) => <TextField {...params} fullWidth />}
                />
              </Box>
              <Box width="100%" sx={{ display: rowData.User_Type === "staff" ? "none" : "" }}>
                <InputLabel sx={{ color: "black" }}>End Date:</InputLabel>
                <DatePicker
                  inputFormat="YYYY/MM/DD"
                  value={new Date(rowData.End_Date)}
                  onChange
                  renderInput={(params) => <TextField {...params} fullWidth />}
                />
              </Box>
            </LocalizationProvider>
          </Stack>
          <Stack direction="row" justifyContent="space-between" mt={3} spacing={3}>
            <Box width="100%">
              <InputLabel sx={{ color: "black" }}>Remark:</InputLabel>
              <TextField
                variant="outlined"
                defaultValue={rowData.Remark ? rowData.Remark : "-"}
                rows={2}
                multiline
                required
                fullWidth
              />
            </Box>
          </Stack>
        </Box>
      </div>
    </div>
  );
}

export default ShowData;
