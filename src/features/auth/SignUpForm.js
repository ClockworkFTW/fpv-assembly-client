import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";

const initialValues = {
  username: "",
  email: "",
  passwordA: "",
  passwordB: "",
};

const validationSchema = Yup.object({
  username: Yup.string()
    .max(50, "Must be 50 characters or less")
    .required("Required"),
  email: Yup.string().email().required("Required"),
  passwordA: Yup.string()
    .max(100, "Must be 100 characters or less")
    .required("Required"),
  passwordB: Yup.string()
    .max(100, "Must be 100 characters or less")
    .required("Required"),
});

const SignUp = ({ signUp, isLoading }) => {
  const handleOnSubmit = (credentials) => {
    signUp(credentials);
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={handleOnSubmit}
    >
      <Form>
        <div>
          <label htmlFor="username">Username</label>
          <Field id="username" name="username" type="text" />
          <ErrorMessage name="username" />
        </div>
        <div>
          <label htmlFor="email">Email</label>
          <Field id="email" name="email" type="email" />
          <ErrorMessage name="email" />
        </div>
        <div>
          <label htmlFor="passwordA">Password</label>
          <Field id="passwordA" name="passwordA" type="password" />
          <ErrorMessage name="passwordA" />
        </div>
        <div>
          <label htmlFor="passwordB">Confirm Password</label>
          <Field id="passwordB" name="passwordB" type="password" />
          <ErrorMessage name="passwordB" />
        </div>
        <button type="submit">{isLoading ? "Loading..." : "Sign Up"}</button>
      </Form>
    </Formik>
  );
};

export default SignUp;
