import { ErrorMessage } from "@hookform/error-message";
import React from "react";

const FormRowSelect = ({
  options,
  name,

  register = undefined,
  errors = undefined,
}) => {
  return (
    <>
      <select
        {...register(name)}
        name={name}
        id="countries"
        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
      >
        <option>Choose a {name} </option>
        {options.map((item, index) => {
          return (
            <option key={index} value={item}>
              {item}
            </option>
          );
        })}
      </select>
      <ErrorMessage
        errors={errors}
        name={name}
        render={({ message }) => <p className="text-rose-500">{message}</p>}
      />
    </>
  );
};

export default FormRowSelect;
