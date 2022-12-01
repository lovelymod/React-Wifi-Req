import "./table.css";
import { useNavigate } from "react-router-dom";
import LogoutOutlinedIcon from "@mui/icons-material/LogoutOutlined";
import ListIcon from "@mui/icons-material/List";
import { motion } from "framer-motion";
import Axios from "axios";

const TableSideBar = () => {
  const navigate = useNavigate();
  const Back = () => navigate("/table");

  const Logout = async () => {
    try {
      await Axios.delete("http://localhost:5000/logout");
      localStorage.clear();
      navigate("/login");
    } catch (error) {
      console.log(error);
    }
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
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="ListIcon3"
              onClick={() => Back()}
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
              onClick={() => Back()}
            >
              <ListIcon sx={{ fontSize: "32px", color: "#0174B3" }} />
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="icon3"
              onClick={() => Logout()}
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
              onClick={() => Logout()}
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
