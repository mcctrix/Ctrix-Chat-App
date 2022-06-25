import { Formik, Form } from "formik";

const CustomForm = ({
  children,
  initialValues,
  submitEvent,
  YupValidation,
}) => {
  return (
    <Formik
      initialValues={initialValues}
      validationSchema={YupValidation}
      onSubmit={submitEvent}
    >
      {(props) => <Form>{children}</Form>}
    </Formik>
  );
};
export default CustomForm;
