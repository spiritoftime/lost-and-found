import React, { useState } from "react";
import { database, storage } from "../firebase";
import {
  onChildAdded,
  push,
  ref,
  set,
  update,
  serverTimestamp,
} from "firebase/database";
import { uploadBytes, getDownloadURL, ref as sRef } from "firebase/storage";
import { useNavigate } from "react-router-dom";

import FormRow from "./FormRow";
import FormRowSelect from "./FormRowSelect";
import TextArea from "./TextArea";
import { useAppContext } from "../context/appContext";
import useDrop from "../pages/profile_page/useDrop";
import DragDrop from "../pages/profile_page/DragDrop";
import { YupFormSchema, defaultValues } from "./YupFormSchema";
import useIsEditing from "../custom hooks/useIsEditing";

const DB_REPORT_KEY = "report";
const Form = ({ reportType }) => {
  const navigate = useNavigate();
  const { authDetails, report, setReport } = useAppContext();
  // stores states for forms
  // const initialState = {
  //   uid:"",
  //   username:"",
  //   reportType:reportType,
  //   petName: "",
  //   respondsTo:"",
  //   gender: '',
  //   category: '',
  //   lastSeen:"",
  //   contactNumber: "",
  //   microChipNumber:"",
  //   description:"",
  //   imageURL:""
  // }
  // const [values, setValues] = useState(initialState)
  // stores image file uploaded by user
  const [fileUpload, setFileUpload] = useState("");
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
      setValue("imageURL", acceptedFiles[0]);
      setFileUpload(acceptedFiles[0].name);
    },
    YupFormSchema(report.reportType),
    defaultValues(report, report.reportType, report.isEditing),
    "imageURL"
  );

  //handle Submit
  const makeReport = (e) => {
    // upload the file in fileUploadstate to firebase Storage
    if (report.isEditing && !e.imageURL) {
      const reportRef = ref(database, DB_REPORT_KEY + "/" + report.reportId);
      const generateReport = {
        ...e,
        imageURL: report.imageURL,
        uid: authDetails.uid,
        username: authDetails.username,
        reportType: report.reportType,
        createdAt: serverTimestamp(),
      };
      set(reportRef, generateReport);
      setReport((prev) => {
        return {
           isEditing: false,
          
        };
      });
      navigate("/feed");
    }
    const storageRef = sRef(storage, `images/${e.imageURL.name}`);

    // once uploaded , generate the download URL , then post the report t
    uploadBytes(storageRef, e.imageURL, {
      contentType: e.imageURL.type,
    })
      .then((snapshot) => {
        return getDownloadURL(snapshot.ref);
      })
      .then((url) => {
        const reportListRef = ref(database, DB_REPORT_KEY);
        let reportRef = "";
        if (report.isEditing === false) reportRef = push(reportListRef);
        else reportRef = ref(database, DB_REPORT_KEY + "/" + report.reportId);
        const generateReport = {
          ...e,
          imageURL: url,
          uid: authDetails.uid,
          username: authDetails.username,
          reportType: report.reportType,
          createdAt: serverTimestamp(),
        };

        set(reportRef, generateReport);
        setReport((prev) => {
          return { ...prev, isEditing: false };
        });
        navigate("/feed");
      });
  };

  return (
    <>
      <div>
        <div className="mt-5 md:col-span-2 md:mt-0 h-full w-full">
          <form onSubmit={handleSubmit(makeReport)}>
            <div className="shadow sm:overflow-hidden sm:rounded-md">
              <div className="space-y-6 bg-white px-4 py-5 sm:p-6">
                {/*Name*/}
                {reportType === "missing" && (
                  <div className="space-y-6">
                    {" "}
                    <label
                      htmlFor="petName"
                      className="block text-sm font-medium leading-6 text-gray-900"
                    >
                      Pet's Name
                    </label>
                    <FormRow
                      register={register}
                      errors={errors}
                      name="petName"
                      type="text"
                      placeholder={"Pet's name"}
                    />
                  </div>
                )}

                {/*Responds to*/}
                {reportType === "missing" && (
                  <div className="space-y-6">
                    {" "}
                    <label
                      htmlFor="respondsTo"
                      className="block text-sm font-medium leading-6 text-gray-900"
                    >
                      Responds to
                    </label>
                    <div className="h-100">
                      {" "}
                      <p> </p>
                    </div>
                    <FormRow
                      register={register}
                      errors={errors}
                      name="respondsTo"
                      type="text"
                      placeholder="Responds to"
                    />
                  </div>
                )}

                {/*Species*/}
                <label
                  htmlFor="category"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Category
                </label>
                <FormRowSelect
                  register={register}
                  errors={errors}
                  name="category"
                  options={[
                    "dog",
                    "cat",
                    "bird",
                    "rabbit",
                    "hamster",
                    "others",
                  ]}
                />

                {/*Gender*/}
                <label
                  htmlFor="gender"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Gender
                </label>
                <FormRowSelect
                  register={register}
                  errors={errors}
                  name="gender"
                  options={["male", "female"]}
                />

                {/*Last Seen*/}
                <label
                  htmlFor="lastSeen"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Last seen
                </label>
                <FormRow
                  register={register}
                  errors={errors}
                  name="lastSeen"
                  type="text"
                  placeholder="postal code"
                />

                {/*Contact Number  CHECK WITH SAMUEL HOW TO LIMIT NUMBER OF CHARACTERS*/}
                <label
                  htmlFor="contactNumber"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Contact Number
                </label>
                <FormRow
                  register={register}
                  errors={errors}
                  name="contactNumber"
                  type="number"
                  placeholder="Contact number"
                />

                {/*Micro Chip Number*/}
                <label
                  htmlFor="microChipNumber"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Micro chip Number
                </label>
                <FormRow
                  register={register}
                  errors={errors}
                  name="microChipNumber"
                  type="number"
                  placeholder="Microchip number"
                />

                {/*Description*/}

                <label
                  htmlFor="description"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Description
                </label>
                <TextArea
                  register={register}
                  name="description"
                  placeholder="More details..."
                />

                <div>
                  <label className="block text-sm font-medium leading-6 text-gray-900">
                    Pet photo
                  </label>
                </div>
                <DragDrop
                  getInputProps={getInputProps}
                  getRootProps={getRootProps}
                  errors={errors}
                  id={"imageURL"}
                />
                {fileUpload ? <p>{fileUpload}</p> : ""}
              </div>
              <div className="bg-gray-50 px-4 py-3 text-right sm:px-6">
                <button
                  type="submit"
                  className="inline-flex justify-center rounded-md bg-indigo-600 py-2 px-3 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
                >
                  {report.isEditing ? "Update" : "Submit"}
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default Form;
