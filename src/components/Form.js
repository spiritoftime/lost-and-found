import React, { useState } from 'react'
import { database,storage} from '../firebase'
import { onChildAdded, push, ref, set } from 'firebase/database'
import { uploadBytes, getDownloadURL, ref as sRef } from 'firebase/storage'
 
import FormRow from './FormRow'
import FormRowSelect from './FormRowSelect'
import TextArea from './TextArea'
 
const DB_REPORT_KEY = 'report'
const Form = ({reportType}) => {
 

  // stores states for forms 
  const initialState = {  

    reportType:reportType,
    petName: '',
    respondsTo:"",
    gender: '',
    category: '',
    lastSeen:"",
    contactNumber: "",
    microChipNumber:"",
    description:"",     
    imageURL:""
  } 
  const [values, setValues] = useState(initialState)
  // stores image file uploaded by user 
  const [fileUpload,setFileUpload] = useState("")


  // handle form changes 
  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value })
  }

  
  // handle user image input 
  //stores file in fileUpload state 
  const handleFileChange =(e)=>{     
    setFileUpload(e.target.files[0])     
  }  

  //handle Submit 
  const handleSubmit = (e) => {
  e.preventDefault()

  // generate a name for the image 
  const generateImageName = (str) => {
    const strSplit = str.split('.')
    return strSplit[0]
  }

  // upload the file in fileUploadstate to firebase Storage    
  const fileName = generateImageName(fileUpload.name)
  console.log(fileName)

  const storageRef = sRef(storage, `images/${fileName}`)
  
  // once uploaded , generate the download URL , then post the report t
  uploadBytes(storageRef, values.fileUpload)
      .then((snapshot) => {
       return( getDownloadURL(snapshot.ref))
      })
      .then((url) => {
        console.log(url)
        
        const reportListRef = ref(database, DB_REPORT_KEY)
        const newReportRef = push(reportListRef)

        // sets the imageURL not by setting state, but by creating a shallow copy of the initial state and inputing the imageURL
        // doing this because if i try to setState for imageURL then post the report, it will post even before the imageURL has been updated
        // is there a better way to do this with async await? 
        const report = {...values,imageURL:url}
        set( newReportRef, report)
      })
  }
 
 
 
    
  return (
    <>
      <div>
         
          <div className="mt-5 md:col-span-2 md:mt-0 h-full w-full">
            <form action="#" method="POST">
              <div className="shadow sm:overflow-hidden sm:rounded-md">
                <div className="space-y-6 bg-white px-4 py-5 sm:p-6"> 
                      
                    {/*Name*/}
                    {reportType==="missing" &&  
                    <div className="space-y-6"> <label htmlFor="petName" className="block text-sm font-medium leading-6 text-gray-900">
                        Pet's Name
                      </label>
                      <FormRow name="petName" type="text" placeholder="Pet's name" handleChange={handleChange}/>
                    </div>                     
                    }
                     

                    {/*Responds to*/}
                    {reportType==="missing" &&  
                    <div className="space-y-6" > <label htmlFor="respondsTo" className="block text-sm font-medium leading-6 text-gray-900">
                        Responds to
                      </label>
                      <div className='h-100'> <p> </p></div>
                        
                      <FormRow name="respondsTo" type="text" placeholder="Responds to" handleChange={handleChange}/>
                      </div>                     
                    }


                      {/*Species*/}
                      <label htmlFor="category" className="block text-sm font-medium leading-6 text-gray-900">
                        Species
                      </label>
                      <FormRowSelect name="category" value={values.category} options={["dog","cat","bird","rabbit","hamster","others"]} handleChange={handleChange}/>
                      
                      {/*Gender*/}
                      <label htmlFor="gender" className="block text-sm font-medium leading-6 text-gray-900">
                        Gender
                      </label>
                      <FormRowSelect name="gender"  value={values.gender} options={["male","female"]} handleChange={handleChange}/>
                      
                      {/*Last Seen*/}
                      <label htmlFor="lastSeen" className="block text-sm font-medium leading-6 text-gray-900">
                        Last seen
                      </label>
                      <FormRow name="lastSeen" type="text" placeholder="postal code" handleChange={handleChange}/>
                     
                      
                      {/*Contact Number  CHECK WITH SAMUEL HOW TO LIMIT NUMBER OF CHARACTERS*/}
                      <label htmlFor="contactNumber" className="block text-sm font-medium leading-6 text-gray-900">
                       Contact Number 
                      </label>
                      <FormRow name="contactNumber" type="number" placeholder="Contact number" handleChange={handleChange}/>

                      {/*Micro Chip Number*/}
                      <label htmlFor="microChipNumber" className="block text-sm font-medium leading-6 text-gray-900">
                       Micro chip Number 
                      </label>
                      <FormRow name="microChipNumber"  type="number" placeholder="Microchip number" handleChange={handleChange}/>

                       {/*Description*/}                  
           
                       <label htmlFor="description" className="block text-sm font-medium leading-6 text-gray-900">
                        Description
                       </label>
                       <TextArea name="description" placeholder="More details..."/>
                        
                  

                  

                  <div>
                    <label className="block text-sm font-medium leading-6 text-gray-900">Pet photo</label>
                    <div className="mt-2 flex justify-center rounded-md border-2 border-dashed border-gray-300 px-6 pt-5 pb-6">
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
                            htmlFor="fileUpload"
                            className="relative cursor-pointer rounded-md bg-white font-medium text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-500 focus-within:ring-offset-2 hover:text-indigo-500"
                          >
                            <span>Upload a file</span>
                            <input id="fileUpload" name="fileUpload" type="file" className="sr-only" onChange={handleFileChange} />
                          </label>
                          <p className="pl-1">or drag and drop</p>
                        </div>
                        <p className="text-xs text-gray-500">PNG, JPG, GIF up to 10MB</p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="bg-gray-50 px-4 py-3 text-right sm:px-6">
                  <button
                    type="submit"
                    className="inline-flex justify-center rounded-md bg-indigo-600 py-2 px-3 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
                    onClick={handleSubmit}
                  >
                    Submit
                  </button>
                </div>
              </div>
            </form>
          </div>
         
      </div>

      
    </>
  )
}

export default Form
