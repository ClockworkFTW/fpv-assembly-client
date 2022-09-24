import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";

import MetaDataForm, {
  metaDataInitialValues,
  metaDataValidationSchema,
} from "./MetaDataForm";

const MotorForm = ({ partType, handleOnSubmit }) => {
  const initialValues = {
    metaData: { ...metaDataInitialValues, type: partType },
    specData: {
      kv: 0,
      motorDiameter: 0,
      motorHeight: 0,
      shaftDiameter: 0,
      motorMountWidth: 0,
      motorMountLength: 0,
    },
  };

  const validationSchema = metaDataValidationSchema.shape({
    specData: Yup.object({
      kv: Yup.number().positive("Must be positive").required("Required"),
      motorDiameter: Yup.number()
        .positive("Must be positive")
        .required("Required"),
      motorHeight: Yup.number()
        .positive("Must be positive")
        .required("Required"),
      shaftDiameter: Yup.number()
        .positive("Must be positive")
        .required("Required"),
      motorMountWidth: Yup.number()
        .positive("Must be positive")
        .required("Required"),
      motorMountLength: Yup.number()
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
          <label htmlFor="specData.kv">KV</label>
          <Field name="specData.kv" type="number" />
          <ErrorMessage name="specData.kv" />
        </div>
        <div>
          <label htmlFor="specData.motorDiameter">Motor Diameter</label>
          <Field name="specData.motorDiameter" type="number" />
          <ErrorMessage name="specData.motorDiameter" />
        </div>
        <div>
          <label htmlFor="specData.motorHeight">Motor Height</label>
          <Field name="specData.motorHeight" type="number" />
          <ErrorMessage name="specData.motorHeight" />
        </div>
        <div>
          <label htmlFor="specData.shaftDiameter">Shaft Diameter</label>
          <Field name="specData.shaftDiameter" type="number" />
          <ErrorMessage name="specData.shaftDiameter" />
        </div>
        <div>
          <label htmlFor="specData.motorMountWidth">Motor Mount Width</label>
          <Field name="specData.motorMountWidth" type="number" />
          <ErrorMessage name="specData.motorMountWidth" />
        </div>
        <div>
          <label htmlFor="specData.motorMountLength">Motor Mount Length</label>
          <Field name="specData.motorMountLength" type="number" />
          <ErrorMessage name="specData.motorMountLength" />
        </div>
        <button type="submit">Submit</button>
      </Form>
    </Formik>
  );
};

export default MotorForm;
