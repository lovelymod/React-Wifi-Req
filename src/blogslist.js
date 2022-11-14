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
            <div className="member" key={val.id}>
              <div className="member-data">{val.id}</div>
              <div className="member-data">{val.date}</div>
              <div className="member-data">{val.time}</div>
              <div className="member-data">{val.firstname}</div>
              <div className="member-data">{val.lastname}</div>
              <div className="member-data">
                <div className="utype-colors">{val.usertype}</div>
              </div>
              <div className="member-data">{val.startdate}</div>
              <div className="member-data">{val.enddate}</div>
              <div className="box-edit">
                <button
                  className="btn edit-butt"
                  onClick={() => {
                    showUser(val.id);
                  }}
                >
                  Show
                </button>

                <input
                  type="button"
                  className="btn edit-butt"
                  value="Edit"
                  onClick={() => edituser(val.id)}
                />
                <button
                  className="btn edit-butt"
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
