import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";

import MetaDataForm, {
  metaDataValidationSchema,
} from "features/parts/PartEditor/MetaDataForm";

const FrameForm = ({ part, partType, handleOnSubmit }) => {
  const initialValues = {
    metaData: {
      type: partType,
      name: part?.name ?? "",
      manufacturer: part?.manufacturer ?? "",
      image: part?.image ?? "",
      weight: part?.weight ?? 0,
    },
    specData: {
      wheelbase: part?.wheelbase ?? 0,
      motorMountWidth: part?.motorMountWidth ?? 0,
      motorMountLength: part?.motorMountLength ?? 0,
      stackMountWidth: part?.stackMountWidth ?? 0,
      stackMountLength: part?.stackMountLength ?? 0,
    },
  };

  const validationSchema = metaDataValidationSchema.shape({
    specData: Yup.object({
      wheelbase: Yup.number().positive("Must be positive").required("Required"),
      motorMountWidth: Yup.number()
        .positive("Must be positive")
        .required("Required"),
      motorMountLength: Yup.number()
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
          <label htmlFor="specData.wheelbase">Wheelbase</label>
          <Field name="specData.wheelbase" type="number" />
          <ErrorMessage name="specData.wheelbase" />
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

export default FrameForm;
