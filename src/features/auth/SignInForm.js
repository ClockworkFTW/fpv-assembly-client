import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";

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

const SignInForm = ({ signIn, isLoading }) => {
  const handleOnSubmit = (credentials) => {
    signIn(credentials);
  };

  return (
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
        <button type="submit">{isLoading ? "Loading..." : "Sign In"}</button>
      </Form>
    </Formik>
  );
};

export default SignInForm;
