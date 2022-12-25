import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";

import MetaDataForm, {
  metaDataValidationSchema,
} from "features/parts/PartEditor/MetaDataForm";

const BatteryForm = ({ part, partType, handleOnSubmit }) => {
  const initialValues = {
    metaData: {
      type: partType,
      name: part?.name ?? "",
      manufacturer: part?.manufacturer ?? "",
      image: part?.image ?? "",
      weight: part?.weight ?? 0,
    },
    specData: {
      cellCount: part?.cellCount ?? 0,
      voltage: part?.voltage ?? 0,
      capacity: part?.capacity ?? 0,
      discharge: part?.discharge ?? 0,
      burst: part?.burst ?? 0,
      connector: part?.connector ?? "",
    },
  };

  const validationSchema = metaDataValidationSchema.shape({
    specData: Yup.object({
      cellCount: Yup.number().positive("Must be positive").required("Required"),
      voltage: Yup.number().positive("Must be positive").required("Required"),
      capacity: Yup.number().positive("Must be positive").required("Required"),
      discharge: Yup.number().positive("Must be positive").required("Required"),
      burst: Yup.number().positive("Must be positive").required("Required"),
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
          <label htmlFor="specData.cellCount">Cell Count</label>
          <Field name="specData.cellCount" type="number" />
          <ErrorMessage name="specData.cellCount" />
        </div>
        <div>
          <label htmlFor="specData.voltage">Voltage</label>
          <Field name="specData.voltage" type="number" />
          <ErrorMessage name="specData.voltage" />
        </div>
        <div>
          <label htmlFor="specData.capacity">Capacity</label>
          <Field name="specData.capacity" type="number" />
          <ErrorMessage name="specData.capacity" />
        </div>
        <div>
          <label htmlFor="specData.discharge">Discharge</label>
          <Field name="specData.discharge" type="number" />
          <ErrorMessage name="specData.discharge" />
        </div>
        <div>
          <label htmlFor="specData.burst">Burst</label>
          <Field name="specData.burst" type="number" />
          <ErrorMessage name="specData.burst" />
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

export default BatteryForm;
