import "./table.css";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import moment from "moment";
import Axios from "axios";
import Blogslist from "./blogslist";
import { CSVLink } from "react-csv";
import LogoutOutlinedIcon from "@mui/icons-material/LogoutOutlined";
import AddIcon from "@mui/icons-material/Add";
import DownloadIcon from "@mui/icons-material/Download";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import Swal from "sweetalert2";
import TableSideBar from "./tablesideBar";
import { motion } from "framer-motion";
import ListIcon from "@mui/icons-material/List";
import jwt_decode from "jwt-decode";

function MyTable() {
  const navigate = useNavigate();
  const [memberList, setMemberList] = useState([]);
  const timeStamp = moment().format("YYYY_MM_DD");
  const [exMemberList, setExMemberList] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [Username, setUsername] = useState("");
  const [token, setToken] = useState("");
  const [expire, setExpire] = useState("");

  const refreshToken = async () => {
    try {
      const response = await Axios.get("http://localhost:3002/token");
      setToken(response.data.accessToken);
      const decoded = jwt_decode(response.data.accessToken);
      setUsername(decoded.Username);
      setExpire(decoded.exp);
    } catch (error) {
      if (error.response) {
        navigate("/login");
        localStorage.clear();
        console.log(error.response);
      }
    }
  };

  const axiosJWT = Axios.create();

  axiosJWT.interceptors.request.use(
    async (config) => {
      const currentDate = new Date();
      if (expire * 1000 < currentDate.getTime()) {
        const response = await Axios.get("http://localhost:3002/token");
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
    await axiosJWT.get("http://localhost:3002/useradmin", {
      headers: {
        Username: Username,
        Authorization: `Bearer ${token}`,
      },
    });
  };

  const Logout = async () => {
    try {
      await Axios.delete("http://localhost:3002/logout");
      localStorage.clear();
      navigate("/login");
    } catch (error) {
      console.log(error);
    }
  };

  const fetchData = async () => {
    const getUser = await Axios.get("http://localhost:3002/getusers");
    setMemberList(getUser.data);
    let dataBox = getUser.data;
    let dataList = [];

    dataBox.forEach((item) => {
      dataList.push({
        id: item.id,
        Ip_Addr: item.Ip_Addr ? item.Ip_Addr.toString() : "-",
        Firstname: item.Firstname.toString(),
        Lastname: item.Lastname.toString(),
        Email: item.Email.toString(),
        Tel: '=""' + item.Tel + '""',
        User_Type: item.User_Type.toString(),
        Device_Type: item.Device_Type.toString(),
        Device_Brand: item.Device_Brand.toString(),
        Device_Name: item.Device_Name.toString(),
        Start_Date: item.Start_Date.toString(),
        End_Date: item.End_Date ? item.End_Date.toString() : "-",
        Dates: item.Dates.toString(),
        Times: item.Times.toString(),
      });
    });
    setExMemberList(dataList);
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
        setExMemberList(newMemberList);
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
  
  const gotoAdminSub = () => {
    navigate("/adminsubmit");
  };

  const Back = () => {
    navigate("/table");
  };

  const headers = [
    { label: "No", key: "id" },
    { label: "IpAddr", key: "Ip_Addr" },
    { label: "First Name", key: "Firstname" },
    { label: "Last Name", key: "Lastname" },
    { label: "Email", key: "Email" },
    { label: "Tel", key: "Tel" },
    { label: "Usertype", key: "User_Type" },
    { label: "DeviceType", key: "Device_Type" },
    { label: "DeviceBrand", key: "Device_Brand" },
    { label: "DeviceName", key: "Device_Name" },
    { label: "StartDate", key: "Start_Date" },
    { label: "EndDate", key: "End_Date" },
    { label: "Date(Submit)", key: "Dates" },
    { label: "Time(Submit)", key: "Times" },
  ];

  const csvReport = {
    headers: headers,
    data: exMemberList,
    filename: `RequestList_${timeStamp}.csv`,
  };

  const toggle = () => {
    setIsOpen(!isOpen);
  };
  useEffect(() => {
    refreshToken();
    getUserAdmin();
    fetchData();
  }, []);

  return (
    <motion.div
      className="App3"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ delay: 0.1 }}
    >
      {window.innerWidth > 100 && window.innerWidth < 600 ? (
        <div
          className="left-manu3"
          style={{
            width: isOpen ? "25%" : "0%",
            marginRight: isOpen ? "10px" : "0px",
          }}
        >
          <div className="top-img3">
            <button
              className="icon-back2"
              onClick={() => {
                toggle();
              }}
              style={{
                left: isOpen ? "50px" : "10px",
                transform: isOpen ? "rotate(180deg)" : "rotate(0deg)",
              }}
            >
              <ArrowForwardIosIcon sx={{ fontSize: "20px", color: "white" }} />
            </button>

            <img
              className="logo-table3"
              src="img/LS-02.png"
              alt=""
              srcSet=""
              style={{ display: isOpen ? "block" : "none" }}
            />
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="ListIcon3"
              onClick={() => {
                Back();
              }}
              style={{ display: isOpen ? "block" : "none" }}
            >
              <ListIcon sx={{ fontSize: "32px", color: "#0174B3" }} />
            </motion.button>
          </div>
          <div className="bottom-img3">
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="icon3"
              onClick={() => {
                Logout();
              }}
              style={{ display: isOpen ? "block" : "none" }}
            >
              <LogoutOutlinedIcon
                className="icon-exit3"
                sx={{ fontSize: "40px", color: "white" }}
              />
            </motion.button>
          </div>
        </div>
      ) : (
        <TableSideBar />
      )}

      <div className="bg3" style={{ width: isOpen ? "75%" : "100%" }}>
        <div className="header-top3">
          <span className="left3">
            <h2 className="name3">Wi-Fi Request List</h2>
          </span>
          <span className="right3">
            {window.innerWidth > 100 && window.innerWidth < 600 ? (
              <div>
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  className="icon-create3"
                  onClick={() => {
                    gotoAdminSub();
                  }}
                >
                  <AddIcon sx={{ fontSize: "20px", color: "white" }} />
                </motion.button>
                <CSVLink {...csvReport}>
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    className="icon-export3"
                  >
                    <DownloadIcon sx={{ fontSize: "18px", color: "white" }} />
                  </motion.button>
                </CSVLink>
              </div>
            ) : (
              <div>
                <motion.input
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  type="button"
                  className="btn create3"
                  value="Create User"
                  onClick={() => {
                    gotoAdminSub();
                  }}
                />
                <CSVLink {...csvReport}>
                  <motion.input
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    type="button"
                    className="btn export3"
                    value="Export .csv"
                  />
                </CSVLink>
              </div>
            )}
          </span>
        </div>
        <div className="all-scroll">
          <div className="table-scroll">
            <Blogslist
              memberList={memberList}
              deleteMember={deleteMember}
              showUser={showUser}
              edituser={edituser}
              setExMemberList={setExMemberList}
            />
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default MyTable;
