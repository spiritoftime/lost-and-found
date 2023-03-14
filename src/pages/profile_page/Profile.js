import React, { useCallback } from "react";
import { useState } from "react";
import FormLabel from "../../components/FormLabel";
import FormRow from "../../components/FormRow";
import SquareFormInput from "../../components/SquareFormInput";
import { useAppContext } from "../../context/appContext";
import { useDropzone } from "react-dropzone";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { YupProfileSchema } from "./YupProfileSchema";
import emptyAvatar from "../../images/empty-avatar.png";
import RoundButton from "../../components/RoundButton";
import { getDatabase, ref, set } from "firebase/database";
import {
  getStorage,
  ref as sRef,
  getDownloadURL,
  uploadBytes,
} from "firebase/storage";
const Profile = () => {
  const db = getDatabase();
  const storage = getStorage();
  const { authDetails, setAuthDetails } = useAppContext();
  console.log(authDetails);
  const [imageDetails, setImageDetails] = useState({
    preview: authDetails.profileUrl,
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(YupProfileSchema),
    defaultValues: {
      username: authDetails.username,
      contactNumber: authDetails.contactNumber,
      profileUrl: authDetails.profileUrl,
    },
  });

  const onDrop = useCallback((acceptedFiles) => {
    setImageDetails({
      imgName: acceptedFiles[0].name,
      preview: URL.createObjectURL(acceptedFiles[0]),
      profileImage: acceptedFiles[0],
    });
  }, []);
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
      noKeyboard: true,
    });
  const changeUserDetails = (e) => {
    console.log(e.profileUrl);
    if (e.profileUrl.length === 0) {
      // if no file uploaded by user
      set(ref(db, "users/" + authDetails.uid), {
        ...authDetails,
        username: e.username,
        contactNumber: e.contactNumber,
        // problem - this will overwrite all the posts and other details
      });

      setAuthDetails((prevAuth) => {
        return { ...prevAuth, name: e.name, contactNumber: e.contactNumber };
      });
    } else {
      const imageStorageRef = sRef(storage, imageDetails.imgName.split(".")[0]);
      uploadBytes(imageStorageRef, imageDetails.profileImage, {
        contentType: "image/png",
      }).then((snapshot) => {
        getDownloadURL(snapshot.ref).then((url) => {
          set(ref(db, "users/" + authDetails.uid), {
            ...authDetails,
            username: e.username,
            contactNumber: e.contactNumber,
            profileUrl: url,
          });
          setAuthDetails((prevAuth) => {
            return {
              ...prevAuth,
              username: e.name,
              contactNumber: e.contactNumber,
              profileUrl: url,
            };
          });
        });
      });
    }
  };
  const fileRejectionItems = fileRejections.map(({ file, errors }) => (
    <li key={file.path}>
      {file.path} - {file.size} bytes
      <ul>
        {errors.map((e) => (
          <li key={e.code}>{e.message}</li>
        ))}
      </ul>
    </li>
  ));

  return (
    <form
      onSubmit={handleSubmit(changeUserDetails)}
      className="p-8 flex flex-col gap-4"
    >
      <h2 className="text-2xl font-medium">Edit Credentials</h2>
      <div className="flex flex-col gap-2">
        <FormLabel htmlFor="username" label="Username" />
        <SquareFormInput
          type="text"
          id="username"
          register={register}
          errors={errors}
        />
      </div>
      <div className="flex flex-col gap-2">
        <FormLabel htmlFor="contact" label="Contact Number" />
        <SquareFormInput
          register={register}
          errors={errors}
          type="number"
          id="contactNumber"
        />
      </div>
      <div className="flex  gap-2">
        <div className="w-full">
          <FormLabel label="Profile Picture" htmlFor="profile" />
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
                  htmlFor="profileUrl"
                  className="relative cursor-pointer rounded-md bg-white font-medium text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-500 focus-within:ring-offset-2 hover:text-indigo-500"
                >
                  <span>Upload an image file</span>
                  <SquareFormInput
                    getInputProps={getInputProps}
                    register={register}
                    errors={errors}
                    id="profileUrl"
                    name="file-upload"
                    type="file"
                  />
                </div>
                <p className="pl-1">or drag and drop</p>
              </div>
              <p className="text-xs text-gray-500">
                PNG, JPG, AVIF or WEBP up to 10MB
              </p>
            </div>
          </div>
          {imageDetails.imgName ? <p>{imageDetails.imgName}</p> : ""}
          {fileRejectionItems}
        </div>
        <div className="flex flex-col">
          <p className="text-center">Preview</p>
          <img
            className="object-cover rounded-full w-[200px] aspect-square"
            alt=""
            src={
              imageDetails.preview === undefined
                ? emptyAvatar
                : imageDetails.preview
            }
            referrerPolicy="no-referrer"
          />
        </div>
      </div>
      <RoundButton type="submit" bgColorClass="max-w-2xl bg-indigo-600">
        Save Changes
      </RoundButton>
    </form>
  );
};

export default Profile;
