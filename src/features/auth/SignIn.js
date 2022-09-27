import { Formik, Field, Form, ErrorMessage } from "formik";
import { Link } from "react-router-dom";
import * as Yup from "yup";

import { useSignInMutation } from "./authApiSlice";

const initialValues = {
  email: "",
  password: "",
};

const validationSchema = Yup.object({
  email: Yup.string().email().required("Required"),
  password: Yup.string()
    .max(100, "Must be 100 characters or less")
    .required("Required"),
});

const SignIn = () => {
  const [signIn, { isLoading, isSuccess, isError, error }] =
    useSignInMutation();

  const handleOnSubmit = (credentials) => {
    signIn(credentials);
  };

  return (
    <div>
      <h1>Sign In</h1>
      {isError && <p>{error.data.message}</p>}
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleOnSubmit}
      >
        <Form>
          <div>
            <label htmlFor="email">Email</label>
            <Field id="email" name="email" type="email" />
            <ErrorMessage name="email" />
          </div>
          <div>
            <label htmlFor="password">Password</label>
            <Field id="password" name="password" type="password" />
            <ErrorMessage name="password" />
          </div>
          <button type="submit">Sign In</button>
        </Form>
      </Formik>
      <p>
        Don't have an account yet? Sign up <Link to="/sign-up">here</Link>.
      </p>
    </div>
  );
};

export default SignIn;
