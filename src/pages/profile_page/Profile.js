import React, { useCallback, useEffect } from "react";
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
import useDrop from "./useDrop";
import {
  getStorage,
  ref as sRef,
  getDownloadURL,
  uploadBytes,
} from "firebase/storage";
import DragDrop from "./DragDrop";
const Profile = () => {
  const db = getDatabase();
  const storage = getStorage();
  const { authDetails, setAuthDetails } = useAppContext();
  const [imageDetails, setImageDetails] = useState({
    preview: authDetails.profileUrl,
  });
  const {
    getInputProps,
    errors,
    getRootProps,
    register,
    handleSubmit,
    fileRejections,
    setValue,
  } = useDrop(
    (acceptedFiles) => {
      setValue("profileUrl", acceptedFiles[0]); // the name must match!
      // this is what you want to do when the user drags and drops an image
      setImageDetails({
        imgName: acceptedFiles[0].name,
        preview: URL.createObjectURL(acceptedFiles[0]),
      });
    },
    YupProfileSchema,
    {
      username: authDetails.username,
      contactNumber: authDetails.contactNumber,
      profileUrl: authDetails.profileUrl,
    },
    "profileUrl"
  );
  const changeUserDetails = (e) => {
    if (!e.profileUrl) {
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
      uploadBytes(imageStorageRef, e.profileUrl, {
        contentType: e.profileUrl.type,
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
  // for use if you want to show the rejected files and errors
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
    <div className="bg-slate-200">
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
      <div className="flex flex-col lg:flex-row gap-2">
        <div className="w-full">
          <FormLabel label="Profile Picture" htmlFor="profile" />
          <DragDrop
            getRootProps={getRootProps}
            errors={errors}
            getInputProps={getInputProps}
            id={"profileUrl"}
          />
          {imageDetails.imgName ? <p>{imageDetails.imgName}</p> : ""}
          {/* {fileRejectionItems} */}
        </div>
        <div className="flex flex-col">
          <p className="text-center">Preview</p>
          <img
            className="mx-auto object-cover rounded-full w-[200px] aspect-square"
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
      <RoundButton type="submit" bgColorClass=" max-w-2xl bg-indigo-600">
        Save Changes
      </RoundButton>
    </form>
    </div>
  );
};

export default Profile;
