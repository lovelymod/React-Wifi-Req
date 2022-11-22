import "./showdata.css";
import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import LogoutOutlinedIcon from "@mui/icons-material/LogoutOutlined";
import { motion } from "framer-motion";

function ShowData() {
  const navigate = useNavigate();
  const location = useLocation();
  const showNewMember = location.state.newMemberList;
  // const [memberList, setMemberList] = useState(showNewMember);
  const [Labelhide, setLabelhide] = useState("");

  const onFirstCheckEnd = () => {
    if (!showNewMember[0].enddate) {
      setLabelhide("hidden");
    } else {
      setLabelhide("");
    }
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

  const Back = () => {
    navigate("/table");
  };

  const edituser = (id) => {
    const newMemberList = showNewMember.filter((val) => val.id === id);
    navigate("/edituser", { state: { newMemberList } });
  };

  useEffect(() => {
    auth();
    onFirstCheckEnd();
  }, []);

  return (
    <motion.div
      className="App5"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ delay: 0.1 }}

    >
      <div className="left-manu5">
        <div className="top-img5">
          {window.innerWidth > 100 && window.innerWidth < 1000 ? (
            <div>
              <img
                className="logo-table5"
                src="img/LS-02.png"
                alt=""
                srcSet=""
              />
            </div>
          ) : (
            <div>
              <img
                className="logo-table5"
                src="img/LS-01.png"
                alt=""
                srcSet=""
              />
            </div>
          )}
        </div>
        <div className="bottom-img5">
          {window.innerWidth > 601 && window.innerWidth < 1000 ? (
            <div>
              <button
                className="icon5"
                onClick={() => {
                  BtoLogin();
                }}
              >
                <LogoutOutlinedIcon
                  className="icon-exit5"
                  sx={{ fontSize: "40px", color: "white" }}
                />
              </button>
            </div>
          ) : (
            <div>
              <button
                className="icon5"
                onClick={() => {
                  BtoLogin();
                }}
              >
                <LogoutOutlinedIcon
                  className="icon-exit5"
                  sx={{ fontSize: "40px", color: "#0174B3" }}
                />
              </button>
            </div>
          )}
        </div>
      </div>
      <div className="bg5">
        <span className="right5">
          <div className="headerInfo5">
            {window.innerWidth > 100 && window.innerWidth < 1000 ? (
              <div className="box55">
                <button
                  className="backbutt5"
                  onClick={() => {
                    Back();
                  }}
                >
                  {
                    <ArrowBackIosIcon
                      sx={{ fontSize: "28px", color: "#0174B3" }}
                    />
                  }{" "}
                </button>
                <h1>User Information</h1>
              </div>
            ) : (
              <div className="box55">
                <button
                  className="backbutt5"
                  onClick={() => {
                    Back();
                  }}
                >
                  {
                    <ArrowBackIosIcon
                      sx={{ fontSize: "28px", color: "#FFB401" }}
                    />
                  }{" "}
                </button>
                <h1>User Information</h1>
              </div>
            )}

            <p className="headerMsg5">Wi-Fi Request List/User Information</p>
          </div>
          <div className="showcontain5">
            {showNewMember.map((val, key) => {
              return (
                <div className="contain-data5">
                  <div className="row-data5">
                    <span className="splitcontain5">
                      <h1 className="label-data5">Firstname:</h1>
                      <p className="data5">{val.firstname}</p>
                    </span>

                    <span className="splitcontain5">
                      <h1 className="label-data5">Lastname:</h1>
                      <p className="data5">{val.lastname}</p>
                    </span>
                  </div>
                  <div className="row-data5">
                    <span className="splitcontain5">
                      <h1 className="label-data5">Email:</h1>
                      <p className="data5">{val.email}</p>
                    </span>

                    <span className="splitcontain5">
                      <h1 className="label-data5">Tel:</h1>
                      <p className="data5">{val.tel}</p>
                    </span>
                  </div>
                  <div className="row-data5">
                    <span className="splitcontain5">
                      <h1 className="label-data5">User Type:</h1>
                      <p className="data5">{val.usertype}</p>
                    </span>

                    <span className="splitcontain5">
                      <h1 className="label-data5">Device Type:</h1>
                      <p className="data5">{val.dtype}</p>
                    </span>
                  </div>
                  <div className="row-data5">
                    <span className="splitcontain5">
                      <h1 className="label-data5">Device Brand:</h1>
                      <p className="data5">{val.dbrand}</p>
                    </span>

                    <span className="splitcontain5">
                      <h1 className="label-data5">Device name:</h1>
                      <p className="data5">{val.dname}</p>
                    </span>
                  </div>
                  <div className="row-data5">
                    <span className="splitcontain5">
                      <h1 className="label-data5">Start Date:</h1>
                      <p className="data5">{val.startdate}</p>
                    </span>

                    <span className="splitcontain5" hidden={Labelhide}>
                      <h1 className="label-data5">End Date:</h1>
                      <p className="data5">{val.enddate}</p>
                    </span>
                  </div>
                  <div className="row-data5">
                    <span className="splitcontain5">
                      <h1 className="label-data5">Remark:</h1>
                      <p className="data5">{val.remark}</p>
                    </span>
                  </div>
                  <div className="row-butt5">
                    <button
                      className="btn edit-butt-sw5"
                      onClick={() => {
                        edituser(val.id);
                      }}
                    >
                      Edit
                    </button>
                    <div className="emtpy-box5"></div>
                    <button className="btn del-butt-sw5">Delete</button>
                  </div>
                </div>
              );
            })}
          </div>
        </span>
      </div>
    </motion.div>
  );
}

export default ShowData;
