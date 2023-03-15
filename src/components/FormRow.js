import { ErrorMessage } from "@hookform/error-message";
import React from "react";

const FormRow = ({
  type,
  name,
  placeholder,
  value,
  register = undefined,
  errors = undefined,
  getInputProps = undefined,
}) => {
  /*check with sam why it double console logs */
  if (type !== "file")
    return (
      <>
        <input
          {...register(name)}
          type={type}
          name={name}
          id={name}
          className="block w-full rounded-md rounded-1-md border-0 py-1.5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
          placeholder={placeholder}
          value={value}
        />
        <ErrorMessage
          errors={errors}
          name={name}
          render={({ message }) => <p className="text-rose-500">{message}</p>}
        />
      </>
    );
  return (
    <>
      <input
        {...getInputProps()}
        type={type}
        name={name}
        id={name}
        className="block w-full rounded-md rounded-1-md border-0 py-1.5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
        placeholder={placeholder}
        value={value}
      />
      <ErrorMessage
        errors={errors}
        name={name}
        render={({ message }) => <p className="text-rose-500">{message}</p>}
      />
    </>
  );
};

export default FormRow;
