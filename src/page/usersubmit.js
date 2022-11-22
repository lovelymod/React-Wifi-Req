import "./usersubmit.css";
import { useState } from "react";
import Axios from "axios";
import { useForm } from "react-hook-form";
import moment from "moment";
import Swal from "sweetalert2";
import { motion } from "framer-motion";
function UserSubmit() {
  const {
    register,
    handleSubmit,
    resetField,
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

  const strUtype = utype;
  let strDtype = dtype;

  const OnSubmit = (event) => {
    addRequest();
  };
  const addRequest = () => {
    swapData();
    const dates = moment().format("YYYY-MM-DD");
    const times = moment().format("HH:mm");

    Axios.post("http://localhost:3002/users", {
      Firstname: fname,
      Lastname: lname,
      User_Type: strUtype,
      Tel: tel,
      Email: email,
      Device_Type: strDtype,
      Device_Brand: dbrand,
      Device_Name: dname,
      Start_Date: startdate,
      End_Date: enddate,
      Remark: remark,
      Dates: dates,
      Times: times,
    }).then((response) => {
      if (response.data.msg === "User Created") {
        Swal.fire({
          icon: "success",
          title: "Submited",
          showConfirmButton: false,
          timer: 1500,
        });
        resetField("inputFirstname");
        resetField("inputLastname");
        resetField("inputEmail");
        resetField("inputTel");
        resetField("inputUsertype");
        resetField("inputDevicetype");
        resetField("inputEtc");
        resetField("inputdeviceBrand");
        resetField("inputdeviceName");
        resetField("startDate");
        resetField("endDate");
        resetField("remark");
      }
    });
  };

  //   Axios.post("http://localhost:3001/create", {
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
  //   }).then((response) => {
  //     if (response.data.message === "Inserted") {
  //       Swal.fire({
  //         icon: "success",
  //         title: "Submited",
  //         showConfirmButton: false,
  //         timer: 1500,
  //       });
  //       resetField("inputFirstname");
  //       resetField("inputLastname");
  //       resetField("inputEmail");
  //       resetField("inputTel");
  //       resetField("inputUsertype");
  //       resetField("inputDevicetype");
  //       resetField("inputEtc");
  //       resetField("inputdeviceBrand");
  //       resetField("inputdeviceName");
  //       resetField("startDate");
  //       resetField("endDate");
  //       resetField("remark");
  //     }
  //   });
  // };

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

  return (
    <motion.div
      className="App1"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ delay: 0.1 }}
    >
      <div className="bg1">
        <div className="images1">
          <img className="logo1" src="img/LS-01.png" alt="" srcSet="" />
        </div>

        <div className="header1">
          <h1 className="message">Please fill out a request form</h1>
        </div>
        <div className="container1">
          <form onSubmit={handleSubmit(OnSubmit)}>
            <div className="row-contain1">
              <span className="split-contain1">
                <label htmlFor="inputFname" className="form-label">
                  First Name :
                </label>

                <input
                  className="form-control"
                  type="text"
                  placeholder="First Name"
                  {...register("inputFirstname", {
                    onChange: (e) => setFname(e.target.value),
                    required: true,
                  })}
                />
                {errors.inputFirstname && (
                  <p className="fill-message">Please fill this form</p>
                )}
              </span>

              <span className="split-contain1">
                <label htmlFor="inputLname" className="form-label">
                  Last Name :
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="inputLastname"
                  placeholder="Last Name"
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

            <div className="row-contain1">
              <span className="split-contain1">
                <label htmlFor="email" className="form-label">
                  Email :
                </label>

                <input
                  type="email"
                  className="form-control"
                  id="inputEmail"
                  placeholder="admin@gmail.com"
                  {...register("inputEmail", {
                    onChange: (e) => setEmail(e.target.value),
                    required: "Please fill this form",
                    pattern: {
                      value: /[a-z0-9._]+@[a-z0-9.-]+.[a-z]{2,}$/,
                      message: "Please correct this form",
                    },
                  })}
                />
                {errors?.inputEmail && (
                  <p className="fill-message">{errors.inputEmail.message}</p>
                )}
              </span>

              <span className="split-contain1">
                <label htmlFor="tel" className="form-label">
                  Tel :
                </label>

                <input
                  type="number"
                  className="form-control"
                  id="inputTel"
                  placeholder="095xxxxxxx"
                  {...register("inputTel", {
                    onChange: (e) => setTel(e.target.value),
                    required: "Please fill this form",
                    maxLength: {
                      value: 10,
                      message: "Password must have at most 10 characters",
                    },
                    minLength: {
                      value: 9,
                      message: "Password must have at least 8 characters",
                    },
                  })}
                />
                {errors?.inputTel && (
                  <p className="fill-message">{errors.inputTel.message}</p>
                )}
              </span>
            </div>

            <div className="row-contain1">
              <span className="split-contain1">
                <label htmlFor="UserType" className="form-label">
                  User Type :
                </label>

                <select
                  name="userType"
                  className="form-select"
                  id="inputUsertype"
                  {...register("inputUsertype", {
                    onChange: (e) => {
                      setUtype(e.target.value);
                      HideLabel(e.target.value);
                    },
                    required: "Please select one option",
                  })}
                >
                  <option disabled selected value="">
                    Please Select
                  </option>
                  <option value="staff">Staff</option>
                  <option value="internship">Internship</option>
                  <option value="guest">Guest</option>
                </select>
                {errors?.inputUsertype && (
                  <p className="fill-message">{errors.inputUsertype.message}</p>
                )}
              </span>

              <span className="split-contain1">
                <label htmlFor="DeviceType" className="form-label">
                  Device Type :
                </label>

                <select
                  name="deviceType"
                  className="form-select"
                  id="inputDevicetype"
                  {...register("inputDevicetype", {
                    onChange: (e) => {
                      Checketc(e.target.value);
                      setDtype(e.target.value);
                    },
                    required: "Please select one option",
                  })}
                >
                  <option disabled selected value="">
                    Please Select
                  </option>
                  <option value="mobile">Mobile</option>
                  <option value="notebook">Notebook</option>
                  <option value="tablet">Tablet</option>
                  <option value="ipad">Ipad</option>
                  <option value="etc.">etc.</option>
                </select>
                {errors?.inputDevicetype && (
                  <p className="fill-message">
                    {errors.inputDevicetype.message}
                  </p>
                )}
              </span>
            </div>

            <div className="solo1" hidden={etcDisable}>
              <span className="split-contain1">
                <input
                  type="text"
                  className="form-control etc"
                  id="inputEtc"
                  placeholder="Etc please fill ..."
                  {...register("inputEtc", {
                    onChange: (e) => setEtc(e.target.value),
                    required: dtype === "etc." ? true : false,
                  })}
                />
                {errors.inputEtc && (
                  <p className="fill-message">Please fill this form</p>
                )}
              </span>
            </div>

            <div className="row-contain1">
              <span className="split-contain1">
                <label htmlFor="deviceBrand" className="form-label">
                  Device Brand :
                </label>

                <input
                  type="text"
                  className="form-control"
                  id="inputdeviceBrand"
                  placeholder="Apple , Sumsung , ..."
                  {...register("inputdeviceBrand", {
                    onChange: (e) => setDbrand(e.target.value),
                    required: true,
                  })}
                />
                {errors.inputdeviceBrand && (
                  <p className="fill-message">Please fill this form</p>
                )}
              </span>

              <span className="split-contain1">
                <label htmlFor="deviceName" className="form-label">
                  Device Name :
                </label>

                <input
                  type="text"
                  className="form-control"
                  id="inputdeviceName"
                  placeholder=""
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

            <div className="row-contain1">
              <span className="split-contain1">
                <label htmlFor="startDate" className="form-label">
                  Start Date :
                </label>

                <input
                  type="date"
                  className="form-control"
                  name="startDate"
                  id="startDate"
                  {...register("startDate", {
                    onChange: (e) => setStartdate(e.target.value),
                    required: true,
                  })}
                />
                {errors.startDate && (
                  <p className="fill-message">Please fill this form</p>
                )}
              </span>

              <span className="split-contain1" hidden={Labelhide}>
                <label htmlFor="endDate" className="form-label">
                  End Date :
                </label>
                <input
                  type="date"
                  className="form-control"
                  name="endDate"
                  id="endDate"
                  {...register("endDate", {
                    onChange: (e) => setEnddate(e.target.value),
                    required: utype === "staff" ? false : true,
                  })}
                />
                {errors.endDate && (
                  <p className="fill-message">Please fill this form</p>
                )}
              </span>
            </div>

            <div className="row-contain1">
              <span className="split-containRemark1">
                <label htmlFor="remark" className="form-label">
                  Remark :
                </label>

                <textarea
                  type="text"
                  className="form-control remark1"
                  name="remark"
                  id="remark"
                  {...register("remark", {
                    onChange: (e) => setRemark(e.target.value),
                    required: false,
                  })}
                />
              </span>
            </div>

            <div className="row-contain-butt1">
              <input type="submit" className="btn regisbutt" value="Submit" />

              <input type="" className="btn backbutt" value="Cancel" />
            </div>
          </form>
        </div>
      </div>
    </motion.div>
  );
}

export default UserSubmit;
