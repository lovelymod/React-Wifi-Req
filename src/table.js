import "./table.css";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Axios from "axios";
import Blogslist from "./blogslist";
import { CSVLink } from "react-csv";
import LogoutOutlinedIcon from "@mui/icons-material/LogoutOutlined";

function Table() {
  const [memberList, setMemberList] = useState([]);
  const navigate = useNavigate();

  const getMember = () => {
    Axios.get("http://localhost:3001/member").then((response) => {
      setMemberList(response.data);
    });
  };

  const deleteMember = (id) => {
    const newMemberList = memberList.filter((val) => val.id !== id);
    setMemberList(newMemberList);
  };

  const edituser = (id) => {
    const newMemberList = memberList.filter((val) => val.id === id);
    navigate("/edituser", { state: { newMemberList } });
  }

  const showUser = (id) => {
    const newMemberList = memberList.filter((val) => val.id === id);
    navigate("/showdata", { state: { newMemberList } });
  };

  const BtoLogin = () => {
    navigate("/login");
  };

  const headers = [
    { label: "No", key: "id" },
    { label: "First Name", key: "firstname" },
    { label: "Last Name", key: "lastname" },
    { label: "Usertype", key: "usertype" },
    { label: "Tel", key: "tel" },
    { label: "Email", key: "email" },
    { label: "DeviceType", key: "devicetype" },
    { label: "DeviceBrand", key: "devicebrand" },
    { label: "DeviceName", key: "devicename" },
    { label: "StartDate", key: "startdate" },
    { label: "EndDate", key: "enddate" },
    { label: "Date", key: "date" },
    { label: "Time", key: "time" },
  ];

  const csvReport = {
    headers: headers,
    data: memberList,
    filename: "CSV_MemberList.csv",
  };

  const gotoAdminSub = () => {
    navigate("/adminsubmit");
  };

  useEffect(() => {
    getMember();
  }, []);

  return (
    <div className="App3">
      <div className="left-manu">
        <div className="top-img">
          <img className="logo-table" src="img/LS-02.png" alt="" srcSet="" />
        </div>
        <div className="bottom-img">
          <button className="icon" onClick={BtoLogin}>
            <LogoutOutlinedIcon sx={{ fontSize: "40px", color: "#0174B3" }} />
          </button>
        </div>
      </div>
      <div className="bg3">
        <div className="header-top">
          <span className="left">
            <h2 className="name">Wi-fi Request List</h2>
          </span>
          <span className="right">
            <input
              type="button"
              className="btn create"
              value="Create User"
              onClick={gotoAdminSub}
            />
            <CSVLink {...csvReport}>
              <input type="button" className="btn export" value="Export .csv" />
            </CSVLink>
          </span>
        </div>

        <div className="head-table">
          <p className="head-data">No</p>
          <p className="head-data">Date</p>
          <p className="head-data">Time</p>
          <p className="head-data">Name</p>
          <p className="head-data">Lastname</p>
          <p className="head-data">User Type</p>
          <p className="head-data">Start Date</p>
          <p className="head-data">End Date</p>
          <p className="head-empty"></p>
        </div>
        <hr />

        <Blogslist
          memberList={memberList}
          deleteMember={deleteMember}
          showUser={showUser}
          edituser={edituser}
        />
      </div>
    </div>
  );
}

export default Table;
