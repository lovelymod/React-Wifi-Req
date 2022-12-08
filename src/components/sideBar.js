import { motion } from "framer-motion";
import LogoutOutlinedIcon from "@mui/icons-material/LogoutOutlined";
import ListIcon from "@mui/icons-material/List";

const SideBar = ({ Back, Logout }) => {
  return (
    <div className="imagesAdmin4">
      <div className="boxtop4">
        {window.innerWidth > 100 && window.innerWidth < 1000 ? (
          <div>
            <img className="logoAdmin4" src="img/LS-02.png" alt="" srcSet="" />
          </div>
        ) : (
          <div className="box-intop">
            <img className="logoAdmin4" src="img/LS-01.png" alt="" srcSet="" />
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="ListIcon4"
              onClick={() => Back()}
            >
              <ListIcon sx={{ fontSize: "32px", color: "white" }} />
            </motion.button>
          </div>
        )}
      </div>
      <div className="boxbottom4">
        {window.innerWidth > 601 && window.innerWidth < 1000 ? (
          <div>
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="ListIcon4"
              onClick={() => Back()}
            >
              <ListIcon sx={{ fontSize: "32px", color: "#0174B3" }} />
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="icon4"
              onClick={() => Logout()}
            >
              <LogoutOutlinedIcon
                className="icon-exit4"
                sx={{ fontSize: "40px", color: "white" }}
              />
            </motion.button>
          </div>
        ) : (
          <div>
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="icon4"
              onClick={() => Logout()}
            >
              <LogoutOutlinedIcon
                className="icon-exit4"
                style={{ fontSize: "40px", color: "#0174B3" }}
              />
            </motion.button>
          </div>
        )}
      </div>
    </div>
  );
};

export default SideBar;
