import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";

import MetaDataForm, { metaDataValidationSchema } from "./MetaDataForm";

const RadioReceiverForm = ({ part, partType, handleOnSubmit }) => {
  const initialValues = {
    metaData: {
      type: partType,
      name: part?.name ?? "",
      manufacturer: part?.manufacturer ?? "",
      image: part?.image ?? "",
      weight: part?.weight ?? 0,
    },
    specData: {
      txProtocol: part?.txProtocol ?? "",
      rxProtocol: part?.rxProtocol ?? "",
    },
  };

  const validationSchema = metaDataValidationSchema.shape({
    specData: Yup.object({
      txProtocol: Yup.string()
        .max(25, "Must be 25 characters or less")
        .required("Required"),
      rxProtocol: Yup.string()
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
          <label htmlFor="specData.txProtocol">Tx Protocol</label>
          <Field name="specData.txProtocol" type="text" />
          <ErrorMessage name="specData.txProtocol" />
        </div>
        <div>
          <label htmlFor="specData.rxProtocol">Rx Protocol</label>
          <Field name="specData.rxProtocol" type="text" />
          <ErrorMessage name="specData.rxProtocol" />
        </div>
        <button type="submit">Submit</button>
      </Form>
    </Formik>
  );
};

export default RadioReceiverForm;
