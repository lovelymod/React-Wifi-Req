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
<>
  <div className="row-contain1">
    <span className="split-contain1">
      <label htmlFor="inputFname" className="form-label fl1">
        First Name : <p className="star">*</p>
      </label>

      <input
        autoFocus
        className="form-control"
        type="text"
        {...register("inputFirstname", {
          onChange: (e) => setFname(e.target.value),
        })}
      />
      {errors.inputFirstname && <p className="fill-message">{errors?.inputFirstname?.message}</p>}
    </span>

    <span className="split-contain1">
      <label htmlFor="inputLname" className="form-label fl1">
        Last Name : <p className="star">*</p>
      </label>
      <input
        type="text"
        className="form-control"
        id="inputLastname"
        {...register("inputLastname", {
          onChange: (e) => setLname(e.target.value),
        })}
      />
      {errors.inputLastname && <p className="fill-message">{errors?.inputLastname?.message}</p>}
    </span>
  </div>

  <div className="row-contain1">
    <span className="split-contain1">
      <label htmlFor="email" className="form-label fl1">
        Email : <p className="star">*</p>
      </label>

      <input
        type="text"
        className="form-control"
        id="inputEmail"
        {...register("inputEmail", {
          onChange: (e) => setEmail(e.target.value),
        })}
      />
      {errors?.inputEmail && <p className="fill-message">{errors.inputEmail.message}</p>}
    </span>

    <span className="split-contain1">
      <label htmlFor="tel" className="form-label fl1">
        Tel : <p className="star">*</p>
      </label>

      <input
        type="text"
        className="form-control"
        id="inputTel"
        {...register("inputTel", {
          onChange: (e) => setTel(e.target.value),
        })}
      />
      {errors?.inputTel && <p className="fill-message">{errors.inputTel.message}</p>}
    </span>
  </div>

  <div className="row-contain1">
    <span className="split-contain1">
      <label htmlFor="UserType" className="form-label fl1">
        User Type : <p className="star">*</p>
      </label>

      <select
        name="userType"
        className="form-select"
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
      {errors?.inputUsertype && <p className="fill-message">{errors.inputUsertype.message}</p>}
    </span>

    <span className="split-contain1">
      <label htmlFor="DeviceType" className="form-label fl1">
        Device Type : <p className="star">*</p>
      </label>

      <select
        name="deviceType"
        className="form-select"
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
      {errors?.inputDevicetype && <p className="fill-message">{errors.inputDevicetype.message}</p>}
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
        })}
      />
      {errors.inputEtc && <p className="fill-message">{errors?.inputEtc?.message}</p>}
    </span>
  </div>

  <div className="row-contain1">
    <span className="split-contain1">
      <label htmlFor="deviceBrand" className="form-label fl1">
        Device Brand : <p className="star">*</p>
      </label>

      <input
        type="text"
        className="form-control"
        id="inputdeviceBrand"
        {...register("inputdeviceBrand", {
          onChange: (e) => setDbrand(e.target.value),
        })}
      />
      {errors.inputdeviceBrand && <p className="fill-message">{errors?.inputdeviceBrand?.message}</p>}
    </span>

    <span className="split-contain1">
      <label htmlFor="deviceName" className="form-label fl1">
        Device Name : <p className="star">*</p>
      </label>

      <input
        type="text"
        className="form-control"
        id="inputdeviceName"
        {...register("inputdeviceName", {
          onChange: (e) => setDname(e.target.value),
        })}
      />
      {errors.inputdeviceName && <p className="fill-message">{errors?.inputdeviceName?.message}</p>}
    </span>
  </div>

  <div className="row-contain1">
    <span className="split-contain1">
      <label htmlFor="startDate" className="form-label fl1">
        Start Date : <p className="star">*</p>
      </label>

      <input
        type="date"
        className="form-control"
        name="startDate"
        id="startDate"
        {...register("startDate", {
          onChange: (e) => setStartdate(e.target.value),
        })}
      />
      {errors.startDate && <p className="fill-message">{errors?.startDate?.message}</p>}
    </span>

    <span className="split-contain1" hidden={Labelhide}>
      <label htmlFor="endDate" className="form-label fl1">
        End Date : <p className="star">*</p>
      </label>
      <input
        type="date"
        className="form-control"
        name="endDate"
        id="endDate"
        {...register("endDate", {
          onChange: (e) => setEnddate(e.target.value),
        })}
      />
      {errors.endDate && <p className="fill-message">{errors?.endDate?.message}</p>}
    </span>
  </div>

  <div className="row-contain1">
    <span className="split-containRemark1">
      <label htmlFor="remark" className="form-label fl1">
        Remark :
      </label>

      <textarea
        type="text"
        className="form-control remark1"
        name="remark"
        id="remark"
        {...register("remark", {
          onChange: (e) => setRemark(e.target.value),
        })}
      />
    </span>
  </div>

  <div className="row-contain-butt1">
    <motion.input
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      type="submit"
      className="btn regisbutt"
      value="Submit"
    />

    <motion.input
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      type="button"
      className="btn backbutt"
      value="Cancel"
      onClick={() => resetForm()}
    />
  </div>
</>;
