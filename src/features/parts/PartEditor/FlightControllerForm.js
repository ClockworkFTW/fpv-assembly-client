import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";

import MetaDataForm, {
  metaDataValidationSchema,
} from "features/parts/PartEditor/MetaDataForm";

const FlightControllerForm = ({ part, partType, handleOnSubmit }) => {
  const initialValues = {
    metaData: {
      type: partType,
      name: part?.name ?? "",
      manufacturer: part?.manufacturer ?? "",
      image: part?.image ?? "",
      weight: part?.weight ?? 0,
    },
    specData: {
      firmware: part?.firmware ?? "",
      processor: part?.processor ?? "",
      stackMountWidth: part?.stackMountWidth ?? 0,
      stackMountLength: part?.stackMountLength ?? 0,
    },
  };

  const validationSchema = metaDataValidationSchema.shape({
    specData: Yup.object({
      firmware: Yup.string()
        .max(25, "Must be 25 characters or less")
        .required("Required"),
      processor: Yup.string()
        .max(25, "Must be 25 characters or less")
        .required("Required"),
      stackMountWidth: Yup.number()
        .positive("Must be positive")
        .required("Required"),
      stackMountLength: Yup.number()
        .positive("Must be positive")
        .required("Required"),
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
          <label htmlFor="specData.firmware">Firmware</label>
          <Field name="specData.firmware" type="text" />
          <ErrorMessage name="specData.firmware" />
        </div>
        <div>
          <label htmlFor="specData.processor">Processor</label>
          <Field name="specData.processor" type="text" />
          <ErrorMessage name="specData.processor" />
        </div>
        <div>
          <label htmlFor="specData.stackMountWidth">Stack Mount Width</label>
          <Field name="specData.stackMountWidth" type="number" />
          <ErrorMessage name="specData.stackMountWidth" />
        </div>
        <div>
          <label htmlFor="specData.stackMountLength">Stack Mount Length</label>
          <Field name="specData.stackMountLength" type="number" />
          <ErrorMessage name="specData.stackMountLength" />
        </div>
        <button type="submit">Submit</button>
      </Form>
    </Formik>
  );
};

export default FlightControllerForm;
