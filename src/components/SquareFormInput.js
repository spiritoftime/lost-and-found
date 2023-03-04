import React from "react";

const SquareFormInput = ({ type, id }) => {
  return (
    <>
      <input className=" w-full border-black border-2" type={type} id={id} />
    </>
  );
};

export default SquareFormInput;
