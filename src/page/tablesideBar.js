import "./table.css";
import { useNavigate } from "react-router-dom";
import LogoutOutlinedIcon from "@mui/icons-material/LogoutOutlined";
import ListIcon from "@mui/icons-material/List";
import { motion } from "framer-motion";

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
            <motion.button
              whileHover={{ scale: 1.1}}
              whileTap={{ scale: 0.9 }}
              className="ListIcon3"
              onClick={() => {
                Back();
              }}
            >
              <ListIcon sx={{ fontSize: "32px", color: "white" }} />
            </motion.button>
          </div>
        )}
      </div>
      <div className="bottom-img3">
        {window.innerWidth > 601 && window.innerWidth < 1000 ? (
          <div>
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="ListIcon3"
              onClick={() => {
                Back();
              }}
            >
              <ListIcon sx={{ fontSize: "32px", color: "#0174B3" }} />
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="icon3"
              onClick={() => {
                BtoLogin();
              }}
            >
              <LogoutOutlinedIcon
                className="icon-exit3"
                sx={{ fontSize: "40px", color: "white" }}
              />
            </motion.button>
          </div>
        ) : (
          <div>
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="icon3"
              onClick={() => {
                BtoLogin();
              }}
            >
              <LogoutOutlinedIcon
                className="icon-exit3"
                sx={{ fontSize: "40px", color: "#0174B3" }}
              />
            </motion.button>
          </div>
        )}
      </div>
    </div>
  );
};

export default TableSideBar;
