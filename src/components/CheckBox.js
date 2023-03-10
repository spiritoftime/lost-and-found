import React from 'react'

const CheckBox = ({name,value,handleChange}) => {
  return (
    <>
    <div>
    <label  for="default-checkbox" class="mr-2 ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">{value}</label>
    <input id={name} name={name} type="checkbox" value={value}  onChange={handleChange}  class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"/>
    </div>
   
    </>
  )
}

export default CheckBox
