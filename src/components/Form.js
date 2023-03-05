import React, { useState } from 'react'
import FormRow from './FormRow'
import FormRowSelect from './FormRowSelect'
import TextArea from './TextArea'
 
const Form = () => {

  // stores states for forms 
  const initialState = {
    reportType:"",   
    petName: '',
    respondsTo:"",
    gender: '',
    species: '',
    contactNumber: "",
    microChipNumber:"",
    description:"",
    imageURL:""
  } 

  // handle form changes 
  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value })
  }
 
  const [values, setValues] = useState(initialState)



  return (
    <>
      <div>
         
          <div className="mt-5 md:col-span-2 md:mt-0">
            <form action="#" method="POST">
              <div className="shadow sm:overflow-hidden sm:rounded-md">
                <div className="space-y-6 bg-white px-4 py-5 sm:p-6"> 
                      
                    {/*Name*/}
                      <label htmlFor="petName" className="block text-sm font-medium leading-6 text-gray-900">
                        Pet's Name
                      </label>
                      <FormRow name="petName" type="text" placeholder="Pet's name" handleChange={handleChange}/>

                    {/*Responds to*/}
                      <label htmlFor="respondsTo" className="block text-sm font-medium leading-6 text-gray-900">
                        Responds to
                      </label>
                      <FormRow name="respondsTo" type="text" placeholder="Responds to" handleChange={handleChange}/>


                      {/*Gender*/}
                      <label htmlFor="gender" className="block text-sm font-medium leading-6 text-gray-900">
                        Gender
                      </label>
                      <FormRowSelect name="gender"  value={values.gender} options={["male","female"]} handleChange={handleChange}/>

                      {/*Species*/}
                      <label htmlFor="species" className="block text-sm font-medium leading-6 text-gray-900">
                        Species
                      </label>
                      <FormRowSelect name="species" value={values.species} options={["dog","cat","bird","rabbit","hamster","others"]} handleChange={handleChange}/>
                      
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
                            htmlFor="file-upload"
                            className="relative cursor-pointer rounded-md bg-white font-medium text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-500 focus-within:ring-offset-2 hover:text-indigo-500"
                          >
                            <span>Upload a file</span>
                            <input id="file-upload" name="file-upload" type="file" className="sr-only" />
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
