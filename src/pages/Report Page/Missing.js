import React from "react";
import { Link } from "react-router-dom";
import Form from "../../components/Form";

const Missing = () => {
  return (
    <div className="w-screen min-h-screen bg-slate-400 flex justify-center">
    <div className="pb-4 mt-10 flex flex-col w-11/12 md:w-8/12">
        <div className="flex place-content-center">
          <button
            type="submit"
            className="w-40 mb-5  rounded-md bg-indigo-600 py-2 px-3 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
          >
            <Link to="/report">Back</Link>
          </button>
        </div>

        <div className=" w-full h-full mb-10  ">
          <Form reportType={"missing"} />
        </div>
      </div>
    </div>
  );
};

export default Missing;
