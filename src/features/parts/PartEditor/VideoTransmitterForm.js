import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";

import MetaDataForm, { metaDataValidationSchema } from "./MetaDataForm";

const VideoTransmitterForm = ({ part, partType, handleOnSubmit }) => {
  const initialValues = {
    metaData: {
      type: partType,
      name: part?.name ?? "",
      manufacturer: part?.manufacturer ?? "",
      image: part?.image ?? "",
      weight: part?.weight ?? 0,
    },
    specData: {
      transmission: part?.transmission ?? "",
      frequency: part?.frequency ?? 0,
      minPowerLevel: part?.minPowerLevel ?? 0,
      maxPowerLevel: part?.maxPowerLevel ?? 0,
      stackMountWidth: part?.stackMountWidth ?? 0,
      stackMountLength: part?.stackMountLength ?? 0,
    },
  };

  const validationSchema = metaDataValidationSchema.shape({
    specData: Yup.object({
      transmission: Yup.string()
        .max(25, "Must be 25 characters or less")
        .required("Required"),
      frequency: Yup.number().positive("Must be positive").required("Required"),
      minPowerLevel: Yup.number()
        .positive("Must be positive")
        .required("Required"),
      maxPowerLevel: Yup.number()
        .positive("Must be positive")
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
          <label htmlFor="specData.transmission">Transmission</label>
          <Field name="specData.transmission" type="text" />
          <ErrorMessage name="specData.transmission" />
        </div>
        <div>
          <label htmlFor="specData.frequency">Frequency</label>
          <Field name="specData.frequency" type="number" />
          <ErrorMessage name="specData.frequency" />
        </div>
        <div>
          <label htmlFor="specData.minPowerLevel">Min Power Level</label>
          <Field name="specData.minPowerLevel" type="number" />
          <ErrorMessage name="specData.minPowerLevel" />
        </div>
        <div>
          <label htmlFor="specData.maxPowerLevel">Max Power Level</label>
          <Field name="specData.maxPowerLevel" type="number" />
          <ErrorMessage name="specData.maxPowerLevel" />
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

export default VideoTransmitterForm;
