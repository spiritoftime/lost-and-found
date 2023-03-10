import * as Yup from "yup";

export const YupProfileSchema = Yup.object().shape({
  username: Yup.string()
    .required("Please type in a username")
    .min(6, "username must be at least 6 characters"),
  contactNumber: Yup.string()
    .required("Please type in a contact number")
    .matches(/^[0-9]+$/, "Must be only digits")
    .min(8, "Must be exactly 8 digits")
    .max(8, "Must be exactly 8 digits"),
});
