import { FieldArray, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

const ListingsForm = ({ listings }) => (
  <FieldArray name="listings">
    {({ remove, push }) => (
      <div>
        {listings.length > 0 &&
          listings.map((listing, index) => (
            <div key={index}>
              <div>
                <label htmlFor={`listings.${index}.vendor`}>Vendor</label>
                <Field name={`listings.${index}.vendor`} type="text" />
                <ErrorMessage name={`listings.${index}.vendor`} />
              </div>
              <div>
                <label htmlFor={`listings.${index}.price`}>Price</label>
                <Field name={`listings.${index}.price`} type="number" />
                <ErrorMessage name={`listings.${index}.price`} />
              </div>
              <div>
                <label htmlFor={`listings.${index}.link`}>Link</label>
                <Field name={`listings.${index}.link`} type="text" />
                <ErrorMessage name={`listings.${index}.link`} />
              </div>
              {listings.length > 1 && (
                <div>
                  <button type="button" onClick={() => remove(index)}>
                    Remove Listing
                  </button>
                </div>
              )}
            </div>
          ))}
        <button
          type="button"
          onClick={() => push({ vendor: "", price: 0, link: "" })}
        >
          Add Listing
        </button>
      </div>
    )}
  </FieldArray>
);

export const listingsInitialValues = (part) => {
  if (part?.listings) {
    return part.listings.map((listing) => {
      return { ...listing, price: listing.currentPrice };
    });
  } else {
    return [{ vendor: "", price: 0, link: "" }];
  }
};

export const listingsValidationSchema = Yup.array()
  .of(
    Yup.object().shape({
      vendor: Yup.string().required("Required"),
      price: Yup.number().positive("Must be positive").required("Required"),
      link: Yup.string().required("Required"),
    })
  )
  .required("Must have listings")
  .min(1, "Minimum of 1 listing");

export default ListingsForm;
