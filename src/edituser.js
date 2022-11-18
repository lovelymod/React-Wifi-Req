import "./edituser.css";
import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import LogoutOutlinedIcon from "@mui/icons-material/LogoutOutlined";
import Axios from "axios";

function EditUser() {
  const navigate = useNavigate();
  const location = useLocation();
  const showNewMember = location.state.newMemberList;
  const [newMember, setNewmember] = useState(showNewMember);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

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
        if (response.data.message === "Editted") {
          alert("Editted");
          setTimeout(function () {
            navigate("/table");
          }, 1300);
        }
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
  const [etcDisable, setetcDisable] = useState("");

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
  const onFirstCheck = () => {
    if (
      newMember[0].dtype === "mobile" ||
      newMember[0].dtype === "notebook" ||
      newMember[0].dtype === "tablet" ||
      newMember[0].dtype === "ipad"
    ) {
      setetcDisable("hidden");
    } else {
      setetcDisable("");
    }
  };

  const onFirstCheckEnd = () => {
    if (!newMember[0].enddate) {
      setLabelhide("hidden");
    } else {
      setLabelhide("");
    }
  };

  useEffect(() => {
    onFirstCheck();
    onFirstCheckEnd();
  }, []);

  return (
    <div className="App6">
      <div className="left-manu6">
        <div className="top-img6">
          {window.innerWidth > 100 && window.innerWidth < 1000 ? (
            <div>
              <img
                className="logo-table6"
                src="img/LS-02.png"
                alt=""
                srcSet=""
              />
            </div>
          ) : (
            <div>
              <img
                className="logo-table6"
                src="img/LS-01.png"
                alt=""
                srcSet=""
              />
            </div>
          )}
        </div>
        <div className="bottom-img6">
          {window.innerWidth > 601 && window.innerWidth < 1000 ? (
            <div>
              <button className="icon6" onClick={BtoLogin}>
                <LogoutOutlinedIcon
                  className="icon-exit6"
                  sx={{ fontSize: "40px", color: "white" }}
                />
              </button>
            </div>
          ) : (
            <div>
              <button className="icon6" onClick={BtoLogin}>
                <LogoutOutlinedIcon
                  className="icon-exit6"
                  style={{ fontSize: "40px", color: "#0174B3" }}
                />
              </button>
            </div>
          )}
        </div>
      </div>
      <div className="bg6">
        <div className="headerInfo6">
          {window.innerWidth > 601 && window.innerWidth < 1000 ? (
            <div className="box66">
              <button className="btn backbutt6" onClick={Back}>
                {
                  <ArrowBackIosIcon
                    sx={{ fontSize: "28px", color: "#0174B3" }}
                  />
                }{" "}
              </button>
              <h1>Edit</h1>
            </div>
          ) : (
            <div className="box66">
              <button className="btn backbutt6" onClick={Back}>
                {
                  <ArrowBackIosIcon
                    sx={{ fontSize: "28px", color: "#FFB401" }}
                  />
                }{" "}
              </button>
              <h1>Edit</h1>
            </div>
          )}
          <p className="message6">Wi-Fi Request List/Edit</p>
        </div>
        {showNewMember.map((val, key) => {
          return (
            <div className="contain-data6">
              <form
                onSubmit={handleSubmit(() => {
                  UpdateData(val.id);
                })}
              >
                <div className="row-data6">
                  <span className="split-contain6">
                    <label htmlFor="inputFname" className="form-label fl6">
                      First Name :
                    </label>

                    <input
                      className=" form-control fc6"
                      type="text"
                      defaultValue={val.firstname}
                      {...register("inputFirstname", {
                        onChange: (e) => setFname(e.target.value),
                        required: true,
                      })}
                    />
                    {errors.inputFirstname && (
                      <p className="fill-message">Please fill this form</p>
                    )}
                  </span>
                  <span className="split-contain6">
                    <label htmlFor="inputLname" className="form-label fl6">
                      Last Name :
                    </label>
                    <input
                      type="text"
                      className=" form-control fc6"
                      id="inputLastname"
                      defaultValue={val.lastname}
                      {...register("inputLastname", {
                        onChange: (e) => setLname(e.target.value),
                        required: true,
                      })}
                    />
                    {errors.inputLastname && (
                      <p className="fill-message">Please fill this form</p>
                    )}
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
                      className=" form-control fc6"
                      id="inputEmail"
                      defaultValue={val.email}
                      {...register("inputEmail", {
                        onChange: (e) => setEmail(e.target.value),
                        required: true,
                        pattern: "[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,}$",
                      })}
                    />
                    {errors.inputEmail && (
                      <p className="fill-message">Please fill this form</p>
                    )}
                  </span>

                  <span className="split-contain6">
                    <label htmlFor="tel" className="form-label fl6">
                      Tel :
                    </label>

                    <input
                      type="text"
                      className=" form-control fc6"
                      id="inputTel"
                      defaultValue={val.tel}
                      {...register("inputTel", {
                        onChange: (e) => setTel(e.target.value),
                        pattern: /[0-9]/,
                        required: true,
                        maxLength: 10,
                        minLength: 9,
                      })}
                    />
                    {errors.inputTel && (
                      <p className="fill-message">Please correct this form</p>
                    )}
                  </span>
                </div>
                <div className="row-data6">
                  <span className="split-contain6">
                    <label htmlFor="UserType" className="form-label fl6">
                      User Type :
                    </label>

                    <select
                      name="userType"
                      className="form-select fs6"
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
                      className="form-select fs6"
                      id="inputDevicetype"
                      defaultValue={
                        val.dtype !== "mobile" &&
                        val.dtype !== "notebook" &&
                        val.dtype !== "tablet" &&
                        val.dtype !== "ipad"
                          ? "etc."
                          : val.dtype
                      }
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
                      className=" form-control fc6 etc6"
                      id="inputEtc"
                      defaultValue={val.dtype}
                      {...register("inputEtc", {
                        onChange: (e) => setEtc(e.target.value),
                        required: false,
                      })}
                    />
                    {errors.inputEtc && (
                      <p className="fill-message">Please fill this form</p>
                    )}
                  </span>
                </div>

                <div className="row-data6">
                  <span className="split-contain6">
                    <label htmlFor="deviceBrand" className="form-label fl6">
                      Device Brand :
                    </label>

                    <input
                      type="text"
                      className=" form-control fc6"
                      id="inputdeviceBrand"
                      defaultValue={val.dbrand}
                      {...register("inputdeviceBrand", {
                        onChange: (e) => setDbrand(e.target.value),
                        required: true,
                      })}
                    />
                    {errors.inputdeviceBrand && (
                      <p className="fill-message">Please fill this form</p>
                    )}
                  </span>

                  <span className="split-contain6">
                    <label htmlFor="deviceName" className="form-label fl6">
                      Device Name :
                    </label>

                    <input
                      type="text"
                      className=" form-control fc6"
                      id="inputdeviceName"
                      defaultValue={val.dname}
                      {...register("inputdeviceName", {
                        onChange: (e) => setDname(e.target.value),
                        required: true,
                      })}
                    />
                    {errors.inputdeviceName && (
                      <p className="fill-message">Please fill this form</p>
                    )}
                  </span>
                </div>
                <div className="row-data6">
                  <span className="split-contain6">
                    <label htmlFor="startDate" className="form-label fl6">
                      Start Date :
                    </label>

                    <input
                      type="date"
                      className=" form-control fc6"
                      name="startDate"
                      id="startDate"
                      defaultValue={val.startdate}
                      {...register("startDate", {
                        onChange: (e) => setStartdate(e.target.value),
                        required: true,
                      })}
                    />
                    {errors.startDate && (
                      <p className="fill-message">Please fill this form</p>
                    )}
                  </span>

                  <span className="split-contain6" hidden={Labelhide}>
                    <label htmlFor="endDate" className="form-label fl6">
                      End Date :
                    </label>

                    <input
                      type="date"
                      className=" form-control fc6"
                      name="endDate"
                      id="endDate"
                      defaultValue={val.enddate}
                      {...register("endDate", {
                        onChange: (e) => setEnddate(e.target.value),
                        required: false,
                      })}
                    />
                    {errors.endDate && (
                      <p className="fill-message">Please fill this form</p>
                    )}
                  </span>
                </div>
                <div className="row-data6">
                  <span className="split-containRemarkedit6">
                    <label htmlFor="remark" className="form-label fl6">
                      Remark :
                    </label>

                    <input
                      type="text"
                      className=" form-control remark6"
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
                    type="submit"
                    className="btn savebutt6"
                    value="Save"
                    // onClick={() => UpdateData(val.id)}
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
