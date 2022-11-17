import "./showdata.css";
import { useLocation, useNavigate } from "react-router-dom";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import LogoutOutlinedIcon from "@mui/icons-material/LogoutOutlined";

function ShowData() {
  const navigate = useNavigate();
  const location = useLocation();
  const showNewMember = location.state.newMemberList;

  const Back = () => {
    navigate("/table");
  };
  const BtoLogin = () => {
    navigate("/login");
  };

  const edituser = (id) => {
    const newMemberList = showNewMember.filter((val) => val.id === id);
    navigate("/edituser", { state: { newMemberList } });
  };

  return (
    <div className="App5">
      <div className="left-manu5">
        <div className="top-img5">
          {window.innerWidth > 601 && window.innerWidth < 1000 ? (
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
              <button className="icon5" onClick={BtoLogin}>
                <LogoutOutlinedIcon
                  className="icon-exit5"
                  sx={{ fontSize: "40px", color: "white" }}
                />
              </button>
            </div>
          ) : (
            <div>
              <button className="icon5" onClick={BtoLogin}>
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
        {/* <span className="left5">
          <button className="btn backbutt5" onClick={Back}>
            {
              <ArrowBackIosIcon
                sx={{
                  color: "#FFB401",
                }}
              />
            }{" "}
            Show
          </button>
        </span> */}
        <span className="right5">
          <div className="headerInfo5">
            {window.innerWidth > 601 && window.innerWidth < 1000 ? (
              <div>
                <button className="backbutt5" onClick={Back}>
                  {
                    <ArrowBackIosIcon
                      sx={{ fontSize: "28px", color: "#0174B3" }}
                    />
                  }{" "}
                  <h1>User Information</h1>
                </button>
              </div>
            ) : (
              <div>
                <button className="backbutt5" onClick={Back}>
                  {
                    <ArrowBackIosIcon
                      sx={{ fontSize: "28px", color: "#FFB401" }}
                    />
                  }{" "}
                  <h1>User Information</h1>
                </button>
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

                    <span className="splitcontain5">
                      <h1 className="label-data5">End Date:</h1>
                      <p className="data5">{val.enddate}</p>
                    </span>
                  </div>
                  <div className="row-data5">
                    <h1 className="label-data5">Remark:</h1>
                    <p className="data5">{val.remark}</p>
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

            {/* <span className="contain-right5">
              {showNewMember.map((val, key) => {
                return (
                  <div className="contain-data5">
                    <div className="row-data5">
                      <p className="label-data5">Lastname:</p>
                      <p className="data5">{val.lastname}</p>
                    </div>
                    <div className="row-data5">
                      <p className="label-data5">Tel:</p>
                      <p className="data5">{val.tel}</p>
                    </div>
                    <div className="row-data5">
                      <p className="label-data5">Device Type:</p>
                      <p className="data5">{val.dtype}</p>
                    </div>
                    <div className="row-data5">
                      <p className="label-data5">Device name:</p>
                      <p className="data5">{val.dname}</p>
                    </div>
                    <div className="row-data5">
                      <p className="label-data5">End Date:</p>
                      <p className="data5">{val.enddate}</p>
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
                      <button className="btn edit-butt-sw5">Delete</button>
                    </div>
                  </div>
                );
              })}
            </span> */}
          </div>
        </span>
      </div>
    </div>
  );
}

export default ShowData;
