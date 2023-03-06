import React, { useState } from 'react'
import Form from '../../components/Form'
import { useAppContext } from '../../context/appContext'
import lostPet from "../../images/lost-cat.png";
import spottedPet from "../../images/spotted-cat.png";

 
const Report = () => {
  
  const [reportType,setReportType]= useState("")


  
     
  return (
    <>

    <div className="w-screen h-screen bg-slate-400 flex justify-center">      

     
       

      {/*Display report options if !reportType*/}
       {!reportType && 
       
       <div className="flex flex-col justify-center content-center flex-wrap  w-5/6  " >
        {/*Title*/}
        <div className='mb-10 text-center text-2xl font-bold tracking-tight text-gray-900 dark:text-white"'>I would like to make a ... </div>

        <div className="flex flex-row gap-5 " >
        {/*Missing Card*/}
        <a href="#" className="block max-w-sm p-10 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700"
        onClick= {()=>setReportType("missing")}>
         <img src={lostPet}  className="object-scale-down h-48 w-96 "></img>
         <h5 className="mb-2  mt-5 text-center text-2xl font-bold tracking-tight text-gray-900 dark:text-white">Missing Report</h5>
        </a>


        {/*Spotted Card*/}
        <a href="#" className="block max-w-sm p-10 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700"
         onClick= {()=>setReportType("spotted")}>
        <img src={spottedPet} className="object-scale-down h-48 w-96 "></img>
         <h5 className="mb-2 mt-5 text-center text-2xl font-bold tracking-tight text-gray-900 dark:text-white">Spotted Report</h5>
        </a>
        </div>
       

      </div>} 

       


      {/*Display report  if reportType*/}
       {reportType && 
       <div className="mt-10 flex flex-col w-1/2">
        <div className="flex place-content-center">
        <button
          type="submit"
          className="w-40 mb-5  rounded-md bg-indigo-600 py-2 px-3 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
          onClick={()=>setReportType("")}
          >
          Back
        </button> 
        </div>
         
        <div className=" w-full h-full">
        <Form reportType={reportType}/>
        </div>
       
        </div>}
    </div>      
  </>      
  )
}

export default Report
