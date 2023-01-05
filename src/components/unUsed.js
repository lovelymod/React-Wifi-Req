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
