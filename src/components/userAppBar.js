import {
  AppBar,
  Box,
  Switch,
  Toolbar,
  Tooltip,
  Typography,
} from "@mui/material";

import thaiFlag from "../img/thaiFlag.svg";
import usFlag from "../img/usFlag.png";

const UserAppBar = ({ toggleLanguage, handleLanguage }) => {
  return (
    <Box mb={1}>
      <AppBar position="static">
        <Toolbar>
          <img src="img/LS-02.png" alt="logo" width="50" height="50" />
          <Typography
            variant="h5"
            component="div"
            sx={{ flexGrow: 1, marginLeft: "10px" }}
          >
            WIFI Request
          </Typography>
          <Tooltip title="TH" arrow>
            <img src={thaiFlag} alt="thai" width="20px" height="15px" />
          </Tooltip>
          <Tooltip title="Change Language" arrow>
            <Switch
              label="Select Language"
              color="default"
              onChange={handleLanguage}
              checked={toggleLanguage}
            />
          </Tooltip>
          <Tooltip title="en/Us" arrow>
            <img src={usFlag} alt="english" width="20px" height="15px" />
          </Tooltip>
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default UserAppBar;
