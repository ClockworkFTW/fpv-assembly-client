import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";

import MetaDataForm, {
  metaDataInitialValues,
  metaDataValidationSchema,
} from "./MetaDataForm";

const FrameForm = ({ partType, handleOnSubmit }) => {
  const initialValues = {
    metaData: { ...metaDataInitialValues, type: partType },
    specData: { wheelbase: 0 },
  };

  const validationSchema = metaDataValidationSchema.shape({
    specData: Yup.object({
      wheelbase: Yup.number().positive("Must be positive").required("Required"),
    }),
  });

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={handleOnSubmit}
    >
      <Form>
        <MetaDataForm />
        <div>
          <label htmlFor="specData.wheelbase">Wheelbase</label>
          <Field name="specData.wheelbase" type="number" />
          <ErrorMessage name="specData.wheelbase" />
        </div>
        <button type="submit">Submit</button>
      </Form>
    </Formik>
  );
};

export default FrameForm;
