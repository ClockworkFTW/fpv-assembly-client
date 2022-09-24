import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";

import MetaDataForm, { metaDataValidationSchema } from "./MetaDataForm";

const ElectronicSpeedControllerForm = ({ part, partType, handleOnSubmit }) => {
  const initialValues = {
    metaData: {
      type: partType,
      name: part?.name ?? "",
      manufacturer: part?.manufacturer ?? "",
      image: part?.image ?? "",
      weight: part?.weight ?? 0,
    },
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

export default ElectronicSpeedControllerForm;
