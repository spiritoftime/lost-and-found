import React from "react";
import { ErrorMessage } from "@hookform/error-message";
const SquareFormInput = ({ type, id, register, errors }) => {
  return (
    <>
      <input
        {...register(id)}
        className=" w-full border-black border-2"
        type={type}
        id={id}
      />
      <ErrorMessage
        errors={errors}
        name={id}
        render={({ message }) => <p className="text-rose-500">{message}</p>}
      />
    </>
  );
};

export default SquareFormInput;
