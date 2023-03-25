import * as Yup from "yup";

export const YupFormSchema = (reportType) => {
  if (reportType === "missing")
    return Yup.object().shape({
      petName: Yup.string().required("Please type in a pet name"),
      respondsTo: Yup.string().required("Please type in at least a NIL"),
      gender: Yup.mixed().required().oneOf(["male", "female"]),
      category: Yup.mixed()
        .required()
        .oneOf(["dog", "cat", "bird", "rabbit", "hamster", "others"]),
      lastSeen: Yup.string()
        .required("Please type in a valid postal code")
        .matches(/^[0-9]+$/, "Must be only digits")
        .min(6, "Must be exactly 6 digits")
        .max(6, "Must be exactly 6 digits"),
      contactNumber: Yup.string()
        .required("Please type in a contact number")
        .matches(/^[0-9]+$/, "Must be only digits")
        .min(8, "Must be exactly 8 digits")
        .max(8, "Must be exactly 8 digits"),
      microChipNumber: Yup.string().required(
        "please type in a microchip number"
      ),
      description: Yup.string().required(
        "please type in extra details on your pet"
      ),
    });
  return Yup.object().shape({
    gender: Yup.mixed().required().oneOf(["male", "female"]),
    category: Yup.mixed()
      .required()
      .oneOf(["dog", "cat", "bird", "rabbit", "hamster", "others"]),
    lastSeen: Yup.string()
      .required("Please type in a valid postal code")
      .matches(/^[0-9]+$/, "Must be only digits")
      .min(6, "Must be exactly 6 digits")
      .max(6, "Must be exactly 6 digits"),
    contactNumber: Yup.string()
      .required("Please type in a contact number")
      .matches(/^[0-9]+$/, "Must be only digits")
      .min(8, "Must be exactly 8 digits")
      .max(8, "Must be exactly 8 digits"),
    microChipNumber: Yup.string().required("please type in a microchip number"),
    description: Yup.string().required(
      "please type in extra details on your pet"
    ),
  });
};

export const defaultValues = (report, reportType) => {
  if (reportType === "missing")
    return {
      petName: report.petName,
      respondsTo: report.respondsTo,
      category: report.category,
      gender: report.gender,
      lastSeen: report.lastSeen,
      contactNumber: report.contactNumber,
      microChipNumber: report.microChipNumber,
      description: report.description,
    };
  return {
    category: report.category,
    gender: report.gender,
    lastSeen: report.lastSeen,
    contactNumber: report.contactNumber,
    microChipNumber: report.microChipNumber,
    description: report.description,
  };
};
