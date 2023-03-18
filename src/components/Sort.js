import React, { useEffect, useState } from "react";
import { useAppContext } from "../context/appContext";
import CheckBox from "./CheckBox";
import PurpleButton from "./PurpleButton";

const category = ["all", "dog", "cat", "bird", "hamster", "rabbit", "snake"];

const Sort = () => {
  const { values, setValues } = useAppContext();

  useEffect(() => {
    setValues({ ...values, filteredReports: [...values.allReports] });
  }, [values.allReports]);

  const soloCheckBox = (list) => {};

  const handleChange = (e) => {
    console.log("box ticked");
    setValues({ ...values, [e.target.name]: e.target.value });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    let tempReports = [...values.allReports];
    const { reportType, gender, category } = values;

    {
      /*Filter reportType*/
    }
    if (values.reportType !== "all") {
      tempReports = tempReports.filter(
        (report) => report.reportType === reportType
      );
    }

    {
      /*Filter Gender*/
    }

    if (values.gender !== "all") {
      tempReports = tempReports.filter((report) => report.gender === gender);
    }

    {
      /*Filter Category*/
    }

    if (values.category !== "all") {
      tempReports = tempReports.filter(
        (report) => report.category === category
      );
    }

    setValues({ ...values, filteredReports: tempReports });
  };

  const handleReset = () => {
    setValues({
      ...values,
      filteredReports: [...values.allReports],
      reportType: "all",
      gender: "all",
      category: "all",
    });

    document
      .querySelectorAll("input[type=checkbox]")
      .forEach((el) => (el.checked = false));
  };

  return (
    <div className="block max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
      {/* Reset Filter Button */}
      <div className="grid grid-cols-2">
        <label className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
          Filters
        </label>
        <PurpleButton label={"Reset"} handleSubmit={handleReset} />
      </div>
      <hr className="h-px my-2 bg-gray-200 border-0 dark:bg-gray-700"></hr>
      {/*Status Filter  */}
      <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
        Status
      </h5>
      <div className="grid grid-cols-2">
        <CheckBox
          name={"reportType"}
          value={"all"}
          handleChange={handleChange}
          checked={values.reportType === "all"}
        />
        <CheckBox
          name={"reportType"}
          value={"missing"}
          handleChange={handleChange}
          checked={values.reportType === "missing"}
        />
        <CheckBox
          name={"reportType"}
          value={"spotted"}
          handleChange={handleChange}
          checked={values.reportType === "spotted"}
        />
      </div>
      {/*Category Filter  */}
      <hr className="h-px my-2 bg-gray-200 border-0 dark:bg-gray-700"></hr>
      <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
        Category
      </h5>
      <div className="grid grid-cols-3">
        {category.map((c, index) => {
          return (
            <CheckBox
              key={index}
              value={c}
              name={"category"}
              handleChange={handleChange}
              checked={values.category === c}
            />
          );
        })}
      </div>
      {/*Gender Filter  */}
      <hr className="h-px my-2 bg-gray-200 border-0 dark:bg-gray-700"></hr>
      <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
        Gender
      </h5>
      <div className="grid grid-cols-3">
        <CheckBox
          name={"gender"}
          value={"all"}
          handleChange={handleChange}
          checked={values.gender === "all"}
        />
        <CheckBox
          name={"gender"}
          value={"male"}
          handleChange={handleChange}
          checked={values.gender === "male"}
        />
        <CheckBox
          name={"gender"}
          value={"female"}
          handleChange={handleChange}
          checked={values.gender === "female"}
        />
      </div>

      <button
        type="submit"
        className="w-full mt-5 inline-flex justify-center rounded-md bg-indigo-600 py-2 px-3 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
        onClick={handleSubmit}
      >
        Submit
      </button>
    </div>
  );
};

export default Sort;
