import "./App.css";
import { useState } from "react";
import Axios from "axios";

function App() {
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

  const strUtype = utype;
  let strDtype = dtype;

  const [wifireqList, setWifiReqList] = useState([]);

  // const getRequest = () => {
  //   Axios.get('http://localhost:3001/wifirequest').then((Response) => {
  //     setWifiReqList(Response.data);
  //   })
  // }

  const addRequest = () => {
    swapData();
    Axios.post("http://localhost:3001/create", {
      firstname: fname,
      lastname: lname,
      usertype: strUtype,
      tel: tel,
      email: email,
      dtype: strDtype,
      // devicetype: etc,
      dbrand: dbrand,
      dname: dname,
      startdate: startdate,
      enddate: enddate,
      remark: remark,
    }).then(() => {
      setWifiReqList([
        ...wifireqList,
        {
          firstname: fname,
          lastname: lname,
          usertype: strUtype,
          tel: tel,
          email: email,
          dtype: strDtype,
          // devicetype: etc,
          dbrand: dbrand,
          dname: dname,
          startdate: startdate,
          enddate: enddate,
          remark: remark,
        },
      ]);
    });
  };

  const [IsDisable, setIsDisable] = useState("");
  const [etcDisable, setetcDisable] = useState("");

  const swapData = () => {
    if(strDtype === 'etc.'){
      strDtype = etc;
    }
  };

  const Check = (value) => {
    if (value === "staff") {
      setIsDisable(true);
    } else if (value !== "staff") {
      setIsDisable(false);
    }
  };

  const Checketc = (value) => {
    if (value === "etc.") {
      setetcDisable(false);
    } else if (value !== "etc.") {
      setetcDisable(true);
    }
  };

  return (
    <div className="App">
      <div className="header">
        <h1>Please fill out a request form</h1>
      </div>
      <div className="container">
        <form action="">
          <label htmlFor="inputFname" className="form-label">
            Firstname :
          </label>
          <div className="col-sm-10">
            <input
              type="text"
              className="form-control"
              id="inputFirstname"
              placeholder="Firstname(English)"
              onChange={(e) => {
                setFname(e.target.value);
              }}
            />
          </div>

          <label htmlFor="inputLname" className="form-label">
            Lastname :
          </label>
          <div className="col-sm-10">
            <input
              type="text"
              className="form-control"
              id="inputLastname"
              placeholder="Lastname(English)"
              onChange={(e) => {
                setLname(e.target.value);
              }}
            />
          </div>

          <label htmlFor="UserType" className="form-label">
            {" "}
            User Type :
          </label>
          <div className="col-sm-10">
            <select
              name="userType"
              className="form-select"
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

          <label htmlFor="tel" className="form-label">
            Tel :
          </label>
          <div className="col-sm-10">
            <input
              type="text"
              className="form-control"
              id="inputTel"
              placeholder="055xxxxxxx"
              onChange={(e) => {
                setTel(e.target.value);
              }}
            />
          </div>

          <label htmlFor="email" className="form-label">
            Email :
          </label>
          <div className="col-sm-10">
            <input
              type="email"
              className="form-control"
              id="inputEmail"
              placeholder="admin@gmail.com"
              onChange={(e) => {
                setEmail(e.target.value);
              }}
            />
          </div>

          <label htmlFor="DeviceType" className="form-label">
            {" "}
            Device Type :
          </label>
          <div className="col-sm-10">
            {/* <select name="deviceType" className='form-select' id="inputDevicetype" onChange={(e) => {Checketc(e.target.value);setDtype(e.target.value)}}> */}
            <select
              name="deviceType"
              className="form-select"
              id="inputDevicetype"
              onChange={(e) => {
                Checketc(e.target.value);
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

          <div className="col-sm-10">
            <input
              disabled={etcDisable}
              type="text"
              className="form-control etc"
              id="inputEtc"
              placeholder="Etc please fill ..."
              onChange={(e) => {
                setEtc(e.target.value);
              }}
            />
          </div>

          <label htmlFor="deviceBrand" className="form-label">
            Device Brand :
          </label>
          <div className="col-sm-10">
            <input
              type="text"
              className="form-control"
              id="inputdeviceBrand"
              placeholder="Apple , Sumsung , ..."
              onChange={(e) => {
                setDbrand(e.target.value);
              }}
            />
          </div>

          <label htmlFor="deviceName" className="form-label">
            Device Name :
          </label>
          <div className="col-sm-10">
            <input
              type="text"
              className="form-control"
              id="inputdeviceName"
              placeholder=""
              onChange={(e) => {
                setDname(e.target.value);
              }}
            />
          </div>

          <label htmlFor="startDate" className="form-label">
            Start Date :
          </label>
          <div className="col-sm-10">
            <input
              type="date"
              className="form-control"
              name="startDate"
              id="startDate"
              onChange={(e) => {
                setStartdate(e.target.value);
              }}
            />
          </div>

          <label htmlFor="endDate" className="form-label">
            End Date :
          </label>
          <div className="col-sm-10">
            <input
              disabled={IsDisable}
              type="date"
              className="form-control"
              name="endDate"
              id="endDate"
              onChange={(e) => {
                setEnddate(e.target.value);
              }}
            />
          </div>

          <label htmlFor="remark" className="form-label">
            Remark :
          </label>
          <div className="col-sm-10">
            <input
              type="text"
              className="form-control"
              name="remark"
              id="remark"
              onChange={(e) => {
                setRemark(e.target.value);
              }}
            />
          </div>

          <input
            type="submit"
            className="btn btn-primary"
            value="Submit"
            onClick={addRequest}
          />
        </form>
      </div>
    </div>
  );
}

export default App;
