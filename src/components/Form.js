import React, { useState } from "react";
import { database, storage } from "../firebase";
import { onChildAdded, push, ref, set, update } from "firebase/database";
import { uploadBytes, getDownloadURL, ref as sRef } from "firebase/storage";

import FormRow from "./FormRow";
import FormRowSelect from "./FormRowSelect";
import TextArea from "./TextArea";
import { useAppContext } from "../context/appContext";
import useDrop from "../pages/profile_page/useDrop";
import { YupProfileSchema } from "../pages/profile_page/YupProfileSchema";
import DragDrop from "../pages/profile_page/DragDrop";

const DB_REPORT_KEY = "report";
const Form = ({ reportType }) => {
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
      setFileUpload(acceptedFiles[0].name);
      setValue("imageUrl", acceptedFiles[0]);
    },
    YupProfileSchema,
    {
      petName: report.petName,
      respondsTo: report.respondsTo,
      species: report.species,
      gender: report.gender,
      lastSeen: report.lastSeen,
      contactNumber: report.contactNumber,
      microChipNumber: report.microChipNumber,
    },
    "imageUrl"
  );
  console.log(register);
  const [fileUpload, setFileUpload] = useState("");

  // handle form changes
  const handleChange = (e) => {
    setReport({ ...report, [e.target.name]: e.target.value });
  };

  // handle user image input
  //stores file in fileUpload state

  //handle Update

  const updateReport = (data) => {
    console.log(update);

    set(ref(database, `report/${data.reportId}`), data);

    console.log("update report success");
  };

  //handle Submit
  const makeReport = (e) => {
    e.preventDefault();

  if(report.isEditing === true){
    updateReport(report)
  } else {

  // generate a name for the image 
  const generateImageName = (str) => {
    const strSplit = str.split('.')
    return strSplit[0]
  }
  

  

  // upload the file in fileUploadstate to firebase Storage    
  const fileName = generateImageName(fileUpload.name)
  console.log(fileName)

      const storageRef = sRef(storage, `images/${fileName}`);

      // once uploaded , generate the download URL , then post the report t
      uploadBytes(storageRef, report.fileUpload)
        .then((snapshot) => {
          return getDownloadURL(snapshot.ref);
        })
        .then((url) => {
          console.log(url);

          const reportListRef = ref(database, DB_REPORT_KEY);
          const newReportRef = push(reportListRef);

          // sets the imageURL not by setting state, but by creating a shallow copy of the initial state and inputing the imageURL
          // doing this because if i try to setState for imageURL then post the report, it will post even before the imageURL has been updated
          // is there a better way to do this with async await?
          const generateReport = {
            ...report,
            imageURL: url,
            uid: authDetails.uid,
            username: authDetails.username,
          };
          set(newReportRef, generateReport);
        });
    }
  };

  return (
    <>
      <div>
        <div className="mt-5 md:col-span-2 md:mt-0 h-full w-full">
          <form action="#" method="POST">
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
                  Species
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
                <TextArea name="description" placeholder="More details..." />

                <div>
                  <label className="block text-sm font-medium leading-6 text-gray-900">
                    Pet photo
                  </label>
                </div>
                <DragDrop
                  getInputProps={getInputProps}
                  getRootProps={getRootProps}
                  errors={errors}
                  id={"imageUrl"}
                />
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
