import * as Yup from "yup";

export const YupProfileSchema = Yup.object().shape({
  username: Yup.string()
    .required("Please type in an email")
    .matches(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
      "Please type in a valid email"
    ),
  contactNumber: Yup.string()
    .required("Please type a contact number")
    .matches(/^[0-9]+$/, "Must be only digits")
    .min(8, "Must be exactly 8 digits")
    .max(8, "Must be exactly 8 digits"),
  profileUrl: Yup.string().required("Please select a profile picture"),
});
