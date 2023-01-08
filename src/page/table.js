import "../style/table.css";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import MuiTable from "../components/muitable";
import Swal from "sweetalert2";
import jwt_decode from "jwt-decode";
import axios from "axios";
import Cookies from "js-cookie";
import { AppBar, Box, Button, Toolbar, Typography } from "@mui/material";

function MyTable() {
  const navigate = useNavigate();
  const [memberList, setMemberList] = useState([]);
  const [Username, setUsername] = useState("");
  const [token, setToken] = useState("");
  const [expire, setExpire] = useState("");
  const [loading, setLoading] = useState(false);

  const refreshToken = async () => {
    try {
      const refreshToken = Cookies.get("refreshToken");
      const response = await axios.get("http://localhost:5000/token", {
        params: { refreshToken: refreshToken },
      });
      setToken(response.data.accessToken);
      const decoded = jwt_decode(response.data.accessToken);
      setUsername(decoded.Username);
      setExpire(decoded.exp);
    } catch (error) {
      if (error.response) {
        navigate("/login");
      }
    }
  };

  const axiosJWT = axios.create();

  axiosJWT.interceptors.request.use(
    async (config) => {
      const currentDate = new Date();
      if (expire * 1000 < currentDate.getTime()) {
        const refreshToken = Cookies.get("refreshToken");
        const response = await axios.get("http://localhost:5000/token", {
          params: { refreshToken: refreshToken },
        });
        config.headers.Authorization = `Bearer ${response.data.accessToken}`;
        setToken(response.data.accessToken);
        const decoded = jwt_decode(response.data.accessToken);
        setUsername(decoded.Username);
        setExpire(decoded.exp);
      }
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

  const getUserAdmin = async () => {
    await axiosJWT.get("http://localhost:5000/useradmin", {
      headers: {
        Username: Username,
        Authorization: `Bearer ${token}`,
      },
    });
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

  const fetchData = async () => {
    setLoading(true);
    const getUser = await axios.get("http://localhost:5000/getusers");
    setMemberList(getUser.data);
    setLoading(false);
  };

  const showUser = (id) => {
    const newMemberList = memberList.filter((val) => val.id === id);
    navigate("/showdata", { state: { newMemberList } });
  };

  const edituser = (id) => {
    const newMemberList = memberList.filter((val) => val.id === id);
    navigate("/edituser", { state: { newMemberList } });
  };

  const deleteMember = (id) => {
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
        const newMemberList = memberList.filter((val) => val.id !== id);
        setMemberList(newMemberList);
        Swal.fire({
          icon: "success",
          title: "Deleted !",
          timer: 1200,
          timerProgressBar: true,
          showConfirmButton: false,
        });
      }
    });
  };

  useEffect(() => {
    refreshToken();
    getUserAdmin();
    fetchData();
  }, []);

  return (
    <div className="App3">
      <Box mb={1}>
        <AppBar position="static">
          <Toolbar>
            <img src="img/LS-02.png" alt="logo" width="50" height="50" />
            <Typography variant="h5" component="div" sx={{ flexGrow: 1, marginLeft: "10px" }}>
              WIFI Request List
            </Typography>
            <Button color="inherit" onClick={Logout}>
              Logout
            </Button>
          </Toolbar>
        </AppBar>
      </Box>
      <div className="bg3">
        <div className="all-scroll">
          <MuiTable
            loading={loading}
            memberList={memberList}
            showUser={showUser}
            edituser={edituser}
            deleteMember={deleteMember}
          />
        </div>
      </div>
    </div>
  );
}

export default MyTable;
