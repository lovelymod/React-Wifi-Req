import "../style/showdata.css";
import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import Axios from "axios";
import Swal from "sweetalert2";
import { motion } from "framer-motion";
import Cookies from "js-cookie";
import axios from "axios";
import SideBar from "../components/sideBar";

function ShowData() {
  const navigate = useNavigate();
  const location = useLocation();
  const showNewMember = location.state.newMemberList;
  console.log(
    "🚀 ~ file: showdata.js:16 ~ ShowData ~ showNewMember",
    showNewMember
  );
  const [Labelhide, setLabelhide] = useState("");

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

  const onFirstCheckEnd = () => {
    if (!showNewMember[0].End_Date) {
      setLabelhide("hidden");
    } else {
      setLabelhide("");
    }
  };

  const Back = () => navigate("/table");

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

  const edituser = (id) => {
    const newMemberList = showNewMember.filter((val) => val.id === id);
    navigate("/edituser", { state: { newMemberList } });
  };

  useEffect(() => {
    refreshToken();
    onFirstCheckEnd();
  }, []);

  return (
    <div className="App5">
      <SideBar Back={Back} Logout={Logout} />
      <div className="bg5">
        <span className="right5">
          <div className="headerInfo5">
            {window.innerWidth > 100 && window.innerWidth < 1000 ? (
              <div className="box55">
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  className="backbutt5"
                  onClick={() => Back()}
                >
                  {
                    <ArrowBackIosIcon
                      sx={{ fontSize: "32px", color: "#0174B3" }}
                    />
                  }{" "}
                </motion.button>
                <p className="afterButt5">User Information</p>
              </div>
            ) : (
              <div className="box55">
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  className="backbutt5"
                  onClick={() => Back()}
                >
                  {
                    <ArrowBackIosIcon
                      sx={{ fontSize: "32px", color: "#FFB401" }}
                    />
                  }{" "}
                </motion.button>
                <p className="afterButt5">User Information</p>
              </div>
            )}
            <div className="row-nameButt4">
              <button className="nameButt4" onClick={() => Back()}>
                <p className="message4">Wi-Fi Request List</p>
              </button>
              <p className="message4-back">/User Information</p>
            </div>
          </div>
          <div className="showcontain5">
            {showNewMember.map((val, key) => {
              return (
                <div className="contain-data5" key={val.id}>
                  <div className="row-data5">
                    <span className="splitcontain5">
                      <h1 className="label-data5">IP Address:</h1>
                      <p className="data5">
                        {val.Ip_Addr === "" || val.Ip_Addr === null
                          ? "-"
                          : val.Ip_Addr}
                      </p>
                    </span>
                  </div>
                  <div className="row-data5">
                    <span className="splitcontain5">
                      <h1 className="label-data5">Firstname:</h1>
                      <p className="data5">{val.Firstname}</p>
                    </span>

                    <span className="splitcontain5">
                      <h1 className="label-data5">Lastname:</h1>
                      <p className="data5">{val.Lastname}</p>
                    </span>
                  </div>
                  <div className="row-data5">
                    <span className="splitcontain5">
                      <h1 className="label-data5">Email:</h1>
                      <p className="data5">{val.Email}</p>
                    </span>

                    <span className="splitcontain5">
                      <h1 className="label-data5">Tel:</h1>
                      <p className="data5">{val.Tel}</p>
                    </span>
                  </div>
                  <div className="row-data5">
                    <span className="splitcontain5">
                      <h1 className="label-data5">User Type:</h1>
                      <p className="data5">{val.User_Type}</p>
                    </span>

                    <span className="splitcontain5">
                      <h1 className="label-data5">Device Type:</h1>
                      <p className="data5">{val.Device_Type}</p>
                    </span>
                  </div>
                  <div className="row-data5">
                    <span className="splitcontain5">
                      <h1 className="label-data5">Device Brand:</h1>
                      <p className="data5">{val.Device_Brand}</p>
                    </span>

                    <span className="splitcontain5">
                      <h1 className="label-data5">Device name:</h1>
                      <p className="data5">{val.Device_Name}</p>
                    </span>
                  </div>
                  <div className="row-data5">
                    <span className="splitcontain5">
                      <h1 className="label-data5">Start Date:</h1>
                      <p className="data5">{val.Start_Date}</p>
                    </span>

                    <span className="splitcontain5" hidden={Labelhide}>
                      <h1 className="label-data5">End Date:</h1>
                      <p className="data5">{val.End_Date}</p>
                    </span>
                  </div>
                  <div className="row-data5">
                    <span className="splitcontain5">
                      <h1 className="label-data5">Remark:</h1>
                      <p className="data5">{val.Remark ? val.Remark : "-"}</p>
                    </span>
                  </div>
                  <div className="row-butt5">
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      className="btn edit-butt-sw5"
                      onClick={() => edituser(val.id)}
                    >
                      Edit
                    </motion.button>
                    <div className="emtpy-box5"></div>
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      className="btn del-butt-sw5"
                      onClick={() => DeleteUser(val.id)}
                    >
                      Delete
                    </motion.button>
                  </div>
                </div>
              );
            })}
          </div>
        </span>
      </div>
    </div>
  );
}

export default ShowData;
