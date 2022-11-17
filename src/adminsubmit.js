import "./admidsubmit.css";
import { useState } from "react";
import Axios from "axios";
import { useForm } from "react-hook-form";
import LogoutOutlinedIcon from "@mui/icons-material/LogoutOutlined";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import { useNavigate } from "react-router-dom";

function AdminSub() {
  const navigate = useNavigate();
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

  const [dates, setDates] = useState("");
  const [times, setTimes] = useState("");

  const strUtype = utype;
  let strDtype = dtype;

  // const [wifireqList, setWifiReqList] = useState([]);

  const getDateandTime = () => {
    const date = new Date().getDate();
    const month = new Date().getMonth() + 1;
    const year = new Date().getFullYear();
    const hours = new Date().getHours();
    const min = new Date().getMinutes();

    setDates(date + "-" + month + "-" + year);
    setTimes(hours + ":" + min);

    dates.toString();
    times.toString();
  };

  const OnSubmit = () => {
    addRequest();
  };
  const addRequest = () => {
    console.log("Hi");
    swapData();
    getDateandTime();
    Axios.post("http://localhost:3001/create", {
      firstname: fname,
      lastname: lname,
      usertype: strUtype,
      tel: tel,
      email: email,
      dtype: strDtype,
      dbrand: dbrand,
      dname: dname,
      startdate: startdate,
      enddate: enddate,
      remark: remark,
      date: dates,
      time: times,
    }).then((response) => {
      if (response.data.message === "Inserted") {
        alert("Submited");
        setTimeout(function () {
          navigate("/table");
        }, 2000);
      }
    });
  };

  const [Labelhide, setLabelhide] = useState("");
  const [etcDisable, setetcDisable] = useState("hidden");

  const swapData = () => {
    if (strDtype === "etc.") {
      strDtype = etc;
    }
  };

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

  const BtoLogin = () => {
    navigate("/login");
  };

  const Back = () => {
    navigate("/table");
  };

  return (
    <div className="AppAdmin4">
      <div className="imagesAdmin4">
        <div className="boxtop4">
          {window.innerWidth > 100 && window.innerWidth < 1000 ? (
            <div>
              <img
                className="logo-table3"
                src="img/LS-02.png"
                alt=""
                srcSet=""
              />
            </div>
          ) : (
            <div>
              <img
                className="logo-table3"
                src="img/LS-01.png"
                alt=""
                srcSet=""
              />
            </div>
          )}
        </div>
        <div className="boxbottom4">
          {window.innerWidth > 601 && window.innerWidth < 1000 ? (
            <div>
              <button className="icon4" onClick={BtoLogin}>
                <LogoutOutlinedIcon
                  className="icon-exit4"
                  sx={{ fontSize: "40px", color: "white" }}
                />
              </button>
            </div>
          ) : (
            <div>
              <button className="icon4" onClick={BtoLogin}>
                <LogoutOutlinedIcon
                  className="icon-exit4"
                  style={{ fontSize: "40px", color: "#0174B3" }}
                />
              </button>
            </div>
          )}
        </div>
      </div>
      <div className="bgAdmin4">
        <div className="headerAdmin4">
          {window.innerWidth > 601 && window.innerWidth < 1000 ? (
            <div>
              <button className="backbuttAdminTop4" onClick={Back}>
                {<ArrowBackIosIcon sx={{ fontSize: "28px", color: "#0174B3" }} />}{" "}
                <h1>Create User</h1>
              </button>
            </div>
          ) : (
            <div>
              <button className="backbuttAdminTop4" onClick={Back}>
                {<ArrowBackIosIcon sx={{ fontSize: "28px", color: "#FFB401" }} />}{" "}
                <h1>Create User</h1>
              </button>
            </div>
          )}

          <p className="message4">Wi-Fi Request List/Create User</p>
        </div>
        <div className="containerAdmin4">
          <form onSubmit={handleSubmit(OnSubmit)}>
            <div className="row-containMessage4">
              <h2>Please fill out user information</h2>
            </div>
            <div className="row-containAdmin4">
              <span className="split-contain4">
                <label htmlFor="inputFname" className="form-label flAdmin4">
                  First Name :
                </label>

                <input
                  className=" form-control fcAdmin4"
                  type="text"
                  placeholder="First Name"
                  onChange={(e) => {
                    setFname(e.target.value);
                    getDateandTime();
                  }}
                  {...register("inputFirstname", { required: true })}
                />
                {errors.inputFirstname && (
                  <p className="fill-message">Please fill this form</p>
                )}
              </span>

              <span className="split-contain4">
                <label htmlFor="inputLname" className="form-label flAdmin4">
                  Last Name :
                </label>
                <input
                  type="text"
                  className=" form-control fcAdmin4"
                  id="inputLastname"
                  placeholder="Last Name"
                  onChange={(e) => {
                    setLname(e.target.value);
                  }}
                  {...register("inputLastname", { required: true })}
                />
                {errors.inputLastname && (
                  <p className="fill-message">Please fill this form</p>
                )}
              </span>
            </div>

            <div className="row-containAdmin4">
              <span className="split-contain4">
                <label htmlFor="email" className="form-label flAdmin4">
                  Email :
                </label>

                <input
                  pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$"
                  type="email"
                  className=" form-control fcAdmin4"
                  id="inputEmail"
                  placeholder="admin@gmail.com"
                  onChange={(e) => {
                    setEmail(e.target.value);
                  }}
                  {...register("inputEmail", {
                    required: true,
                    pattern: "[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,}$",
                  })}
                />
                {errors.inputEmail && (
                  <p className="fill-message">Please fill this form</p>
                )}
              </span>

              <span className="split-contain4">
                <label htmlFor="tel" className="form-label flAdmin4">
                  Tel :
                </label>

                <input
                  type="number"
                  className=" form-control fcAdmin4"
                  id="inputTel"
                  placeholder="095xxxxxxx"
                  onChange={(e) => {
                    setTel(e.target.value);
                  }}
                  {...register("inputTel", { required: true, maxLength: 10 })}
                />
                {errors.inputTel && (
                  <p className="fill-message">Please correct this form</p>
                )}
              </span>
            </div>

            <div className="row-containAdmin4">
              <span className="split-contain4">
                <label htmlFor="UserType" className="form-label flAdmin4">
                  User Type :
                </label>

                <select
                  name="userType"
                  className="form-select fsAdmin4"
                  id="inputUsertype"
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

              <span className="split-contain4">
                <label htmlFor="DeviceType" className="form-label flAdmin4">
                  Device Type :
                </label>

                <select
                  name="deviceType"
                  className="form-select fsAdmin4"
                  id="inputDevicetype"
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

            <div className="solo4" hidden={etcDisable}>
              <span className="split-contain4">
                <input
                  type="text"
                  className=" form-control fcAdmin4 etc4"
                  id="inputEtc"
                  placeholder="Etc please fill ..."
                  onChange={(e) => {
                    setEtc(e.target.value);
                  }}
                  {...register("inputEtc", { required: false })}
                />
                {errors.inputEtc && (
                  <p className="fill-message">Please fill this form</p>
                )}
              </span>
            </div>

            <div className="row-containAdmin4">
              <span className="split-contain4">
                <label htmlFor="deviceBrand" className="form-label flAdmin4">
                  Device Brand :
                </label>

                <input
                  type="text"
                  className=" form-control fcAdmin4"
                  id="inputdeviceBrand"
                  placeholder="Apple , Sumsung , ..."
                  onChange={(e) => {
                    setDbrand(e.target.value);
                  }}
                  {...register("inputdeviceBrand", { required: true })}
                />
                {errors.inputdeviceBrand && (
                  <p className="fill-message">Please fill this form</p>
                )}
              </span>

              <span className="split-contain4">
                <label htmlFor="deviceName" className="form-label flAdmin4">
                  Device Name :
                </label>

                <input
                  type="text"
                  className=" form-control fcAdmin4"
                  id="inputdeviceName"
                  placeholder=""
                  onChange={(e) => {
                    setDname(e.target.value);
                  }}
                  {...register("inputdeviceName", { required: true })}
                />
                {errors.inputdeviceName && (
                  <p className="fill-message">Please fill this form</p>
                )}
              </span>
            </div>

            <div className="row-containAdmin4">
              <span className="split-contain4">
                <label htmlFor="startDate" className="form-label flAdmin4">
                  Start Date :
                </label>

                <input
                  type="date"
                  className=" form-control fcAdmin4"
                  name="startDate"
                  id="startDate"
                  onChange={(e) => {
                    setStartdate(e.target.value);
                  }}
                  {...register("startDate", { required: true })}
                />
                {errors.startDate && (
                  <p className="fill-message">Please fill this form</p>
                )}
              </span>

              <span className="split-contain4" hidden={Labelhide}>
                <label htmlFor="endDate" className="form-label flAdmin4">
                  End Date :
                </label>

                <input
                  type="date"
                  className=" form-control fcAdmin4"
                  name="endDate"
                  id="endDate"
                  onChange={(e) => {
                    setEnddate(e.target.value);
                  }}
                  {...register("endDate", { required: false })}
                />
                {errors.endDate && (
                  <p className="fill-message">Please fill this form</p>
                )}
              </span>
            </div>

            <div className="row-containAdmin4">
              <span className="split-containRemark4">
                <label htmlFor="remark" className="form-label flAdmin4">
                  Remark :
                </label>

                <textarea
                  type="text"
                  className=" form-control remark4"
                  name="remark"
                  id="remark"
                  onChange={(e) => {
                    setRemark(e.target.value);
                  }}
                />
              </span>
            </div>

            <div className="row-containAdmin-butt4">
              <input
                type="submit"
                className="btn regisbuttAdmin4"
                value="Submit"
                // onClick={addRequest}
              />

              <input
                type=""
                className="btn backbuttAdmin4"
                value="Cancel"
                onClick={Back}
              />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default AdminSub;
