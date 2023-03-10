import React, { useState,useEffect } from 'react'
import { database,storage } from '../../firebase';
import { onChildAdded, push, ref, set } from 'firebase/database'
import petImage from "../../images/petImage.jpeg";
import NavBar from '../../components/NavBar';
import Sort from '../../components/Sort';
import { useAppContext } from '../../context/appContext';
//DB stuff

const DB_REPORT_KEY = 'report'
const reportRef = ref(database, DB_REPORT_KEY)
 
const Feed = () => {

 const {values,setValues} =useAppContext()
 useEffect(()=>{
  onChildAdded(reportRef, (data) => {      

    setValues((report)=>{

      return ({...report,allReports:[...report.allReports,data.val()]})

    })
  
    // setPosts([...posts,data.val()])
    console.log(data.val())
    
  }
  )
} ,[])

   
// console.log(values.allReports)
  
  return (<>
    <NavBar/>
    <div className="grid grid-cols-5 ">
    {/*- Filter Nav*/ }
    <div className='  col-span-1   p-5 border-black'>
     <Sort/>
    </div>

    {/*- REPORT GRID*/}
    {values.filteredReports.length ===0 ? 
    
    <div className="mt-5">No Results...</div>

    
    
    : <div className=' col-span-4 p-5   border-black'>
    <div className="grid grid-cols-4 gap-5">
    {values.filteredReports && values.filteredReports.map((report,index)=>{
    return <  div key={index} className="max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
    
    <a href="#">
        <img className="rounded-t-lg" src={petImage} alt="" />
    </a>
    <div className={`p-2 tracking-wide text-center uppercase text-lg font-bold ${report.reportType==="missing" ? 'bg-red-100 text-red-400' : 'bg-green-100 text-green-600'} `}>{report.reportType}</div>
    <div className="p-5">
       <div  className="mb-5">

        <div   >Name: {report.petName}</div>
        <div   >Gender: {report.gender}</div>
        <div   >Category: {report.category}</div>
        <div   >Last seen: {report.lastSeen}</div>
        <div   >Contact no.: {report.contactNumber}</div>
        <div   >Microchip no.: {report.contactNumber}</div>
        
        </div>
        <a href="#" className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
            Details
            <svg aria-hidden="true" className="w-4 h-4 ml-2 -mr-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd"></path></svg>
        </a>
    </div>
    </div>
      })}
    </div>
    </div>
}
    


    </div>
   
    </>
  )
}

export default Feed
