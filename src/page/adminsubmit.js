import "./admidsubmit.css";
import { useState, useEffect } from "react";
import Axios from "axios";
import { useForm } from "react-hook-form";
import LogoutOutlinedIcon from "@mui/icons-material/LogoutOutlined";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import { useNavigate } from "react-router-dom";
import moment from "moment";
import Swal from "sweetalert2";
import { motion } from "framer-motion";
import ListIcon from "@mui/icons-material/List";

function AdminSub() {
  const navigate = useNavigate();
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

  const [Labelhide, setLabelhide] = useState("");
  const [etcDisable, setetcDisable] = useState("hidden");

  const strUtype = utype;
  let strDtype = dtype;

  const OnSubmit = () => {
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
          timerProgressBar: true,
          timer: 1200,
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
        setTimeout(function () {
          navigate("/table");
        }, 1500);
      }
    });
  };

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

  const auth = () => {
    const checkUser = localStorage.getItem("auth");
    if (checkUser !== "adminLogin") {
      navigate("/login");
    }
  };

  const BtoLogin = () => {
    localStorage.removeItem("auth");
    navigate("/login");
  };

  const Back = () => {
    navigate("/table");
  };

  useEffect(() => {
    auth();
  }, []);

  return (
    <motion.div
      className="AppAdmin4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ delay: 0.1 }}
    >
      <div className="imagesAdmin4">
        <div className="boxtop4">
          {window.innerWidth > 100 && window.innerWidth < 1000 ? (
            <div>
              <img
                className="logoAdmin4"
                src="img/LS-02.png"
                alt=""
                srcSet=""
              />
            </div>
          ) : (
            <div className="box-intop">
              <img
                className="logoAdmin4"
                src="img/LS-01.png"
                alt=""
                srcSet=""
              />
              <button
                className="ListIcon4"
                onClick={() => {
                  Back();
                }}
              >
                <ListIcon sx={{ fontSize: "32px", color: "white" }} />
              </button>
            </div>
          )}
        </div>
        <div className="boxbottom4">
          {window.innerWidth > 601 && window.innerWidth < 1000 ? (
            <div>
              <button
                className="ListIcon4"
                onClick={() => {
                  Back();
                }}
              >
                <ListIcon sx={{ fontSize: "32px", color: "#0174B3" }} />
              </button>
              <button
                className="icon4"
                onClick={() => {
                  BtoLogin();
                }}
              >
                <LogoutOutlinedIcon
                  className="icon-exit4"
                  sx={{ fontSize: "40px", color: "white" }}
                />
              </button>
            </div>
          ) : (
            <div>
              <button
                className="icon4"
                onClick={() => {
                  BtoLogin();
                }}
              >
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
            <div className="box44">
              <button
                className="backbuttAdminTop4"
                onClick={() => {
                  Back();
                }}
              >
                {
                  <ArrowBackIosIcon
                    sx={{ fontSize: "32px", color: "#0174B3" }}
                  />
                }{" "}
              </button>
              <p className="afterButt4">Create User</p>
            </div>
          ) : (
            <div className="box44">
              <button
                className="backbuttAdminTop4"
                onClick={() => {
                  Back();
                }}
              >
                {
                  <ArrowBackIosIcon
                    sx={{ fontSize: "32px", color: "#FFB401" }}
                  />
                }{" "}
              </button>
              <p className="afterButt4">Create User</p>
            </div>
          )}
          <div className="row-nameButt4">
            <button
              className="nameButt4"
              onClick={() => {
                Back();
              }}
            >
              <p className="message4">Wi-Fi Request List</p>
            </button>
            <p className="message4-back">/Create User</p>
          </div>
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
                  type="text"
                  className=" form-control fcAdmin4"
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

              <span className="split-contain4">
                <label htmlFor="inputLname" className="form-label flAdmin4">
                  Last Name :
                </label>
                <input
                  type="text"
                  className=" form-control fcAdmin4"
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

            <div className="row-containAdmin4">
              <span className="split-contain4">
                <label htmlFor="email" className="form-label flAdmin4">
                  Email :
                </label>

                <input
                  type="email"
                  className=" form-control fcAdmin4"
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

              <span className="split-contain4">
                <label htmlFor="tel" className="form-label flAdmin4">
                  Tel :
                </label>

                <input
                  type="number"
                  className=" form-control fcAdmin4"
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

            <div className="row-containAdmin4">
              <span className="split-contain4">
                <label htmlFor="UserType" className="form-label flAdmin4">
                  User Type :
                </label>

                <select
                  name="userType"
                  className="form-select fsAdmin4"
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

              <span className="split-contain4">
                <label htmlFor="DeviceType" className="form-label flAdmin4">
                  Device Type :
                </label>

                <select
                  name="deviceType"
                  className="form-select fsAdmin4"
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

            <div className="solo4" hidden={etcDisable}>
              <span className="split-contain4">
                <input
                  type="text"
                  className=" form-control fcAdmin4 etc4"
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
                  {...register("inputdeviceBrand", {
                    onChange: (e) => setDbrand(e.target.value),
                    required: true,
                  })}
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
                  {...register("startDate", {
                    onChange: (e) => setStartdate(e.target.value),
                    required: true,
                  })}
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
                  {...register("remark", {
                    onChange: (e) => setRemark(e.target.value),
                    required: false,
                  })}
                />
              </span>
            </div>

            <div className="row-containAdmin-butt4">
              <input
                type="submit"
                className="btn regisbuttAdmin4"
                value="Submit"
              />

              <input
                type=""
                className="btn backbuttAdmin4"
                value="Cancel"
                onClick={() => {
                  Back();
                }}
              />
            </div>
          </form>
        </div>
      </div>
    </motion.div>
  );
}

export default AdminSub;
