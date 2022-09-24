import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";

import MetaDataForm, {
  metaDataInitialValues,
  metaDataValidationSchema,
} from "./MetaDataForm";

const FlightControllerForm = ({ partType, handleOnSubmit }) => {
  const initialValues = {
    metaData: { ...metaDataInitialValues, type: partType },
    specData: {},
  };

  const validationSchema = metaDataValidationSchema.shape({
    specData: Yup.object({}),
  });

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={handleOnSubmit}
    >
      <Form>
        <MetaDataForm />
        {
          // Insert form elements here
        }
        <button type="submit">Submit</button>
      </Form>
    </Formik>
  );
};

export default FlightControllerForm;
