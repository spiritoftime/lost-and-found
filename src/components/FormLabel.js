import React from "react";

const FormLabel = ({ label, htmlFor }) => {
  return (
    <label htmlFor={htmlFor} className="text-black">
      {label}
    </label>
  );
};

export default FormLabel;
