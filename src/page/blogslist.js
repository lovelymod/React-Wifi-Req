import "./table.css";
const $ = require('jquery')
$.DataTable = require('datatables.net')
// import { useEffect } from "react";

const Blogslist = ({
  memberList,
  deleteMember,
  showUser,
  edituser,
  testdata,
}) => {
  return (
    <div className="big3">
      {memberList.map((val, key) => {
        return (
          <div className="big">
            <div className="member3" key={val.id}>
              <div className="member-data3">{val.id}</div>
              <div className="member-data3">{val.date}</div>
              <div className="member-data3">{val.time}</div>
              <div className="member-data3">{val.firstname}</div>
              <div className="member-data3">{val.lastname}</div>
              <div className="member-data3">
                {val.usertype === "staff" ? (
                  <div
                    className="utype-colors3"
                    style={{ backgroundColor: "#A8FFA6" }}
                  >
                    {val.usertype}
                  </div>
                ) : (
                  <div></div>
                )}
                {val.usertype === "internship" ? (
                  <div
                    className="utype-colors3"
                    style={{ backgroundColor: "#ffbeb7" }}
                  >
                    {val.usertype}
                  </div>
                ) : (
                  <div></div>
                )}
                {val.usertype === "guest" ? (
                  <div
                    className="utype-colors3"
                    style={{ backgroundColor: "#b2e4ff" }}
                  >
                    {val.usertype}
                  </div>
                ) : (
                  <div></div>
                )}
              </div>
              <div className="member-data3">{val.startdate}</div>
              <div className="member-data3">{val.enddate}</div>
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
            <hr />
          </div>
        );
      })}
    </div>
  );
};

export default Blogslist;
