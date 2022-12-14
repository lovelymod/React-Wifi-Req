import "../style/edituser.css";
import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import Axios from "axios";
import Swal from "sweetalert2";
import { motion } from "framer-motion";
import Cookies from "js-cookie";
import axios from "axios";
import SideBar from "../components/sideBar";
import { yupResolver } from "@hookform/resolvers/yup";
import { schema } from "../components/schema";

function EditUser() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });
  const navigate = useNavigate();
  const location = useLocation();
  const showNewMember = location.state.newMemberList;
  const [newMember, setNewmember] = useState(showNewMember);

  const [fname, setFname] = useState(showNewMember[0].Firstname);
  const [lname, setLname] = useState(showNewMember[0].Lastname);
  const [email, setEmail] = useState(showNewMember[0].Email);
  const [tel, setTel] = useState(showNewMember[0].Tel);
  const [utype, setUtype] = useState(showNewMember[0].User_Type);
  const [dtype, setDtype] = useState(showNewMember[0].Device_Type);
  const [etc, setEtc] = useState(showNewMember[0].Device_Type);
  const [dbrand, setDbrand] = useState(showNewMember[0].Device_Brand);
  const [dname, setDname] = useState(showNewMember[0].Device_Name);
  const [startdate, setStartdate] = useState(showNewMember[0].Start_Date);
  const [enddate, setEnddate] = useState(showNewMember[0].End_Date);
  const [remark, setRemark] = useState(showNewMember[0].Remark);

  const [Labelhide, setLabelhide] = useState("");
  const [etcDisable, setetcDisable] = useState("");

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

  const swapData = () => {
    if (strDtype === "etc.") {
      strDtype = etc;
    }
  };

  const Back = () => navigate("/table");

  const UpdateData = async (id) => {
    swapData();
    await Axios.patch("http://localhost:5000/updateusers", {
      id: id,
      Firstname: fname,
      Lastname: lname,
      Email: email,
      Tel: tel,
      User_Type: utype,
      Device_Type: strDtype,
      Device_Brand: dbrand,
      Device_Name: dname,
      Start_Date: startdate,
      End_Date: enddate,
      Remark: remark,
    })
      .then((response) => {
        if (response.data.msg === "User Updated") {
          Swal.fire({
            icon: "success",
            title: "Editted",
            timer: 1200,
            timerProgressBar: true,
            showConfirmButton: false,
          });
          setTimeout(function () {
            navigate("/table");
          }, 1500);
        }
        setNewmember(
          newMember.map((val) => {
            return val.id === id
              ? {
                  id: id,
                  Firstname: fname,
                  Lastname: lname,
                  User_Type: utype,
                  Tel: tel,
                  Email: email,
                  Device_Type: dtype,
                  Device_Brand: dbrand,
                  Device_Name: dname,
                  Start_Date: startdate,
                  End_Date: enddate,
                  Remark: remark,
                }
              : val;
          })
        );
      })
      .catch((err) => {});
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

  const onFirstCheck = () => {
    if (
      newMember[0].Device_Type === "mobile" ||
      newMember[0].Device_Type === "notebook" ||
      newMember[0].Device_Type === "tablet" ||
      newMember[0].Device_Type === "ipad"
    ) {
      setetcDisable("hidden");
    } else {
      setetcDisable("");
    }
  };

  const onFirstCheckEnd = () => {
    if (!newMember[0].End_Date) {
      setLabelhide("hidden");
    } else {
      setLabelhide("");
    }
  };

  useEffect(() => {
    refreshToken();
    onFirstCheck();
    onFirstCheckEnd();
  }, []);

  return (
    <motion.div
      className="App6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ delay: 0.1 }}
    >
      <SideBar Back={Back} Logout={Logout} />
      <div className="bg6">
        <div className="headerInfo6">
          {window.innerWidth > 100 && window.innerWidth < 1000 ? (
            <div className="box66">
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="backbutt6"
                onClick={() => Back()}
              >
                {
                  <ArrowBackIosIcon
                    sx={{ fontSize: "32px", color: "#0174B3" }}
                  />
                }
              </motion.button>
              <p className="afterButt6">Edit User</p>
            </div>
          ) : (
            <div className="box66">
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="backbutt6"
                onClick={() => Back()}
              >
                {
                  <ArrowBackIosIcon
                    sx={{ fontSize: "32px", color: "#FFB401" }}
                  />
                }
              </motion.button>
              <p className="afterButt6">Edit User</p>
            </div>
          )}
          <div className="row-nameButt4">
            <button className="nameButt4" onClick={() => Back()}>
              <p className="message4">Wi-Fi Request List</p>
            </button>
            <p className="message4-back">/Edit</p>
          </div>
        </div>
        {showNewMember.map((val, key) => {
          return (
            <div className="contain-data6" key={val.id}>
              <form onSubmit={handleSubmit(() => UpdateData(val.id))}>
                <div className="row-data6">
                  <span className="split-contain6">
                    <label htmlFor="inputFname" className="form-label fl6">
                      First Name :
                    </label>

                    <input
                      className=" form-control fc6"
                      type="text"
                      defaultValue={val.Firstname}
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
                  <span className="split-contain6">
                    <label htmlFor="inputLname" className="form-label fl6">
                      Last Name :
                    </label>
                    <input
                      type="text"
                      className=" form-control fc6"
                      id="inputLastname"
                      defaultValue={val.Lastname}
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
                <div className="row-data6">
                  <span className="split-contain6">
                    <label htmlFor="email" className="form-label fl6">
                      Email :
                    </label>

                    <input
                      type="text"
                      className=" form-control fc6"
                      id="inputEmail"
                      defaultValue={val.Email}
                      {...register("inputEmail", {
                        onChange: (e) => setEmail(e.target.value),
                      })}
                    />
                    {errors?.inputEmail && (
                      <p className="fill-message">
                        {errors.inputEmail.message}
                      </p>
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
                      defaultValue={val.Tel}
                      {...register("inputTel", {
                        onChange: (e) => setTel(e.target.value),
                      })}
                    />
                    {errors?.inputTel && (
                      <p className="fill-message">{errors.inputTel.message}</p>
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
                      defaultValue={val.User_Type}
                      {...register("inputUsertype", {
                        onChange: (e) => {
                          setUtype(e.target.value);
                          HideLabel(e.target.value);
                        },
                      })}
                    >
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
                        val.Device_Type !== "mobile" &&
                        val.Device_Type !== "notebook" &&
                        val.Device_Type !== "tablet" &&
                        val.Device_Type !== "ipad"
                          ? "etc."
                          : val.Device_Type
                      }
                      {...register("inputDevicetype", {
                        onChange: (e) => {
                          Checketc(e.target.value);
                          setDtype(e.target.value);
                        },
                      })}
                    >
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
                      defaultValue={
                        val.Device_Type === "mobile" ||
                        val.Device_Type === "notebook" ||
                        val.Device_Type === "tablet" ||
                        val.Device_Type === "ipad"
                          ? null
                          : val.Device_Type
                      }
                      {...register("inputEtc", {
                        onChange: (e) => setEtc(e.target.value),
                      })}
                    />
                    {errors.inputEtc && (
                      <p className="fill-message">
                        {errors?.inputEtc?.message}
                      </p>
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
                      defaultValue={val.Device_Brand}
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

                  <span className="split-contain6">
                    <label htmlFor="deviceName" className="form-label fl6">
                      Device Name :
                    </label>

                    <input
                      type="text"
                      className=" form-control fc6"
                      id="inputdeviceName"
                      defaultValue={val.Device_Name}
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
                      defaultValue={val.Start_Date}
                      {...register("startDate", {
                        onChange: (e) => setStartdate(e.target.value),
                      })}
                    />
                    {errors.startDate && (
                      <p className="fill-message">
                        {errors?.startDate?.message}
                      </p>
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
                      defaultValue={val.End_Date}
                      {...register("endDate", {
                        onChange: (e) => setEnddate(e.target.value),
                      })}
                    />
                    {errors.endDate && (
                      <p className="fill-message">{errors?.endDate?.message}</p>
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
                      defaultValue={val.Remark}
                      {...register("remark", {
                        onChange: (e) => setRemark(e.target.value),
                      })}
                    />
                  </span>
                </div>
                <div className="row-butt6">
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    className="btn savebutt6"
                  >
                    Save
                  </motion.button>

                  <motion.input
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    type="button"
                    className="btn cancelbutt6"
                    value="Cancel"
                    onClick={() => Back()}
                  />
                </div>
              </form>
            </div>
          );
        })}
      </div>
    </motion.div>
  );
}

export default EditUser;
