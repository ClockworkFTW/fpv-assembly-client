import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";

import MetaDataForm, {
  metaDataInitialValues,
  metaDataValidationSchema,
} from "./MetaDataForm";

import ListingsForm, {
  listingsInitialValues,
  listingsValidationSchema,
} from "./ListingsForm";

const specDataValidationSchema = Yup.object({
  kv: Yup.number().positive("Must be positive").required("Required"),
  motorDiameter: Yup.number().positive("Must be positive").required("Required"),
  motorHeight: Yup.number().positive("Must be positive").required("Required"),
  shaftDiameter: Yup.number().positive("Must be positive").required("Required"),
  motorMountWidth: Yup.number()
    .positive("Must be positive")
    .required("Required"),
  motorMountLength: Yup.number()
    .positive("Must be positive")
    .required("Required"),
});

const MotorForm = ({ part, partType, handleOnSubmit }) => {
  const initialValues = {
    metaData: metaDataInitialValues(part, partType),
    specData: {
      kv: part?.kv ?? 0,
      motorDiameter: part?.motorDiameter ?? 0,
      motorHeight: part?.motorHeight ?? 0,
      shaftDiameter: part?.shaftDiameter ?? 0,
      motorMountWidth: part?.motorMountWidth ?? 0,
      motorMountLength: part?.motorMountLength ?? 0,
    },
    listings: listingsInitialValues(part),
  };

  const validationSchema = Yup.object().shape({
    metaData: metaDataValidationSchema,
    specData: specDataValidationSchema,
    listings: listingsValidationSchema,
  });

  return (
    <Formik
      enableReinitialize={true}
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={handleOnSubmit}
    >
      {({ values }) => (
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
            <label htmlFor="specData.motorMountLength">
              Motor Mount Length
            </label>
            <Field name="specData.motorMountLength" type="number" />
            <ErrorMessage name="specData.motorMountLength" />
          </div>
          <ListingsForm listings={values.listings} />
          <button type="submit">Submit</button>
        </Form>
      )}
    </Formik>
  );
};

export default MotorForm;
