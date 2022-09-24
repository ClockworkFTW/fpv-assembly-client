import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";

import MetaDataForm, { metaDataValidationSchema } from "./MetaDataForm";

const VideoAntennaForm = ({ part, partType, handleOnSubmit }) => {
  const initialValues = {
    metaData: {
      type: partType,
      name: part?.name ?? "",
      manufacturer: part?.manufacturer ?? "",
      image: part?.image ?? "",
      weight: part?.weight ?? 0,
    },
    specData: {
      minFrequency: part?.minFrequency ?? 0,
      maxFrequency: part?.maxFrequency ?? 0,
      gain: part?.gain ?? 0,
      length: part?.length ?? 0,
      connector: part?.connector ?? "",
    },
  };

  const validationSchema = metaDataValidationSchema.shape({
    specData: Yup.object({
      minFrequency: Yup.number()
        .positive("Must be positive")
        .required("Required"),
      maxFrequency: Yup.number()
        .positive("Must be positive")
        .required("Required"),
      gain: Yup.number().positive("Must be positive").required("Required"),
      length: Yup.number().positive("Must be positive").required("Required"),
      connector: Yup.string()
        .max(25, "Must be 25 characters or less")
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
          <label htmlFor="specData.minFrequency">Min Frequency</label>
          <Field name="specData.minFrequency" type="number" />
          <ErrorMessage name="specData.minFrequency" />
        </div>
        <div>
          <label htmlFor="specData.maxFrequency">Max Frequency</label>
          <Field name="specData.maxFrequency" type="number" />
          <ErrorMessage name="specData.maxFrequency" />
        </div>
        <div>
          <label htmlFor="specData.gain">Gain</label>
          <Field name="specData.gain" type="number" />
          <ErrorMessage name="specData.gain" />
        </div>
        <div>
          <label htmlFor="specData.length">Length</label>
          <Field name="specData.length" type="number" />
          <ErrorMessage name="specData.length" />
        </div>
        <div>
          <label htmlFor="specData.connector">Connector</label>
          <Field name="specData.connector" type="text" />
          <ErrorMessage name="specData.connector" />
        </div>
        <button type="submit">Submit</button>
      </Form>
    </Formik>
  );
};

export default VideoAntennaForm;
