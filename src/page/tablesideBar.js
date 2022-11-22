import "./table.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import LogoutOutlinedIcon from "@mui/icons-material/LogoutOutlined";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";


const TableSideBar = () => {
  const navigate = useNavigate();

  const BtoLogin = () => {
    localStorage.removeItem("auth");
    navigate("/login");
  };

  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => {
    setIsOpen(!isOpen);
  };
  return (
    <div className="left-manu3">
      <div className="top-img3">
        {window.innerWidth > 100 && window.innerWidth < 600 ? (
          <div>
            <button
              className="icon-back2"
              onClick={() => {
                toggle();
              }}
            >
              <ArrowForwardIosIcon sx={{ fontSize: "20px", color: "white" }} />
            </button>
          </div>
        ) : (
          <div></div>
        )}
        {window.innerWidth > 601 && window.innerWidth < 1000 ? (
          <div>
            <img className="logo-table3" src="img/LS-02.png" alt="" srcSet="" />
          </div>
        ) : (
          <div>
            <img className="logo-table3" src="img/LS-01.png" alt="" srcSet="" />
          </div>
        )}
      </div>
      <div className="bottom-img3">
        {window.innerWidth > 601 && window.innerWidth < 1000 ? (
          <div>
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
