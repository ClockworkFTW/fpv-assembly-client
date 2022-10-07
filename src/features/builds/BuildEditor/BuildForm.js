import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";

const BuildForm = ({ build, handleOnSubmit }) => {
  const initialValues = {
    name: build?.name ?? "",
    markdown: build?.markdown ?? "",
  };

  const buildValidationSchema = Yup.object({
    name: Yup.string().required("Required"),
    markdown: Yup.string().required("Required"),
  });

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={buildValidationSchema}
      onSubmit={handleOnSubmit}
    >
      {({ values }) => (
        <Form>
          <div>
            <label htmlFor="name">Name</label>
            <Field name="name" type="text" />
            <ErrorMessage name="name" />
          </div>
          <div>
            <label htmlFor="markdown">Description</label>
            <Field name="markdown" type="text" as="textarea" />
            <ErrorMessage name="markdown" />
          </div>
          <button type="submit">Submit</button>
        </Form>
      )}
    </Formik>
  );
};

export default BuildForm;
