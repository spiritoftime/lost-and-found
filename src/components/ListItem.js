import React from 'react'
import PurpleButton from './PurpleButton'

const ListItem = ({report}) => {
  return (
    <div     
    className="w-5/6 grid grid-cols-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700"
    >
    <div className="col-span-1">
    <a href="#">
      <img
        src={report.imageURL}
        className="w-full h-full rounded-lg object-cover aspect-[5/3]"
        alt=""
      />
    </a>
    </div>

    <div className="col-span-4 p-5 grid grid-cols-1 gap-2">
        <div><text className="font-bold">Name: </text>{report.petName}</div>        
        <div><text className="font-bold">Contact: </text> {report.contactNumber}</div>
        <h5 className="font-bold" >Description:</h5>   
        {report.description}
        <div><PurpleButton label="comment"/></div>     
    </div>

    
    <div
      className={`col-span-1 grid justify-center content-center border-2 ${
        report.reportType === "missing"
          ? "bg-red-100 text-red-400"
          : "bg-green-100 text-green-600"
      } `}
    >
      <text className="text-2xl font-extrabold">{report.reportType}</text>
    </div>
     

     
      
    </div>
  )
}

export default ListItem