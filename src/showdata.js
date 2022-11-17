import "./showdata.css";
import { useLocation, useNavigate } from "react-router-dom";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";

function ShowData() {
  const navigate = useNavigate();
  const location = useLocation();
  const showNewMember = location.state.newMemberList;

  const Back = () => {
    navigate("/table");
  };


  const edituser = (id) => {
    const newMemberList = showNewMember.filter((val) => val.id === id);
    navigate("/edituser", { state: { newMemberList }});
  }

  return (
    <div className="App5">
      <div className="left-manu5">
        <div className="top-img5">
          <img className="logo-table5" src="img/LS-02.png" alt="" srcSet="" />
        </div>
        <div className="bottom-img5">
          {/* <button className="icon" onClick={BtoLogin}>
            <LogoutOutlinedIcon sx={{ fontSize: "40px", color: "#0174B3" }} />
          </button> */}
        </div>
      </div>
      <div className="bg5">
        <span className="left5">
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
        </span>
        <span className="right5">
          <div className="headerInfo5">
            <h1>User Information</h1>
          </div>
          <hr />
          <div className="showcontain5">
            <span className="contain-left5">
              {showNewMember.map((val, key) => {
                return (
                  <div className="contain-data5">
                    <div className="row-data5">
                      <h2 className="label-data5">Firstname:</h2>
                      <h2 className="data5">{val.firstname}</h2>
                    </div>
                    <div className="row-data5">
                      <h2 className="label-data5">User Type:</h2>
                      <h2 className="data5">{val.usertype}</h2>
                    </div>
                    <div className="row-data5">
                      <h2 className="label-data5">Email:</h2>
                      <h2 className="data5">{val.email}</h2>
                    </div>
                    <div className="row-data5">
                      <h2 className="label-data5">Device Brand:</h2>
                      <h2 className="data5">{val.dbrand}</h2>
                    </div>
                    <div className="row-data5">
                      <h2 className="label-data5">Start Date:</h2>
                      <h2 className="data5">{val.startdate}</h2>
                    </div>
                    <div className="row-data5">
                      <h2 className="label-data5">Remark:</h2>
                      <h2 className="data5">{val.remark}</h2>
                    </div>
                  </div>
                );
              })}
            </span>
            <span className="contain-right5">
              {showNewMember.map((val, key) => {
                return (
                  <div className="contain-data5">
                    <div className="row-data5">
                      <h2 className="label-data5">Lastname:</h2>
                      <h2 className="data5">{val.lastname}</h2>
                    </div>
                    <div className="row-data5">
                      <h2 className="label-data5">Tel:</h2>
                      <h2 className="data5">{val.tel}</h2>
                    </div>
                    <div className="row-data5">
                      <h2 className="label-data5">Device Type:</h2>
                      <h2 className="data5">{val.dtype}</h2>
                    </div>
                    <div className="row-data5">
                      <h2 className="label-data5">Device name:</h2>
                      <h2 className="data5">{val.dname}</h2>
                    </div>
                    <div className="row-data5">
                      <h2 className="label-data5">End Date:</h2>
                      <h2 className="data5">{val.enddate}</h2>
                    </div>
                    <div className="row-data5">
                    </div>
                    <div className="row-butt5">
                      <button className="btn edit-butt-sw5" onClick={() => {edituser(val.id)}}>Edit</button>
                      <div className="emtpy-box5"></div>
                      <button className="btn edit-butt-sw5">Delete</button>
                    </div>
                  </div>
                );
              })}
            </span>
          </div>
        </span>
      </div>
    </div>
  );
}

export default ShowData;
