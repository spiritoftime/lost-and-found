import React from 'react'
import Form from '../../components/Form'
import { useAppContext } from '../../context/appContext'
 
const Report = () => {
     
  return (
     <div className="flex justify-center">

        {/* <FormBox/> */}
       
      <div className="flex flex-col flex-wrap  w-5/6  ">
        <div   className="flex justify-center gap-5 m-10" >
          <button   className="inline-flex justify-center rounded-md bg-indigo-600 py-2 px-3 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500">Missing</button>
          <button   className="inline-flex justify-center rounded-md bg-indigo-600 py-2 px-3 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500">Spotted</button>
        </div>
        <Form/> 
      </div>
      


     </div>
        
  )
}

export default Report
