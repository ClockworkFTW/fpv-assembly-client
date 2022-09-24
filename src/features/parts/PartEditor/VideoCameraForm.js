import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";

import MetaDataForm, { metaDataValidationSchema } from "./MetaDataForm";

const VideoCameraForm = ({ part, partType, handleOnSubmit }) => {
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
      cameraSize: part?.cameraSize ?? "",
      sensorType: part?.sensorType ?? "",
      sensorSize: part?.sensorSize ?? 0,
      minIllumination: part?.minIllumination ?? 0,
      fieldOfView: part?.fieldOfView ?? 0,
    },
  };

  const validationSchema = metaDataValidationSchema.shape({
    specData: Yup.object({
      transmission: Yup.string()
        .max(25, "Must be 25 characters or less")
        .required("Required"),
      cameraSize: Yup.string()
        .max(25, "Must be 25 characters or less")
        .required("Required"),
      sensorType: Yup.string()
        .max(25, "Must be 25 characters or less")
        .required("Required"),
      sensorSize: Yup.number()
        .positive("Must be positive")
        .required("Required"),
      minIllumination: Yup.number()
        .positive("Must be positive")
        .required("Required"),
      fieldOfView: Yup.number()
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
          <label htmlFor="specData.cameraSize">Camera Size</label>
          <Field name="specData.cameraSize" type="text" />
          <ErrorMessage name="specData.cameraSize" />
        </div>
        <div>
          <label htmlFor="specData.sensorType">Sensor Type</label>
          <Field name="specData.sensorType" type="text" />
          <ErrorMessage name="specData.sensorType" />
        </div>
        <div>
          <label htmlFor="specData.sensorSize">Sensor Size</label>
          <Field name="specData.sensorSize" type="number" />
          <ErrorMessage name="specData.sensorSize" />
        </div>
        <div>
          <label htmlFor="specData.minIllumination">Min Illumination</label>
          <Field name="specData.minIllumination" type="number" />
          <ErrorMessage name="specData.minIllumination" />
        </div>
        <div>
          <label htmlFor="specData.fieldOfView">Field Of View</label>
          <Field name="specData.fieldOfView" type="number" />
          <ErrorMessage name="specData.fieldOfView" />
        </div>
        <button type="submit">Submit</button>
      </Form>
    </Formik>
  );
};

export default VideoCameraForm;
