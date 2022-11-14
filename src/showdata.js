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
  return (
    <div className="App4">
      <div className="bg4">
        <span className="left2">
          <button className="btn backbutt2" onClick={Back}>
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
        <span className="right2">
          <div className="headerInfo">
            <h1>User Information</h1>
          </div>
          <hr />
          <div className="showcontain">
            <span className="contain-left">
              {showNewMember.map((val, key) => {
                return (
                  <div className="contain-data">
                    <div className="row-data">
                      <h2 className="label-data">Firstname:</h2>
                      <h2 className="data">{val.firstname}</h2>
                    </div>
                    <div className="row-data">
                      <h2 className="label-data">User Type:</h2>
                      <h2 className="data">{val.usertype}</h2>
                    </div>
                    <div className="row-data">
                      <h2 className="label-data">Email:</h2>
                      <h2 className="data">{val.email}</h2>
                    </div>
                    <div className="row-data">
                      <h2 className="label-data">Device Brand:</h2>
                      <h2 className="data">{val.dbrand}</h2>
                    </div>
                    <div className="row-data">
                      <h2 className="label-data">Start Date:</h2>
                      <h2 className="data">{val.startdate}</h2>
                    </div>
                    <div className="row-data">
                      <h2 className="label-data">Remark:</h2>
                      <h2 className="data">{val.remark}</h2>
                    </div>
                  </div>
                );
              })}
            </span>
            <span className="contain-right">
              {showNewMember.map((val, key) => {
                return (
                  <div className="contain-data">
                    <div className="row-data">
                      <h2 className="label-data">Lastname:</h2>
                      <h2 className="data">{val.lastname}</h2>
                    </div>
                    <div className="row-data">
                      <h2 className="label-data">Tel:</h2>
                      <h2 className="data">{val.tel}</h2>
                    </div>
                    <div className="row-data">
                      <h2 className="label-data">Device Type:</h2>
                      <h2 className="data">{val.dtype}</h2>
                    </div>
                    <div className="row-data">
                      <h2 className="label-data">Device name:</h2>
                      <h2 className="data">{val.dname}</h2>
                    </div>
                    <div className="row-data">
                      <h2 className="label-data">End Date:</h2>
                      <h2 className="data">{val.enddate}</h2>
                    </div>
                    <div className="row-data">
                    </div>
                    <div className="row-butt">
                      <button className="btn edit-butt-sw">Edit</button>
                      <div className="emtpy-box"></div>
                      <button className="btn edit-butt-sw">Delete</button>
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
