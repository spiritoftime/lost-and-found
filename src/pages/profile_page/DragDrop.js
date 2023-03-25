import React from "react";
import SquareFormInput from "../../components/SquareFormInput";
const DragDrop = ({ getRootProps, errors, getInputProps, id }) => {
  return (
    <div
      {...getRootProps({ className: "dropzone" })}
      className="mt-2 flex justify-center rounded-md border-2 border-dashed border-gray-300 px-6 pt-5 pb-6"
    >
      <div className="space-y-1 text-center">
        <svg
          className="mx-auto h-12 w-12 text-gray-400"
          stroke="currentColor"
          fill="none"
          viewBox="0 0 48 48"
          aria-hidden="true"
        >
          <path
            d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
            strokeWidth={2}
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
        <div className="flex text-sm text-gray-600">
          <div
            htmlFor={id}
            className="relative cursor-pointer rounded-md bg-white font-medium  focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-500 focus-within:ring-offset-2 hover:text-indigo-500"
          >
            <p className="text-gray">
              <span className="text-indigo-600">Upload an image file</span> or
              drag and drop
            </p>
            <SquareFormInput
              getInputProps={getInputProps}
              errors={errors}
              id={id}
              name="file-upload"
              type="file"
            />
          </div>
        </div>
        <p className="text-xs text-gray-500">
          PNG, JPG, AVIF or WEBP up to 10MB
        </p>
      </div>
    </div>
  );
};

export default DragDrop;
