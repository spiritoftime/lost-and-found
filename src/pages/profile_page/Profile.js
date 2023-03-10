import React, { useCallback } from "react";
import { useState } from "react";
import FormLabel from "../../components/FormLabel";
import FormRow from "../../components/FormRow";
import SquareFormInput from "../../components/SquareFormInput";
import { useAppContext } from "../../context/appContext";
import { useDropzone } from "react-dropzone";

const Profile = () => {
  const [imageDetails, setImageDetails] = useState({});
  const {
    authDetails: { profileUrl, name },
  } = useAppContext();
  const onDrop = useCallback((acceptedFiles) =>
    setImageDetails({
      imgName: acceptedFiles[0].name,
      preview: URL.createObjectURL(acceptedFiles[0]),
    })
  );
  const { acceptedFiles, getRootProps, getInputProps, fileRejections } =
    useDropzone({
      onDrop,
      maxFiles: 1,
      accept: {
        "image/png": [".png"],
        "image/webp": [".webp"],
        "image/jpeg": [".jpeg", ".jpg"],
        "image/avif": [".avif"],
      },
      noClick: true,
      noKeyboard: true,
    });

  return (
    <div className="p-8 flex flex-col gap-4">
      <h2 className="text-2xl font-medium">Edit Credentials</h2>
      <div className="flex flex-col gap-2">
        <FormLabel htmlFor="username" label="Username" />
        <input
          className=" w-full border-black border-2"
          type="text"
          id="username"
        />
      </div>
      <div className="flex flex-col gap-2">
        <FormLabel htmlFor="contact" label="Contact Number" />
        <input
          className=" w-full border-black border-2"
          type="number"
          id="contact"
        />
      </div>
      <div className="flex  gap-2">
        <div className="w-full">
          <div
            {...getRootProps()}
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
                <label
                  htmlFor="file-upload"
                  className="relative cursor-pointer rounded-md bg-white font-medium text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-500 focus-within:ring-offset-2 hover:text-indigo-500"
                >
                  <span>Upload an image file</span>
                  <input
                    {...getInputProps()}
                    id="file-upload"
                    name="file-upload"
                    type="file"
                    className="sr-only"
                  />
                </label>
                <p className="pl-1">or drag and drop</p>
              </div>
              <p className="text-xs text-gray-500">
                PNG, JPG, AVIF or WEBP up to 10MB
              </p>
            </div>
          </div>
          {imageDetails.length !== 0 ? <p>{imageDetails.imgName}</p> : ""}
        </div>
        <div className="flex flex-col">
          <p className="text-center">Preview</p>
          <img
            className="rounded-full w-[300px] aspect-square"
            alt=""
            src={imageDetails.length === 0 ? profileUrl : imageDetails.preview}
          />
        </div>
      </div>
    </div>
  );
};

export default Profile;
