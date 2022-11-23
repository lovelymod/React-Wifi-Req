import "./table.css";

const Blogslist = ({
  memberList,
  deleteMember,
  showUser,
  edituser,
}) => {
  return (
    <div className="big3">
      {memberList.map((val, key) => {
        return (
          <div className="big" key={val.id}>
            <div className="member3">
              <div className="member-data3">{val.id}</div>
              <div className="member-data3">{val.Dates}</div>
              <div className="member-data3">{val.Times}</div>
              <div className="member-data3">{val.Firstname}</div>
              <div className="member-data3">{val.Lastname}</div>
              <div className="member-data3">
                {val.User_Type === "staff" ? (
                  <div
                    className="utype-colors3"
                    style={{ backgroundColor: "#A8FFA6" }}
                  >
                    {val.User_Type}
                  </div>
                ) : (
                  <div></div>
                )}
                {val.User_Type === "internship" ? (
                  <div
                    className="utype-colors3"
                    style={{ backgroundColor: "#ffbeb7" }}
                  >
                    {val.User_Type}
                  </div>
                ) : (
                  <div></div>
                )}
                {val.User_Type === "guest" ? (
                  <div
                    className="utype-colors3"
                    style={{ backgroundColor: "#b2e4ff" }}
                  >
                    {val.User_Type}
                  </div>
                ) : (
                  <div></div>
                )}
              </div>
              <div className="member-data3">{val.Start_Date}</div>
              <div className="member-data3">{val.End_Date}</div>
              <div className="box-edit3">
                <button
                  className="btn edit-butt3"
                  onClick={() => {
                    showUser(val.id);
                  }}
                >
                  Show
                </button>

                <input
                  type="button"
                  className="btn edit-butt3"
                  value="Edit"
                  onClick={() => edituser(val.id)}
                />
                <button
                  className="btn del-butt3"
                  onClick={() => deleteMember(val.id)}
                >
                  Delete
                </button>
              </div>
            </div>
            <hr/>
          </div>
        );
      })}
    </div>
  );
};

export default Blogslist;
