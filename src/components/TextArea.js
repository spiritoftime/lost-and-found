import React from "react";

const TextArea = ({ name, placeholder, register }) => {
  return (
    <div className="mt-2">
      <textarea
        {...register(name)}
        id={name}
        name={name}
        rows={3}
        className="mt-1 block w-full rounded-md border-0 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:py-1.5 sm:text-sm sm:leading-6"
        placeholder={placeholder}
        defaultValue={""}
      />
    </div>
  );
};

export default TextArea;
