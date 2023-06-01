import * as yup from "yup";
// |(^[0-9]{3}-[0-9]{3}-[0-9]{4}$)
export const userSchema = yup.object().shape({
  name: yup.string().required("Name is required."),
  email: yup
    .string()
    .required("Email is required.")
    .matches(/^[\w]+[@]+([\w-]+\.)+[\w-]{2,4}$/, "Please correct this email.")
    .email("Please correct this email."),
  role: yup.string().required("Role is required."),
  tel: yup
    .string()
    .required("Phone number is required.")
    .min(10, "Phone number must least 10 characters")
    .max(10, "Phone number must most 10 characters")
    .matches(/(^[0-9]{10}$)/, "Phone number should be 0-9"),
  device_type: yup.string().required("Devicetype is required."),
  etc: yup.string().when("DeviceType", {
    is: (DeviceType) => DeviceType === "etc",
    then: yup.string().required("Enddate is required."),
    otherwise: yup.string().notRequired(),
  }),
  device_brand: yup.string().required("Devicebrand is required."),
  device_name: yup.string().required("Devicename is required."),
  start_date: yup.string().required("Startdate is required."),
  end_date: yup.string().when("UserType", {
    is: (UserType) => UserType === "staff",
    then: yup.string().notRequired(),
    otherwise: yup.string().required("Enddate is required."),
  }),
  remark: yup.string().nullable().notRequired(),
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
