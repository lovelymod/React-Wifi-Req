import "./table.css";
// import { useEffect } from "react";

const Blogslist = ({
  memberList,
  deleteMember,
  showUser,
  edituser,
  testdata,
}) => {
  return (
    <div>
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
                <div className="utype-colors3">{val.usertype}</div>
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
                  className="btn edit-butt3"
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
