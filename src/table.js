import "./table.css";
import { useState, useEffect } from "react";
import { useNavigate,useLocation } from "react-router-dom";
import moment from "moment";
import Axios from "axios";
import Blogslist from "./blogslist";
import { CSVLink } from "react-csv";
import LogoutOutlinedIcon from "@mui/icons-material/LogoutOutlined";
import AddIcon from "@mui/icons-material/Add";
import DownloadIcon from "@mui/icons-material/Download";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import Swal from "sweetalert2";

function Table() {
  const navigate = useNavigate();
  const location = useLocation();
  const [memberList, setMemberList] = useState([]);

  // const fetchData = () => {
  //   let dataBox = memberList;
  //   let dataList = [];

  //   dataBox.forEach((item) => {
  //     dataList.push({
  //       firstname: dataBox.firstname.toString(),
  //       lastname: dataBox.lastname.toString(),
  //       email: dataBox.email.toString(),
  //       tel: "0821838216",
  //       usertype: dataBox.usertype.toString(),
  //       devicetype: dataBox.devicetype.toString(),
  //       devicebrand: dataBox.devicebrand.toString(),
  //       devicename: dataBox.devicename.toString(),
  //       startdate: dataBox.startdate.toString(),
  //       enddate: dataBox.enddate.toString(),
  //     });
  //   });

  //   setMemberList(dataList);
  // };


  const getMember = () => {
    Axios.get("http://localhost:3001/member").then((response) => {
      setMemberList(response.data);
    });
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
        Swal.fire("Deleted!", "success");
      }
    });
  };

  const edituser = (id) => {
    const newMemberList = memberList.filter((val) => val.id === id);
    navigate("/edituser", { state: { newMemberList } });
  };

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
    { label: "Email", key: "email" },
    { label: "Tel", key: "tel" },
    { label: "Usertype", key: "usertype" },
    { label: "DeviceType", key: "dtype" },
    { label: "DeviceBrand", key: "dbrand" },
    { label: "DeviceName", key: "dname" },
    { label: "StartDate", key: "startdate" },
    { label: "EndDate", key: "enddate" },
    { label: "Date", key: "date" },
    { label: "Time", key: "time" },
  ];

  const timeStamp = moment().format("YYYY_MM_DD");

  const csvReport = {
    headers: headers,
    data: memberList,
    filename: `RequestList_${timeStamp}.csv`,
  };

  const gotoAdminSub = () => {
    navigate("/adminsubmit");
  };

  
  useEffect(() => {
    getMember();
    // fetchData();
  }, []);

  console.log(memberList);

  return (
    <div className="App3">
      <div className="left-manu3">
        <div className="top-img3">
          {window.innerWidth > 601 && window.innerWidth < 1000 ? (
            <div>
              <img
                className="logo-table3"
                src="img/LS-02.png"
                alt=""
                srcSet=""
              />
            </div>
          ) : (
            <div>
              <img
                className="logo-table3"
                src="img/LS-01.png"
                alt=""
                srcSet=""
              />
            </div>
          )}
        </div>
        <div className="bottom-img3">
          {window.innerWidth > 601 && window.innerWidth < 1000 ? (
            <div>
              <button className="icon3" onClick={BtoLogin}>
                <LogoutOutlinedIcon
                  className="icon-exit3"
                  sx={{ fontSize: "40px", color: "white" }}
                />
              </button>
            </div>
          ) : (
            <div>
              <button className="icon3" onClick={BtoLogin}>
                <LogoutOutlinedIcon
                  className="icon-exit3"
                  sx={{ fontSize: "40px", color: "#0174B3" }}
                />
              </button>
            </div>
          )}
        </div>
      </div>
      <div className="bg3">
        <div className="header-top3">
          <span className="left3">
            {window.innerWidth > 100 && window.innerWidth < 600 ? (
              <div>
                <button className="icon-back2">
                  <ArrowForwardIosIcon
                    sx={{ fontSize: "20px", color: "white" }}
                  />
                </button>
              </div>
            ) : (
              <div></div>
            )}
            <h2 className="name3">Wi-Fi Request List</h2>
          </span>
          <span className="right3">
            {window.innerWidth > 100 && window.innerWidth < 600 ? (
              <div>
                <button className="icon-create3" onClick={gotoAdminSub}>
                  <AddIcon sx={{ fontSize: "20px", color: "white" }} />
                </button>
                <CSVLink {...csvReport}>
                  <button className="icon-export3">
                    <DownloadIcon sx={{ fontSize: "18px", color: "white" }} />
                  </button>
                </CSVLink>
              </div>
            ) : (
              <div>
                <input
                  type="button"
                  className="btn create3"
                  value="Create User"
                  onClick={gotoAdminSub}
                />
                <CSVLink {...csvReport}>
                  <input
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
          <div className="head-table3">
            <p className="head-data3">No</p>
            <p className="head-data3">Date</p>
            <p className="head-data3">Time</p>
            <p className="head-data3">Name</p>
            <p className="head-data3">Lastname</p>
            <p className="head-data3">User Type</p>
            <p className="head-data3">Start Date</p>
            <p className="head-data3">End Date</p>
            <p className="head-empty3"></p>
          </div>
          <hr className="top-table" />
          <div className="table-scroll">
            <Blogslist
              memberList={memberList}
              deleteMember={deleteMember}
              showUser={showUser}
              edituser={edituser}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Table;
