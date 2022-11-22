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

function Table() {
  const navigate = useNavigate();
  const [memberList, setMemberList] = useState([]);
  const [sortid, setsortid] = useState(true);
  const [sortDate, setsortDate] = useState(true);
  const [sortTime, setsortTime] = useState(true);
  const [sortFname, setsortFname] = useState(true);
  const [sortUser, setsortUser] = useState(true);
  const [sortStart, setsortStart] = useState(true);
  const [sortEnd, setsortEnd] = useState(true);
  console.log(memberList);
  // const [exMemberList, setExMemberList] = useState([]);

  // const getMember = () => {
  //   Axios.get("http://localhost:3002/getusers").then((response) => {
  //     setMemberList(response.data);
  //   });
  // };
  const chgSortId = () => {
    sortid === true
      ? memberList.sort((a, b) => (a.id < b.id ? 1 : -1))
      : memberList.sort((a, b) => (a.id > b.id ? 1 : -1));
  };
  const chgSortDate = () => {
    sortDate === true
      ? memberList.sort((a, b) => (a.Dates < b.Dates ? 1 : -1))
      : memberList.sort((a, b) => (a.Dates > b.Dates ? 1 : -1));
  };
  const chgSortTime = () => {
    sortTime === true
      ? memberList.sort((a, b) => (a.Times < b.Times ? 1 : -1))
      : memberList.sort((a, b) => (a.Times > b.Times ? 1 : -1));
  };
  const chgSortFname = () => {
    sortFname === true
      ? memberList.sort((a, b) => (a.Firstname < b.Firstname ? 1 : -1))
      : memberList.sort((a, b) => (a.Firstname > b.Firstname ? 1 : -1));
  };
  const chgSortUser = () => {
    sortUser === true
      ? memberList.sort((a, b) => (a.User_Type < b.User_Type ? 1 : -1))
      : memberList.sort((a, b) => (a.User_Type > b.User_Type ? 1 : -1));
  };
  const chgSortStart = () => {
    sortStart === true
      ? memberList.sort((a, b) => (a.Start_Date < b.Start_Date ? 1 : -1))
      : memberList.sort((a, b) => (a.Start_Date > b.Start_Date ? 1 : -1));
  };
  const chgSortEnd = () => {
    sortEnd === true
      ? memberList.sort((a, b) => (a.End_Date < b.End_Date ? 1 : -1))
      : memberList.sort((a, b) => (a.End_Date > b.End_Date ? 1 : -1));
  };

  const fetchData = async () => {
    const getUser = await Axios.get("http://localhost:3002/getusers");
    setMemberList(getUser.data);

    // let dataBox = memberList;
    // let dataList = [];

    // dataBox.forEach((item) => {
    //   dataList.push({
    //     Firstname: item.Firstname.toString(),
    //     Lastname: item.Lastname.toString(),
    //     Email: item.Email.toString(),
    //     Tel: item.Tel+"''",
    //     User_Type: item.User_Type.toString(),
    //     Device_Type: item.Device_Type.toString(),
    //     Device_Brand: item.Device_Brand.toString(),
    //     Device_Name: item.Device_Name.toString(),
    //     Start_Date: item.Start_Date.toString(),
    //     End_Date: item.End_Date.toString(),
    //   });
    // });
    // console.log(dataList[0]);
    // setExMemberList(dataList[0]);
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

  const auth = () => {
    const checkUser = localStorage.getItem("auth");
    if (checkUser !== "adminLogin") {
      navigate("/login");
    }
  };

  const BtoLogin = () => {
    localStorage.removeItem("auth");
    navigate("/login");
  };

  const headers = [
    { label: "No", key: "id" },
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
    { label: "Date", key: "Dates" },
    { label: "Time", key: "Times" },
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
  const Back = () => {
    navigate("/table");
  };

  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => {
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    auth();
    fetchData();
    // getMember();
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
              style={{ left: isOpen ? "50px" : "10px" }}
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
            <button
              className="ListIcon3"
              onClick={() => {
                Back();
              }}
              style={{ display: isOpen ? "block" : "none" }}
            >
              <ListIcon sx={{ fontSize: "32px", color: "#0174B3" }} />
            </button>
          </div>
          <div className="bottom-img3">
            <button
              className="icon3"
              onClick={() => {
                BtoLogin();
              }}
              style={{ display: isOpen ? "block" : "none" }}
            >
              <LogoutOutlinedIcon
                className="icon-exit3"
                sx={{ fontSize: "40px", color: "white" }}
              />
            </button>
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
                <button
                  className="icon-create3"
                  onClick={() => {
                    gotoAdminSub();
                  }}
                >
                  <AddIcon sx={{ fontSize: "20px", color: "white" }} />
                </button>
                <CSVLink {...csvReport} dataType="string">
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
                  onClick={() => {
                    gotoAdminSub();
                  }}
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
            <p
              className="head-data3"
              onClick={() => {
                setsortid(!sortid);
                chgSortId();
              }}
            >
              No
            </p>
            <p
              className="head-data3"
              onClick={() => {
                setsortDate(!sortDate);
                chgSortDate();
              }}
            >
              Date
            </p>
            <p
              className="head-data3"
              onClick={() => {
                setsortTime(!sortTime);
                chgSortTime();
              }}
            >
              Time
            </p>
            <p
              className="head-data3"
              onClick={() => {
                setsortFname(!sortFname);
                chgSortFname();
              }}
            >
              Firstname
            </p>
            <p className="head-data3 lname">Lastname</p>
            <p
              className="head-data3"
              onClick={() => {
                setsortUser(!sortUser);
                chgSortUser();
              }}
            >
              User Type
            </p>
            <p
              className="head-data3"
              onClick={() => {
                setsortStart(!sortStart);
                chgSortStart();
              }}
            >
              Start Date
            </p>
            <p
              className="head-data3"
              onClick={() => {
                setsortEnd(!sortEnd);
                chgSortEnd();
              }}
            >
              End Date
            </p>
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
    </motion.div>
  );
}

export default Table;
