//? table

// import moment from "moment";
// import Blogslist from "../components/blogslist";
// import TableSideBar from "../components/tablesideBar";
// import { CSVLink } from "react-csv";
// import DownloadIcon from "@mui/icons-material/Download";
// import ListIcon from "@mui/icons-material/List";
// import LogoutOutlinedIcon from "@mui/icons-material/LogoutOutlined";
// import AddIcon from "@mui/icons-material/Add";
// import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
// import { motion } from "framer-motion";

{
  /*//! {window.innerWidth > 100 && window.innerWidth < 600 ? (
        <div
          className="left-manu3"
          style={{
            left: isOpen ? "0px" : "-100px",
            marginRight: isOpen ? "10px" : "0px",
          }}
        >
          <div className="top-img3">
            <button
              className="icon-back2"
              onClick={() => toggle()}
              style={{
                left: "58px",
                transform: isOpen ? "rotate(180deg)" : "rotate(0deg)",
              }}
            >
              <ArrowForwardIosIcon sx={{ fontSize: "20px", color: "white" }} />
            </button>

            <img
              className="logo-table3"
              src="img/LS-02.png"
              alt=""
              srcSet=""
              style={{ display: isOpen ? "block" : "none" }}
            />
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="ListIcon3"
              onClick={() => Back()}
              style={{ display: isOpen ? "block" : "none" }}
            >
              <ListIcon sx={{ fontSize: "32px", color: "#0174B3" }} />
            </motion.button>
          </div>
          <div className="bottom-img3">
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="icon3"
              onClick={() => Logout()}
              style={{ display: isOpen ? "block" : "none" }}
            >
              <LogoutOutlinedIcon className="icon-exit3" sx={{ fontSize: "40px", color: "white" }} />
            </motion.button>
          </div>
        </div>
      ) : (
        <TableSideBar />
      )} */
}

{
  /*//! <div className="header-top3">
          <span className="left3">
            <h2 className="name3">Wi-Fi Request List</h2>
          </span>
          <span className="right3">
            {window.innerWidth > 100 && window.innerWidth < 600 ? (
              <div>
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  className="icon-create3"
                  onClick={() => gotoAdminSub()}
                >
                  <AddIcon sx={{ fontSize: "20px", color: "white" }} />
                </motion.button>
                <CSVLink {...csvReport}>
                  <motion.button whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }} className="icon-export3">
                    <DownloadIcon sx={{ fontSize: "18px", color: "white" }} />
                  </motion.button>
                </CSVLink>
              </div>
            ) : (
              <div>
                <motion.input
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  type="button"
                  className="btn create3"
                  value="Create User"
                  onClick={() => gotoAdminSub()}
                />
                <CSVLink {...csvReport}>
                  <motion.input
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    type="button"
                    className="btn export3"
                    value="Export .csv"
                  />
                </CSVLink>
              </div>
            )}
          </span>
        </div> */
}

{
  /*//! <Blogslist
              memberList={memberList}
              deleteMember={deleteMember}
              showUser={showUser}
              edituser={edituser}
              setExMemberList={setExMemberList}
            /> */
}

// let dataBox = getUser.data;
// let dataList = [];

// dataBox.forEach((item) => {
//   dataList.push({
//     id: item.id,
//     Ip_Addr: item.Ip_Addr ? item.Ip_Addr.toString() : "-",
//     Firstname: item.Firstname.toString(),
//     Lastname: item.Lastname.toString(),
//     Email: item.Email.toString(),
//     Tel: '=""' + item.Tel + '""',
//     User_Type: item.User_Type.toString(),
//     Device_Type: item.Device_Type.toString(),
//     Device_Brand: item.Device_Brand.toString(),
//     Device_Name: item.Device_Name.toString(),
//     Start_Date: item.Start_Date.toString(),
//     End_Date: item.End_Date ? item.End_Date.toString() : "-",
//     Dates: item.Dates.toString(),
//     Times: item.Times.toString(),
//   });
// });
// setExMemberList(dataList);

// const headers = [
//   { label: "No", key: "id" },
//   { label: "IP Address", key: "Ip_Addr" },
//   { label: "First Name", key: "Firstname" },
//   { label: "Last Name", key: "Lastname" },
//   { label: "Email", key: "Email" },
//   { label: "Tel", key: "Tel" },
//   { label: "Usertype", key: "User_Type" },
//   { label: "DeviceType", key: "Device_Type" },
//   { label: "DeviceBrand", key: "Device_Brand" },
//   { label: "DeviceName", key: "Device_Name" },
//   { label: "StartDate", key: "Start_Date" },
//   { label: "EndDate", key: "End_Date" },
//   { label: "Date(Submit)", key: "Dates" },
//   { label: "Time(Submit)", key: "Times" },
// ];

// const csvReport = {
//   headers: headers,
//   data: exMemberList,
//   filename: `RequestList_${timeStamp}.csv`,
// };

// const Back = () => navigate("/table");
//   const toggle = () => setIsOpen(!isOpen);
//? table

{
  /* <TextField
  variant="outlined"
  defaultValue={
    rowData.Device_Type === "mobile" ||
    rowData.Device_Type === "notebook" ||
    rowData.Device_Type === "tablet" ||
    rowData.Device_Type === "ipad"
      ? rowData.Device_Type
      : "etc"
  }
  select
  fullWidth
>
  <MenuItem value="mobile">Mobile</MenuItem>
  <MenuItem value="notebook">Notebook</MenuItem>
  <MenuItem value="tablet">Tablet</MenuItem>
  <MenuItem value="ipad">iPad</MenuItem>
  <MenuItem value="etc">Etc.</MenuItem>
</TextField>; */
}

{
  /* <Stack
direction={chgWidth()}
mt={2}
sx={{
  display:
    rowData.Device_Type === "mobile" ||
    rowData.Device_Type === "notebook" ||
    rowData.Device_Type === "tablet" ||
    rowData.Device_Type === "ipad"
      ? "none"
      : "",
}}
>
<Box width="100%">
  <InputLabel sx={{ color: "black" }}>Etc:</InputLabel>
  <TextField
    variant="outlined"
    defaultValue={
      rowData.Device_Type === "mobile" ||
      rowData.Device_Type === "notebook" ||
      rowData.Device_Type === "tablet" ||
      rowData.Device_Type === "ipad"
        ? null
        : rowData.Device_Type
    }
    fullWidth
  />
</Box>
</Stack> */
}
{
  /* <LocalizationProvider dateAdapter={AdapterDayjs}>
  <DatePicker
    inputFormat="YYYY/MM/DD"
    value={new Date(rowData.Start_Date)}
    onChange
    renderInput={(params) => <TextField {...params} fullWidth />}
  />

  <DatePicker
    inputFormat="YYYY/MM/DD"
    value={new Date(rowData.End_Date)}
    onChange
    renderInput={(params) => <TextField {...params} fullWidth />}
  />
</LocalizationProvider>; */
}
