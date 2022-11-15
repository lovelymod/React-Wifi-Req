import "./usersubmit.css";
import { useState } from "react";
import Axios from "axios";
import { useForm } from "react-hook-form";


function UserSubmit() {
  const { register, handleSubmit, watch, formState: { errors } } = useForm();
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

    setDates(date + "/" + month + "/" + year);
    setTimes(hours + ":" + min);

    dates.toString();
    times.toString();
  };

  const addRequest = () => {
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
      }
      // setWifiReqList([
      //   ...wifireqList,
      //   {
      //     firstname: fname,
      //     lastname: lname,
      //     usertype: strUtype,
      //     tel: tel,
      //     email: email,
      //     dtype: strDtype,
      //     dbrand: dbrand,
      //     dname: dname,
      //     startdate: startdate,
      //     enddate: enddate,
      //     remark: remark,
      //     date: dates,
      //     time: times,
      //   },
      // ]);
    });
  };

  const [IsDisable, setIsDisable] = useState("");
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

  const Check = (value) => {
    if (value === "staff") {
      setIsDisable("hidden");
    } else if (value !== "staff") {
      setIsDisable("date");
    }
  };

  const Checketc = (value) => {
    if (value === "etc.") {
      setetcDisable("text");
    } else if (value !== "etc.") {
      setetcDisable("hidden");
    }
  };

  const showOrnot = () => {

  }

  return (
    <div className="App">
      <div className="bg">
        <div className="images">
          <img className="logo" src="img/LS-01.png" alt="" srcSet="" />
        </div>

        <div className="header">
          <h1 className="message">Please fill out a request form</h1>
        </div>
        <div className="container">
          <form action="">
            <div className="row-contain">
              <span className="split-contain">
                <label htmlFor="inputFname" className="form-label">
                  First Name :
                </label>

                <input
                  required
                  type="text"
                  className="form-control"
                  id="inputFirstname"
                  placeholder="First Name"
                  onChange={(e) => {
                    setFname(e.target.value);
                    getDateandTime();
                  }}
                />
                <p className="fill-message">Please fill this form</p>
              </span>

              <span className="split-contain">
                <label htmlFor="inputLname" className="form-label">
                  Last Name :
                </label>
                <input
                  required
                  type="text"
                  className="form-control"
                  id="inputLastname"
                  placeholder="Last Name"
                  onChange={(e) => {
                    setLname(e.target.value);
                  }}
                />
                <p className="fill-message">Please fill this form</p>
              </span>
            </div>

            <div className="row-contain">
              <span className="split-contain">
                <label htmlFor="email" className="form-label">
                  Email :
                </label>

                <input
                  required
                  pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$"
                  type="email"
                  className="form-control"
                  id="inputEmail"
                  placeholder="admin@gmail.com"
                  onChange={(e) => {
                    setEmail(e.target.value);
                  }}
                />
                <p className="fill-message">Please fill this form</p>
              </span>

              <span className="split-contain">
                <label htmlFor="tel" className="form-label">
                  Tel :
                </label>

                <input
                  required
                  type="number"
                  className="form-control"
                  id="inputTel"
                  placeholder="095xxxxxxx"
                  onChange={(e) => {
                    setTel(e.target.value);
                  }}
                />
                <p className="fill-message">Please fill this form</p>
              </span>
            </div>

            <div className="row-contain">
              <span className="split-contain">
                <label htmlFor="UserType" className="form-label">
                  User Type :
                </label>

                <select
                  required
                  name="userType"
                  className="form-select"
                  id="inputUsertype"
                  onChange={(e) => {
                    Check(e.target.value);
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

              <span className="split-contain">
                <label htmlFor="DeviceType" className="form-label">
                  Device Type :
                </label>

                <select
                  required
                  name="deviceType"
                  className="form-select"
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

            <div className="solo">
              <span className="split-contain">
                <input
                  required
                  // disabled={etcDisable}
                  type={etcDisable}
                  className="form-control etc"
                  id="inputEtc"
                  placeholder="Etc please fill ..."
                  onChange={(e) => {
                    setEtc(e.target.value);
                  }}
                />
                
              </span>
            </div>

            <div className="row-contain">
              <span className="split-contain">
                <label htmlFor="deviceBrand" className="form-label">
                  Device Brand :
                </label>

                <input
                  required
                  type="text"
                  className="form-control"
                  id="inputdeviceBrand"
                  placeholder="Apple , Sumsung , ..."
                  onChange={(e) => {
                    setDbrand(e.target.value);
                  }}
                />
                <p className="fill-message">Please fill this form</p>
              </span>

              <span className="split-contain">
                <label htmlFor="deviceName" className="form-label">
                  Device Name :
                </label>

                <input
                  required
                  type="text"
                  className="form-control"
                  id="inputdeviceName"
                  placeholder=""
                  onChange={(e) => {
                    setDname(e.target.value);
                  }}
                />
                <p className="fill-message">Please fill this form</p>
              </span>
            </div>

            <div className="row-contain">
              <span className="split-contain">
                <label htmlFor="startDate" className="form-label">
                  Start Date :
                </label>

                <input
                  required
                  type="date"
                  className="form-control"
                  name="startDate"
                  id="startDate"
                  onChange={(e) => {
                    setStartdate(e.target.value);
                  }}
                />
                <p className="fill-message">Please fill this form</p>
              </span>

              <span className="split-contain">
                <label
                  hidden={Labelhide}
                  htmlFor="endDate"
                  className="form-label"
                >
                  End Date :
                </label>

                <input
                  required
                  type={IsDisable}
                  className="form-control"
                  name="endDate"
                  id="endDate"
                  onChange={(e) => {
                    setEnddate(e.target.value);
                  }}
                />
                <p className="fill-message">Please fill this form</p>
              </span>
            </div>

            <div className="row-contain">
              <span className="split-contain">
                <label htmlFor="remark" className="form-label">
                  Remark :
                </label>

                <input
                  type="text"
                  className="form-control remark"
                  name="remark"
                  id="remark"
                  onChange={(e) => {
                    setRemark(e.target.value);
                  }}
                />
              </span>
            </div>

            <div className="row-contain-butt">
              <input
                type=""
                className="btn regisbutt"
                value="Submit"
                onClick={addRequest}
              />

              <input type="" className="btn backbutt" value="Cancel" />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default UserSubmit;
