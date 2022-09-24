import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";

import MetaDataForm, { metaDataValidationSchema } from "./MetaDataForm";

const PropellerForm = ({ part, partType, handleOnSubmit }) => {
  const initialValues = {
    metaData: {
      type: partType,
      name: part?.name ?? "",
      manufacturer: part?.manufacturer ?? "",
      image: part?.image ?? "",
      weight: part?.weight ?? 0,
    },
    specData: {
      diameter: part?.diameter ?? 0,
      pitchAngle: part?.pitchAngle ?? 0,
      bladeCount: part?.bladeCount ?? 0,
      shaftDiameter: part?.shaftDiameter ?? 0,
    },
  };

  const validationSchema = metaDataValidationSchema.shape({
    specData: Yup.object({
      diameter: Yup.number().positive("Must be positive").required("Required"),
      pitchAngle: Yup.number()
        .positive("Must be positive")
        .required("Required"),
      bladeCount: Yup.number()
        .positive("Must be positive")
        .required("Required"),
      shaftDiameter: Yup.number()
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
          <label htmlFor="specData.diameter">Diameter</label>
          <Field name="specData.diameter" type="number" />
          <ErrorMessage name="specData.diameter" />
        </div>
        <div>
          <label htmlFor="specData.pitchAngle">Pitch Angle</label>
          <Field name="specData.pitchAngle" type="number" />
          <ErrorMessage name="specData.pitchAngle" />
        </div>
        <div>
          <label htmlFor="specData.bladeCount">Blade Count</label>
          <Field name="specData.bladeCount" type="number" />
          <ErrorMessage name="specData.bladeCount" />
        </div>
        <div>
          <label htmlFor="specData.shaftDiameter">Shaft Diameter</label>
          <Field name="specData.shaftDiameter" type="number" />
          <ErrorMessage name="specData.shaftDiameter" />
        </div>
        <button type="submit">Submit</button>
      </Form>
    </Formik>
  );
};

export default PropellerForm;
