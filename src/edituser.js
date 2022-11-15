import "./edituser.css";
import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import Axios from "axios";

function EditUser() {
  const navigate = useNavigate();
  const location = useLocation();
  const showNewMember = location.state.newMemberList;
  const [newMember, setNewmember] = useState(showNewMember);

  const [fname, setFname] = useState("");
  const [lname, setLname] = useState("");
  const [utype, setUtype] = useState("");
  const [tel, setTel] = useState("");
  const [email, setEmail] = useState("");
  const [dtype, setDtype] = useState("");
  // const [etc, setEtc] = useState("");
  const [dbrand, setDbrand] = useState("");
  const [dname, setDname] = useState("");
  const [startdate, setStartdate] = useState("");
  const [enddate, setEnddate] = useState("");
  const [remark, setRemark] = useState("");

  const [IsDisable, setIsDisable] = useState(false);

  const Back = () => {
    navigate("/table");
  };

  const UpdateData = (id) => {
    Axios.put("http://localhost:3001/update", {
      id: id,
      firstname: fname,
      lastname: lname,
      usertype: utype,
      tel: tel,
      email: email,
      dtype: dtype,
      dbrand: dbrand,
      dname: dname,
      startdate: startdate,
      enddate: enddate,
      remark: remark,
    })
      .then((response) => {
        setNewmember(
          newMember.map((val) => {
            return val.id === id
              ? {
                  id: id,
                  firstname: fname,
                  lastname: lname,
                  usertype: utype,
                  tel: tel,
                  email: email,
                  dtype: dtype,
                  dbrand: dbrand,
                  dname: dname,
                  startdate: startdate,
                  enddate: enddate,
                  remark: remark,
                }
              : val;
          })
        );
      })
      .catch((err) => {});
  };

  const Check = (value) => {
    console.log(value);
    if (value === "staff") {
      setIsDisable(true);
    } else if (value !== "staff") {
      setIsDisable(false);
    }
  };

  return (
    <div className="App5">
      <div className="left-manu">
        <div className="top-img">
          <img className="logo-table" src="img/LS-02.png" alt="" srcSet="" />
        </div>
        <div className="bottom-img">
          {/* <button className="icon" onClick={BtoLogin}>
            <LogoutOutlinedIcon sx={{ fontSize: "40px", color: "#0174B3" }} />
          </button> */}
        </div>
      </div>
      <div className="bg5">
        <span className="left3">
          <button className="btn backbutt3" onClick={Back}>
            {
              <ArrowBackIosIcon
                sx={{
                  color: "#FFB401",
                }}
              />
            }{" "}
            Edit
          </button>
        </span>
        <span className="right3">
          <div className="headerInfo2">
            <h1>Edit User Information</h1>
          </div>
          <hr />
          <div className="wrap-contain">
            <div className="showcontain2">
              <span className="contain-left2">
                {showNewMember.map((val, key) => {
                  return (
                    <div className="contain-data2">
                      <div className="row-data2">
                        <h2 className="label-data2">Firstname:</h2>

                        <input
                          type="text"
                          className="form-control inputedit"
                          id="inputFirstname"
                          placeholder={val.firstname}
                          onChange={(e) => {
                            setFname(e.target.value);
                          }}
                        />
                      </div>
                      <div className="row-data2">
                        <h2 className="label-data2">User Type:</h2>

                        <select
                          name="userType"
                          className="form-select inputedit"
                          id="inputUsertype"
                          onChange={(e) => {
                            Check(e.target.value);
                            setUtype(e.target.value);
                          }}
                        >
                          <option value="-">-</option>
                          <option value="staff">Staff</option>
                          <option value="internship">Internship</option>
                          <option value="guest">Guest</option>
                        </select>
                      </div>
                      <div className="row-data2">
                        <h2 className="label-data2">Email:</h2>

                        <input
                          type="text"
                          className="form-control inputedit"
                          id="inputEmail"
                          placeholder={val.email}
                          onChange={(e) => {
                            setEmail(e.target.value);
                          }}
                        />
                      </div>
                      <div className="row-data2">
                        <h2 className="label-data2">Device Brand:</h2>

                        <input
                          type="text"
                          className="form-control inputedit"
                          id="inputdbrand"
                          placeholder={val.dbrand}
                          onChange={(e) => {
                            setDbrand(e.target.value);
                          }}
                        />
                      </div>
                      <div className="row-data2">
                        <h2 className="label-data2">Start Date:</h2>

                        <input
                          type="date"
                          className="form-control inputedit"
                          id="inputStartdate"
                          placeholder={val.startdate}
                          onChange={(e) => {
                            setStartdate(e.target.value);
                          }}
                        />
                      </div>
                    </div>
                  );
                })}
              </span>
              <span className="contain-right2">
                {showNewMember.map((val, key) => {
                  return (
                    <div className="contain-data2">
                      <div className="row-data2">
                        <h2 className="label-data2">Lastname:</h2>

                        <input
                          type="text"
                          className="form-control inputedit"
                          id="inputLastname"
                          placeholder={val.lastname}
                          onChange={(e) => {
                            setLname(e.target.value);
                          }}
                        />
                      </div>
                      <div className="row-data2">
                        <h2 className="label-data2">Tel:</h2>

                        <input
                          type="text"
                          className="form-control inputedit"
                          id="inputTel"
                          placeholder={val.tel}
                          onChange={(e) => {
                            setTel(e.target.value);
                          }}
                        />
                      </div>
                      <div className="row-data2">
                        <h2 className="label-data2">Device Type:</h2>

                        <select
                          name="deviceType"
                          className="form-select inputedit"
                          id="inputDevicetype"
                          onChange={(e) => {
                            setDtype(e.target.value);
                          }}
                        >
                          <option value="-">-</option>
                          <option value="mobile">Mobile</option>
                          <option value="notebook">Notebook</option>
                          <option value="tablet">Tablet</option>
                          <option value="ipad">Ipad</option>
                          <option value="etc.">etc.</option>
                        </select>
                      </div>
                      <div className="row-data2">
                        <h2 className="label-data2">Device Name:</h2>

                        <input
                          type="text"
                          className="form-control inputedit"
                          id="inputdbrand"
                          placeholder={val.dname}
                          onChange={(e) => {
                            setDname(e.target.value);
                          }}
                        />
                      </div>
                      <div className="row-data2">
                        <h2 className="label-data2">End Date:</h2>

                        <input
                          disabled={IsDisable}
                          type="date"
                          className="form-control inputedit"
                          id="inputEnddate"
                          placeholder={val.enddate}
                          onChange={(e) => {
                            setEnddate(e.target.value);
                          }}
                        />
                      </div>
                    </div>
                  );
                })}
              </span>
            </div>
            {showNewMember.map((val, key) => {
              return (
                <div className="row-data-remark">
                  <h2 className="label-data2">Remark:</h2>

                  <input
                    type="text"
                    className="form-control inputeditremark"
                    id="inputremark"
                    placeholder={val.remark}
                    onChange={(e) => {
                      setRemark(e.target.value);
                    }}
                  />
                </div>
              );
            })}

            <div className="row-butt2">
              {showNewMember.map((val, key) => {
                return (
                  <button
                    className="btn savebutt"
                    onClick={() => {
                      UpdateData(val.id);
                    }}
                  >
                    Save
                  </button>
                );
              })}

              <div className="empty-box2"></div>
              <button className="btn cancelbutt" onClick={Back}>
                Cancle
              </button>
            </div>
          </div>
        </span>
      </div>
    </div>
  );
}

export default EditUser;
