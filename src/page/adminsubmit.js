import "../style/admidsubmit.css";
import SideBar from "../components/sideBar";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import Axios from "axios";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import moment from "moment";
import Swal from "sweetalert2";
import Cookies from "js-cookie";
import axios from "axios";
import { yupResolver } from "@hookform/resolvers/yup";
import { schema } from "../components/schema";

function AdminSub() {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    resetField,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });
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

  const refreshToken = async () => {
    try {
      const refreshToken = Cookies.get("refreshToken");
      await axios.get("http://localhost:5000/token", {
        params: { refreshToken: refreshToken },
      });
    } catch (error) {
      if (error.response) {
        navigate("/login");
      }
    }
  };

  const Logout = async () => {
    try {
      const refreshToken = Cookies.get("refreshToken");
      await axios.delete("http://localhost:5000/logout", {
        params: { refreshToken: refreshToken },
      });
      Cookies.remove("refreshToken");
      navigate("/login");
    } catch (error) {
      console.log(error);
    }
  };

  const Back = () => navigate("/table");
  const OnSubmit = () => addRequest();

  const addRequest = async () => {
    swapData();
    const dates = moment().format("YYYY-MM-DD");
    const times = moment().format("HH:mm");

    await Axios.post("http://localhost:5000/users", {
      Firstname: fname,
      Lastname: lname,
      User_Type: strUtype,
      Tel: tel,
      Email: email,
      Device_Type: strDtype,
      Device_Brand: dbrand,
      Device_Name: dname,
      Start_Date: startdate,
      End_Date: strUtype === "staff" ? "" : enddate,
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

  useEffect(() => {
    refreshToken();
  }, []);

  return (
    <div className="AppAdmin4">
      <SideBar Back={Back} Logout={Logout} />
      <div className="bgAdmin4">
        <div className="headerAdmin4">
          {window.innerWidth > 100 && window.innerWidth < 1000 ? (
            <div className="box44">
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="backbuttAdminTop4"
                onClick={() => Back()}
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
                onClick={() => Back()}
              >
                {
                  <ArrowBackIosIcon
                    sx={{ fontSize: "32px", color: "#ffb401" }}
                  />
                }{" "}
              </motion.button>
              <p className="afterButt4">Create User</p>
            </div>
          )}
          <div className="row-nameButt4">
            <button className="nameButt4" onClick={() => Back()}>
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
                  })}
                />
                {errors.inputFirstname && (
                  <p className="fill-message">
                    {errors?.inputFirstname?.message}
                  </p>
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
                  })}
                />
                {errors.inputLastname && (
                  <p className="fill-message">
                    {errors?.inputLastname?.message}
                  </p>
                )}
              </span>
            </div>

            <div className="row-containAdmin4">
              <span className="split-contain4">
                <label htmlFor="email" className="form-label flAdmin4">
                  Email : <p className="star">*</p>
                </label>

                <input
                  type="text"
                  className=" form-control fcAdmin4"
                  id="inputEmail"
                  placeholder="admin@gmail.com"
                  {...register("inputEmail", {
                    onChange: (e) => setEmail(e.target.value),
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
                  })}
                />
                {errors.inputEtc && (
                  <p className="fill-message">{errors?.inputEtc?.message}</p>
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
                  })}
                />
                {errors.inputdeviceBrand && (
                  <p className="fill-message">
                    {errors?.inputdeviceBrand?.message}
                  </p>
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
                  })}
                />
                {errors.inputdeviceName && (
                  <p className="fill-message">
                    {errors?.inputdeviceName?.message}
                  </p>
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
                  })}
                />
                {errors.startDate && (
                  <p className="fill-message">{errors?.startDate?.message}</p>
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
                  })}
                />
                {errors.endDate && (
                  <p className="fill-message">{errors?.endDate?.message}</p>
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
                onClick={() => Back()}
              />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default AdminSub;
