import * as Yup from "yup";

const YupValidation = Yup.object().shape({
  email: Yup.string().email().required("Email is required"),
  password: Yup.string().min(3).required("Password is Required"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password"), null], "Password doesn't match")
    .min(3)
    .required("Confirm Password"),
});
export const initialValues = {
  email: "",
  password: "",
  confirmPassword: "",
};

export default YupValidation;
