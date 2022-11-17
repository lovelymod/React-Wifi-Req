import "./edituser.css";
import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
// import { useForm } from "react-hook-form";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import LogoutOutlinedIcon from "@mui/icons-material/LogoutOutlined";
import Axios from "axios";

function EditUser() {
  const navigate = useNavigate();
  const location = useLocation();
  const showNewMember = location.state.newMemberList;
  const [newMember, setNewmember] = useState(showNewMember);

  // const {
  //   register,
  //   handleSubmit,
  //   formState: { errors },
  // } = useForm();

  const [fname, setFname] = useState("");
  const [lname, setLname] = useState("");
  const [utype, setUtype] = useState("");
  const [tel, setTel] = useState("");
  const [email, setEmail] = useState("");
  const [dtype, setDtype] = useState("");
  const [etc, setEtc] = useState("");
  const [dbrand, setDbrand] = useState("");
  const [dname, setDname] = useState("");
  const [startdate, setStartdate] = useState("");
  const [enddate, setEnddate] = useState("");
  const [remark, setRemark] = useState("");

  let strDtype = dtype;

  const swapData = () => {
    if (strDtype === "etc.") {
      strDtype = etc;
    }
  };

  const Back = () => {
    navigate("/table");
  };

  const BtoLogin = () => {
    navigate("/login");
  };


  const UpdateData = (id) => {
    swapData();
    Axios.put("http://localhost:3001/update", {
      id: id,
      firstname: fname,
      lastname: lname,
      usertype: utype,
      tel: tel,
      email: email,
      dtype: strDtype,
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

  const [Labelhide, setLabelhide] = useState("");
  const [etcDisable, setetcDisable] = useState("hidden");

  const HideLabel = (value) => {
    if (value === "staff") {
      setLabelhide("hidden");
    } else if (value !== "staff") {
      setLabelhide("");
    }
  };

  const Checketc = (value) => {
    if (value === "etc.") {
      setetcDisable("");
    } else if (value !== "etc.") {
      setetcDisable("hidden");
    }
  };

  return (
    <div className="App6">
      <div className="left-manu6">
        <div className="top-img6">
          <img className="logo-table6" src="img/LS-01.png" alt="" srcSet="" />
        </div>
        <div className="bottom-img6">
          <button className="icon6" onClick={BtoLogin}>
            <LogoutOutlinedIcon sx={{ fontSize: "40px", color: "#0174B3" }} />
          </button>
        </div>
      </div>
      <div className="bg6">
        <div className="headerInfo6">
          <button className="btn backbutt6" onClick={Back}>
            {
              <ArrowBackIosIcon
                sx={{
                  color: "#FFB401",
                }}
              />
            }{" "}
            <h1>Edit</h1>
          </button>
          <p className="message">Wi-Fi Request List/Edit</p>
        </div>
        {showNewMember.map((val, key) => {
          return (
            <div className="contain-data6">
              <form onSubmit="">
                <div className="row-data6">
                  <span className="split-contain6">
                    <label htmlFor="inputFname" className="form-label fl6">
                      First Name :
                    </label>

                    <input
                      className=" form-control fcAdmin6"
                      type="text"
                      defaultValue={val.firstname}
                      onChange={(e) => {
                        setFname(e.target.value);
                        console.log(e.target.value);
                      }}
                    />
                  </span>
                  <span className="split-contain6">
                    <label htmlFor="inputLname" className="form-label fl6">
                      Last Name :
                    </label>
                    <input
                      type="text"
                      className=" form-control fcAdmin6"
                      id="inputLastname"
                      defaultValue={val.lastname}
                      onChange={(e) => {
                        setLname(e.target.value);
                      }}
                    />
                  </span>
                </div>
                <div className="row-data6">
                  <span className="split-contain6">
                    <label htmlFor="email" className="form-label fl6">
                      Email :
                    </label>

                    <input
                      pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$"
                      type="email"
                      className=" form-control fcAdmin6"
                      id="inputEmail"
                      defaultValue={val.email}
                      onChange={(e) => {
                        setEmail(e.target.value);
                      }}
                    />
                  </span>

                  <span className="split-contain6">
                    <label htmlFor="tel" className="form-label fl6">
                      Tel :
                    </label>

                    <input
                      type="number"
                      className=" form-control fcAdmin6"
                      id="inputTel"
                      defaultValue={val.tel}
                      onChange={(e) => {
                        setTel(e.target.value);
                      }}
                    />
                  </span>
                </div>
                <div className="row-data6">
                  <span className="split-contain6">
                    <label htmlFor="UserType" className="form-label fl6">
                      User Type :
                    </label>

                    <select
                      name="userType"
                      className="form-select fsAdmin6"
                      id="inputUsertype"
                      defaultValue={val.usertype}
                      onChange={(e) => {
                        setUtype(e.target.value);
                        HideLabel(e.target.value);
                      }}
                    >
                      <option value="-">Please Select</option>
                      <option value="staff">Staff</option>
                      <option value="internship">Internship</option>
                      <option value="guest">Guest</option>
                    </select>
                  </span>

                  <span className="split-contain6">
                    <label htmlFor="DeviceType" className="form-label fl6">
                      Device Type :
                    </label>

                    <select
                      name="deviceType"
                      className="form-select fsAdmin6"
                      id="inputDevicetype"
                      defaultValue={val.dtype}
                      onChange={(e) => {
                        Checketc(e.target.value);
                        setDtype(e.target.value);
                      }}
                    >
                      <option value="-">Please Select</option>
                      <option value="mobile">Mobile</option>
                      <option value="notebook">Notebook</option>
                      <option value="tablet">Tablet</option>
                      <option value="ipad">Ipad</option>
                      <option value="etc.">etc.</option>
                    </select>
                  </span>
                </div>

                <div className="solo6" hidden={etcDisable}>
                  <span className="split-contain6">
                    <input
                      type="text"
                      className=" form-control fcAdmin6 etc6"
                      id="inputEtc"
                      onChange={(e) => {
                        setEtc(e.target.value);
                      }}
                    />
                  </span>
                </div>

                <div className="row-data6">
                  <span className="split-contain6">
                    <label htmlFor="deviceBrand" className="form-label fl6">
                      Device Brand :
                    </label>

                    <input
                      type="text"
                      className=" form-control fcAdmin6"
                      id="inputdeviceBrand"
                      defaultValue={val.dbrand}
                      onChange={(e) => {
                        setDbrand(e.target.value);
                      }}
                    />
                  </span>

                  <span className="split-contain6">
                    <label htmlFor="deviceName" className="form-label fl6">
                      Device Name :
                    </label>

                    <input
                      type="text"
                      className=" form-control fcAdmin6"
                      id="inputdeviceName"
                      defaultValue={val.dname}
                      onChange={(e) => {
                        setDname(e.target.value);
                      }}
                    />
                  </span>
                </div>
                <div className="row-data6">
                  <span className="split-contain6">
                    <label htmlFor="startDate" className="form-label fl6">
                      Start Date :
                    </label>

                    <input
                      type="date"
                      className=" form-control fcAdmin6"
                      name="startDate"
                      id="startDate"
                      defaultValue={val.startdate}
                      onChange={(e) => {
                        setStartdate(e.target.value);
                      }}
                    />
                  </span>

                  <span className="split-containedit6" hidden={Labelhide}>
                    <label htmlFor="endDate" className="form-label fl6">
                      End Date :
                    </label>

                    <input
                      type="date"
                      className=" form-control fcAdmin6"
                      name="endDate"
                      id="endDate"
                      defaultValue={val.enddate}
                      onChange={(e) => {
                        setEnddate(e.target.value);
                      }}
                    />
                  </span>
                </div>
                <div className="row-data6">
                  <span className="split-containRemarkedit6">
                    <label htmlFor="remark" className="form-label flAdmin6">
                      Remark :
                    </label>

                    <input
                      type="text"
                      className=" form-control inputeditremark6"
                      id="inputremark"
                      defaultValue={val.remark}
                      onChange={(e) => {
                        setRemark(e.target.value);
                      }}
                    />
                  </span>
                </div>
                <div className="row-butt6">
                  <input
                    type=""
                    className="btn savebutt6"
                    value="Submit"
                    onClick={() => UpdateData(val.id)}
                  />

                  <button className="btn cancelbutt6" onClick={Back}>
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default EditUser;
