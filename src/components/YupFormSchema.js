import * as Yup from "yup";

export const YupFormSchema = Yup.object().shape({
  petName: Yup.string().required("Please type in a pet name"),
  respondsTo: Yup.string().required("Please type in at least a NIL"),
  gender: Yup.mixed().required().oneOf(["male", "female"]),
  category: Yup.mixed()
    .required()
    .oneOf(["dog", "cat", "bird", "rabbit", "hamster", "others"]),
  lastSeen: Yup.string()
    .required("Please type in a valid postal code")
    .matches(/^[0-9]+$/, "Must be only digits")
    .min(8, "Must be exactly 6 digits")
    .max(8, "Must be exactly 6 digits"),
  contactNumber: Yup.string()
    .required("Please type in a contact number")
    .matches(/^[0-9]+$/, "Must be only digits")
    .min(8, "Must be exactly 8 digits")
    .max(8, "Must be exactly 8 digits"),
  microChipNumber: Yup.string().required("please type in a microchip number"),
});
