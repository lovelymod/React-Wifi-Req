import "./admidsubmit.css";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import Axios from "axios";
import LogoutOutlinedIcon from "@mui/icons-material/LogoutOutlined";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import moment from "moment";
import Swal from "sweetalert2";
import ListIcon from "@mui/icons-material/List";
import jwt_decode from "jwt-decode";

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

  const [Username, setUsername] = useState("");
  const [token, setToken] = useState("");
  const [expire, setExpire] = useState("");

  const refreshToken = async () => {
    try {
      const response = await Axios.get("http://localhost:3002/token");
      setToken(response.data.accessToken);
      const decoded = jwt_decode(response.data.accessToken);
      setUsername(decoded.Username);
      setExpire(decoded.exp);
    } catch (error) {
      if (error.response) {
        navigate("/login");
        localStorage.clear();
        console.log(error.response);
      }
    }
  };

  const axiosJWT = Axios.create();

  axiosJWT.interceptors.request.use(
    async (config) => {
      const currentDate = new Date();
      if (expire * 1000 < currentDate.getTime()) {
        const response = await Axios.get("http://localhost:3002/token");
        config.headers.Authorization = `Bearer ${response.data.accessToken}`;
        setToken(response.data.accessToken);
        const decoded = jwt_decode(response.data.accessToken);
        setUsername(decoded.Username);
        setExpire(decoded.exp);
      }
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

  const getUserAdmin = async () => {
    await axiosJWT.get("http://localhost:3002/useradmin", {
      headers: {
        Username: Username,
        Authorization: `Bearer ${token}`,
      },
    });
  };

  const Logout = async () => {
    try {
      await Axios.delete("http://localhost:3002/logout");
      localStorage.clear();
      navigate("/login");
    } catch (error) {
      console.log(error);
    }
  };

  const OnSubmit = () => {
    addRequest();
  };

  const addRequest = async () => {
    swapData();
    const dates = moment().format("YYYY-MM-DD");
    const times = moment().format("HH:mm");

    await Axios.post("http://localhost:3002/users", {
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

  const Back = () => {
    navigate("/table");
  };

  useEffect(() => {
    refreshToken();
    getUserAdmin();
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
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="ListIcon4"
                onClick={() => {
                  Back();
                }}
              >
                <ListIcon sx={{ fontSize: "32px", color: "white" }} />
              </motion.button>
            </div>
          )}
        </div>
        <div className="boxbottom4">
          {window.innerWidth > 601 && window.innerWidth < 1000 ? (
            <div>
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="ListIcon4"
                onClick={() => {
                  Back();
                }}
              >
                <ListIcon sx={{ fontSize: "32px", color: "#0174B3" }} />
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="icon4"
                onClick={() => {
                  Logout();
                }}
              >
                <LogoutOutlinedIcon
                  className="icon-exit4"
                  sx={{ fontSize: "40px", color: "white" }}
                />
              </motion.button>
            </div>
          ) : (
            <div>
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="icon4"
                onClick={() => {
                  Logout();
                }}
              >
                <LogoutOutlinedIcon
                  className="icon-exit4"
                  style={{ fontSize: "40px", color: "#0174B3" }}
                />
              </motion.button>
            </div>
          )}
        </div>
      </div>
      <div className="bgAdmin4">
        <div className="headerAdmin4">
          {window.innerWidth > 601 && window.innerWidth < 1000 ? (
            <div className="box44">
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
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
              </motion.button>
              <p className="afterButt4">Create User</p>
            </div>
          ) : (
            <div className="box44">
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
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
              </motion.button>
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
              <h3>Please fill out user information</h3>
            </div>
            <div className="row-containAdmin4">
              <span className="split-contain4">
                <label htmlFor="inputFname" className="form-label flAdmin4">
                  First Name : <p className="star">*</p>
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
                  Last Name : <p className="star">*</p>
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
                  Email : <p className="star">*</p>
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
                  Tel : <p className="star">*</p>
                </label>

                <input
                  type="text"
                  className=" form-control fcAdmin4"
                  id="inputTel"
                  placeholder="095xxxxxxx"
                  {...register("inputTel", {
                    onChange: (e) => setTel(e.target.value),
                    required: "Please fill this form",
                    maxLength: {
                      value: 12,
                      message: "Phone number must most 10 characters",
                    },
                    minLength: {
                      value: 10,
                      message: "Phone number must least 10 characters",
                    },
                    pattern: {
                      value: /(^[0-9]{10}$)|(^[0-9]{3}-[0-9]{3}-[0-9]{4}$)/,
                      message: "Please correct this form",
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
                  User Type : <p className="star">*</p>
                </label>

                <select
                  name="userType"
                  className="form-select fsAdmin4"
                  id="inputUsertype"
                  defaultValue=""
                  {...register("inputUsertype", {
                    onChange: (e) => {
                      setUtype(e.target.value);
                      HideLabel(e.target.value);
                    },
                    required: "Please select one option",
                  })}
                >
                  <option disabled value="">
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
                  Device Type : <p className="star">*</p>
                </label>

                <select
                  name="deviceType"
                  className="form-select fsAdmin4"
                  id="inputDevicetype"
                  defaultValue=""
                  {...register("inputDevicetype", {
                    onChange: (e) => {
                      Checketc(e.target.value);
                      setDtype(e.target.value);
                    },
                    required: "Please select one option",
                  })}
                >
                  <option disabled value="">
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
                  Device Brand : <p className="star">*</p>
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
                  Device Name : <p className="star">*</p>
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
                  Start Date : <p className="star">*</p>
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
                  End Date : <p className="star">*</p>
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
              <motion.input
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                type="submit"
                className="btn regisbuttAdmin4"
                value="Submit"
              />

              <motion.input
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                type="button"
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
