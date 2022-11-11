// import React from "react";
import "./table.css";
import { useState, useEffect } from "react";
import Axios from "axios";
import { useNavigate } from "react-router-dom";


function Table() {
  const [memberList, setMemberList] = useState([]);

  const getMember = () => {
    Axios.get("http://localhost:3001/member").then((response) => {
      setMemberList(response.data);
    });
  };

  useEffect(() => {
    getMember();
  }, []);

  const showID = (value) => {
    console.log(value);
    // console.log(value);
  }

  // const showuser = () => {
  //   Axios.post("http://localhost:3001/showuser", {
  //     id: username,
  //   }).then((response) => {
  //     console.log(response.data.message);
  //     console.log(response.data.result);
  //     if (response.data.message === "Matched") {
  //       setLoginstat("true");
  //       navigate("/table");
  //     } else {
  //       setLoginstat("false");
  //     }
  //   });
  // };

  const navigate = useNavigate();


  const gotoAdminSub = () => {
    navigate('/adminsubmit')
  }

  return (
    <div className="App3">
      <div className="bg3">
        <div className="header-top">
          <span className="left">
            <h2 className="name">Wi-fi Request List</h2>
          </span>
          <span className="right">
            <input type="button" className="btn create" value="Create User" onClick={gotoAdminSub}/>
            <input type="button" className="btn export" value="Export .csv" />
          </span>
        </div>

        <div className="head-table">
          <p className="head-data">No</p>
          <p className="head-data">Date</p>
          <p className="head-data">Time</p>
          <p className="head-data">Name</p>
          <p className="head-data">Lastname</p>
          <p className="head-data">User Type</p>
          <p className="head-data">Start Date</p>
          <p className="head-data">End Date</p>
        </div>
        {/* <hr /> */}

        {memberList.map((val, key) => {
          return (
            <div className="member">
              <span className="member-data">{val.id}</span>
              <span className="member-data">{val.date}</span>
              <span className="member-data">{val.time}</span>
              <span className="member-data">{val.firstname}</span>
              <span className="member-data">{val.lastname}</span>
              <span className="member-data">
                <div className="utype-colors">{val.usertype}</div>
              </span>
              <span className="member-data">{val.startdate}</span>
              <span className="member-data">{val.enddate}</span>
              <span className="box-edit">
                <input type="button" className="btn edit-butt" value="Show" data-id={val.id} onClick={showID()}/>
                <input type="button" className="btn edit-butt" value="Edit" />
                <input type="button" className="btn edit-butt" value="Delete" />
              </span>
              <hr className="hr-last" />
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Table;
