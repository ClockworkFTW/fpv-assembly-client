import { Field, ErrorMessage } from "formik";
import * as Yup from "yup";

const MetaDataForm = () => (
  <>
    <div>
      <label htmlFor="metaData.name">Name</label>
      <Field name="metaData.name" type="text" />
      <ErrorMessage name="metaData.name" />
    </div>
    <div>
      <label htmlFor="metaData.manufacturer">Manufacturer</label>
      <Field name="metaData.manufacturer" type="text" />
      <ErrorMessage name="metaData.manufacturer" />
    </div>
    <div>
      <label htmlFor="metaData.image">Image</label>
      <Field name="metaData.image" type="text" />
      <ErrorMessage name="metaData.image" />
    </div>
    <div>
      <label htmlFor="metaData.weight">Weight</label>
      <Field name="metaData.weight" type="number" />
      <ErrorMessage name="metaData.weight" />
    </div>
  </>
);

export const metaDataInitialValues = (part, partType) => ({
  type: partType,
  name: part?.name ?? "",
  manufacturer: part?.manufacturer ?? "",
  image: part?.image ?? "",
  weight: part?.weight ?? 0,
});

export const metaDataValidationSchema = Yup.object({
  name: Yup.string()
    .max(50, "Must be 50 characters or less")
    .required("Required"),
  manufacturer: Yup.string()
    .max(25, "Must be 25 characters or less")
    .required("Required"),
  image: Yup.string()
    .max(200, "Must be 200 characters or less")
    .required("Required"),
  weight: Yup.number().positive("Must be positive").required("Required"),
});

export default MetaDataForm;
