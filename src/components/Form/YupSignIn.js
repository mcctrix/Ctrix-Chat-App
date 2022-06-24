import * as Yup from "yup";

const YupValidation = Yup.object().shape({
  email: Yup.string().required("Email is required"),
  password: Yup.string().min(3).required("Password is Required"),
});
export const initialValues = {
  email: "",
  password: "",
};

export default YupValidation;
