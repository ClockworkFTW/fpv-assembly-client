import { Formik, Field, Form, ErrorMessage } from "formik";
import { Link } from "react-router-dom";
import * as Yup from "yup";

import { useSignUpMutation } from "./authApiSlice";

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

const SignUp = () => {
  const [signUp, { isLoading, isSuccess, isError, error }] =
    useSignUpMutation();

  const handleOnSubmit = (credentials) => {
    signUp(credentials);
  };

  return (
    <div>
      <h1>Sign Up</h1>
      {isError && <p>{error.data.message}</p>}
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
          <button type="submit">Sign Up</button>
        </Form>
      </Formik>
      <p>
        Already have an account? Sign in <Link to="/sign-in">here</Link>.
      </p>
    </div>
  );
};

export default SignUp;
