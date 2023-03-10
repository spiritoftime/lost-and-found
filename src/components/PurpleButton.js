import React from 'react'

const PurpleButton = ({label,handleSubmit}) => {
  return (
    <button
        type="submit"
        className="inline-flex justify-center rounded-md bg-indigo-600 py-2 px-3 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
        onClick={handleSubmit}
     >
                    {label}
     </button>
  )
}

export default PurpleButton
