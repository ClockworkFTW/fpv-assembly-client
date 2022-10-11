import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";

const BuildForm = ({ name, markdown, handleOnSubmit }) => {
  const initialValues = {
    name: name ?? "",
    markdown: markdown ?? "",
  };

  const buildValidationSchema = Yup.object({
    name: Yup.string().required("Required"),
    markdown: Yup.string(),
  });

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={buildValidationSchema}
      onSubmit={handleOnSubmit}
    >
      <Form>
        <div>
          <label htmlFor="name">Build Name</label>
          <Field name="name" type="text" />
          <ErrorMessage name="name" />
        </div>
        <div>
          <label htmlFor="markdown">Build Log</label>
          <Field name="markdown" type="text" as="textarea" />
          <ErrorMessage name="markdown" />
        </div>
        <button type="submit">Submit</button>
      </Form>
    </Formik>
  );
};

export default BuildForm;
