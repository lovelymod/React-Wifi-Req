import * as yup from "yup";

export const schema = yup.object().shape({
  inputFirstname: yup.string().required("Firstname is required."),
  inputLastname: yup.string().required("Lastname is required."),
  inputEmail: yup
    .string()
    .required("Email is required.")
    .matches(/^[\w]+[@]+([\w-]+\.)+[\w-]{2,4}$/, "Please correct this email.")
    .email("Please correct this email."),
  inputUsertype: yup.string().required("Usertype is required."),
  inputTel: yup
    .string()
    .required("Phone number is required.")
    .min(10, "Phone number must least 10 characters")
    .max(12, "Phone number must most 10 characters")
    .matches(/(^[0-9]{10}$)|(^[0-9]{3}-[0-9]{3}-[0-9]{4}$)/, "Phone number should be 0-9"),
  inputDevicetype: yup.string().required("Devicetype is required."),
  inputEtc: yup.string().when("inputDevicetype", {
    is: "etc.",
    then: yup.string().required("Etc. is required"),
  }),
  inputdeviceBrand: yup.string().required("Devicebrand is required."),
  inputdeviceName: yup.string().required("Devicename is required."),
  startDate: yup.string().required("Startdate is required."),
  endDate: yup.string().when("inputUsertype", {
    is: (inputUsertype) => inputUsertype === "staff",
    then: yup.string().notRequired(),
    otherwise: yup.string().required("Enddate is required."),
  }),
  remark: yup.string().nullable().notRequired(),
});

export const userSchema = yup.object().shape({
  Firstname: yup.string().required("Firstname is required."),
  Lastname: yup.string().required("Lastname is required."),
  Email: yup
    .string()
    .required("Email is required.")
    .matches(/^[\w]+[@]+([\w-]+\.)+[\w-]{2,4}$/, "Please correct this email.")
    .email("Please correct this email."),
  UserType: yup.string().required("Usertype is required."),
  Tel: yup
    .string()
    .required("Phone number is required.")
    .min(10, "Phone number must least 10 characters")
    .max(12, "Phone number must most 10 characters")
    .matches(/(^[0-9]{10}$)|(^[0-9]{3}-[0-9]{3}-[0-9]{4}$)/, "Phone number should be 0-9"),
  DeviceType: yup.string().required("Devicetype is required."),
  Etc: yup.string().when("DeviceType", {
    is: (DeviceType) => DeviceType === "etc",
    then: yup.string().required("Enddate is required."),
    otherwise: yup.string().notRequired(),
  }),
  DeviceBrand: yup.string().required("Devicebrand is required."),
  DeviceName: yup.string().required("Devicename is required."),
  StartDate: yup.string().required("Startdate is required."),
  EndDate: yup.string().when("UserType", {
    is: (UserType) => UserType === "staff",
    then: yup.string().notRequired(),
    otherwise: yup.string().required("Enddate is required."),
  }),
  Remark: yup.string().nullable().notRequired(),
});

export const loginSchema = yup.object().shape({
  Username: yup.string().required("Username is required."),
  Password: yup.string().required("Password is required."),
});

export const registerSchema = yup.object().shape({
  regUsername: yup.string().required("Username is required."),
  regPassword: yup.string().required("Password is required."),
  regConfPassword: yup.string().required("Confirm Password is required."),
});
