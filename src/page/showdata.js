import "../style/showdata.css";
import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import Swal from "sweetalert2";
import Cookies from "js-cookie";
import axios from "axios";
import {
  AppBar,
  Box,
  Toolbar,
  Typography,
  Button,
  IconButton,
  Stack,
  InputLabel,
  Tooltip,
} from "@mui/material";
import LogoutRoundedIcon from "@mui/icons-material/LogoutRounded";

function ShowData() {
  const navigate = useNavigate();
  const location = useLocation();
  const rowData = location.state.rowData;
  const pathName = location.pathname;

  const refreshToken = async () => {
    try {
      const refreshToken = Cookies.get("refreshToken");
      await axios.get("http://localhost:5000/token", {
        params: { refreshToken: refreshToken },
      });
    } catch (error) {
      if (error.response) {
        navigate("/");
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
      navigate("/");
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
        axios.delete(`http://localhost:5000/users/${id}`).then((response) => {
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

  useEffect(() => {
    refreshToken();
  }, []);

  return (
    <div className="App5">
      <Box mb={5}>
        <AppBar position="static">
          <Toolbar>
            <Tooltip title="Back" arrow>
              <IconButton onClick={() => navigate("/table")}>
                <ArrowBackIosIcon sx={{ color: "white", fontSize: "30px" }} />
              </IconButton>
            </Tooltip>
            <img src="img/LS-02.png" alt="logo" width="50" height="50" />
            <Typography
              variant="h5"
              component="div"
              sx={{ flexGrow: 1, marginLeft: "10px" }}
            >
              User Detail
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
      <div className="bg5">
        <Box width="100%" pt={3} pb={3}>
          <Box>
            <InputLabel sx={{ color: "black" }}>IP Address:</InputLabel>
            <Typography variant="h5">
              {rowData.ip_addr ? rowData.ip_addr : "-"}
            </Typography>
          </Box>

          <Stack direction={chgWidth()} mt={3} spacing={3}>
            <Box width="100%">
              <InputLabel sx={{ color: "black" }}>ชื่อ:</InputLabel>
              <Typography variant="h5">{rowData.name}</Typography>
            </Box>
          </Stack>
          <Stack direction={chgWidth()} mt={3} spacing={3}>
            <Box width="100%">
              <InputLabel sx={{ color: "black" }}>อีเมล:</InputLabel>
              <Typography variant="h5">{rowData.email}</Typography>
            </Box>
            <Box width="100%">
              <InputLabel sx={{ color: "black" }}>เบอร์โทร:</InputLabel>
              <Typography variant="h5">{rowData.tel}</Typography>
            </Box>
          </Stack>
          <Stack direction={chgWidth()} mt={3} spacing={3}>
            <Box width="100%">
              <InputLabel sx={{ color: "black" }}>ประเภท:</InputLabel>
              <Typography variant="h5">{rowData.role}</Typography>
            </Box>
            <Box width="100%">
              <InputLabel sx={{ color: "black" }}>ชนิดอุปกรณ์:</InputLabel>
              <Typography variant="h5">{rowData.device_type}</Typography>
            </Box>
          </Stack>

          <Stack direction={chgWidth()} mt={3} spacing={3}>
            <Box width="100%">
              <InputLabel sx={{ color: "black" }}>แบรนด์</InputLabel>
              <Typography variant="h5">{rowData.device_brand}</Typography>
            </Box>
            <Box width="100%">
              <InputLabel sx={{ color: "black" }}>ชื่ออุปกรณ์:</InputLabel>
              <Typography variant="h5">{rowData.device_name}</Typography>
            </Box>
          </Stack>
          <Stack direction={chgWidth()} mt={3} spacing={3}>
            <Box width="100%">
              <InputLabel sx={{ color: "black" }}>เข้าวันที่:</InputLabel>
              <Typography variant="h5">{rowData.start_date}</Typography>
            </Box>
            <Box
              width="100%"
              sx={{ display: rowData.role === "staff" ? "none" : "" }}
            >
              <InputLabel sx={{ color: "black" }}>ออกวันที่:</InputLabel>
              <Typography variant="h5">{rowData.end_date}</Typography>
            </Box>
          </Stack>
          <Stack direction="row" mt={3} spacing={3}>
            <Box width="100%">
              <InputLabel sx={{ color: "black" }}>หมายเหตุ:</InputLabel>
              <Typography variant="h5">
                {rowData.remark ? rowData.remark : "-"}
              </Typography>
            </Box>
          </Stack>
          <Stack direction="row" mt={3} spacing={5}>
            <Button
              variant="contained"
              onClick={() =>
                navigate("/edituser", { state: { rowData, pathName } })
              }
            >
              Edit
            </Button>
            <Button
              variant="outlined"
              color="warning"
              onClick={() => DeleteUser(rowData.id)}
            >
              Delete
            </Button>
          </Stack>
        </Box>
      </div>
    </div>
  );
}

export default ShowData;
