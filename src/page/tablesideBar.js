import "./table.css";
import { useNavigate } from "react-router-dom";
import LogoutOutlinedIcon from "@mui/icons-material/LogoutOutlined";
import ListIcon from "@mui/icons-material/List";

const TableSideBar = () => {
  const navigate = useNavigate();

  const BtoLogin = () => {
    localStorage.removeItem("auth");
    navigate("/login");
  };

  const Back = () => {
    navigate("/table");
  };
 
  return (
    <div className="left-manu3">
      <div className="top-img3">
        {window.innerWidth > 601 && window.innerWidth < 1000 ? (
          <div>
            <img className="logo-table3" src="img/LS-02.png" alt="" srcSet="" />
          </div>
        ) : (
          <div className="box-intop">
            <img className="logo-table3" src="img/LS-01.png" alt="" srcSet="" />
            <button
              className="ListIcon3"
              onClick={() => {
                Back();
              }}
            >
              <ListIcon sx={{ fontSize: "32px", color: "white"}} />
            </button>
          </div>
        )}
      </div>
      <div className="bottom-img3">
        {window.innerWidth > 601 && window.innerWidth < 1000 ? (
          <div>
            <button
              className="ListIcon3"
              onClick={() => {
                Back();
              }}
            >
              <ListIcon sx={{ fontSize: "32px", color: "#0174B3" }} />
            </button>
            <button
              className="icon3"
              onClick={() => {
                BtoLogin();
              }}
            >
              <LogoutOutlinedIcon
                className="icon-exit3"
                sx={{ fontSize: "40px", color: "white" }}
              />
            </button>
          </div>
        ) : (
          <div>
            <button
              className="icon3"
              onClick={() => {
                BtoLogin();
              }}
            >
              <LogoutOutlinedIcon
                className="icon-exit3"
                sx={{ fontSize: "40px", color: "#0174B3" }}
              />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default TableSideBar;
