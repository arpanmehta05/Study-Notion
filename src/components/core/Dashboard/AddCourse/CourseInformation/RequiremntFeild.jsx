import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

export default function RequiremntFeild({
  name,
  label,
  register,
  setValue,
  errors,
  getValues,
}) {
  const { editCourse, course } = useSelector((state) => state.course);
  const [requirement, setRequirement] = useState("");
  const [requirementList, setRequirementList] = useState([]);

  useEffect(() => {
    if (editCourse) {
      setRequirementList(course?.instructions);
    }
    register(name, { required: true, validate: (value) => value.length > 0 });
  }, []);

  useEffect(() => {
    setValue(name, requirement);
  }, [requirementList]);

  const handleAddRequirement = () => {
    if (requirement) {
      setRequirementList([...requirementList, requirement]);
      setRequirement("");
    }
  };

  const handleRemoveRequirement = (index) => {
    const updatedList = [...requirementList];
    updatedList.splice(index, 1);
    setRequirementList(updatedList);
  };

  return (
    <div className="flex flex-col space-y-2">
      <label className="text-sm text-[#f1f2ff]" htmlFor={name}>
        {label} <sup className="text-[#EF476F]">*</sup>
      </label>
      <div className="flex flex-col items-start space-y-2">
        <input
          type="text"
          id={name}
          value={requirement}
          onChange={(e) => setRequirement(e.target.value)}
          className="form-style w-full"
        />
        <button
          type="button"
          onClick={handleAddRequirement}
          className="font-semibold text-[#FFD60A] cursor-pointer"
        >
          Add
        </button>
      </div>
      {requirementList.length > 0 && (
        <ul className="mt-2 list-inside list-disc">
          {requirementList.map((requirement, idx) => (
            <li key={idx} className="flex items-center text-[#f1f2ff]">
              <span>{requirement}</span>
              <button
                type="button"
                onClick={() => handleRemoveRequirement(idx)}
                className="ml-2 text-xs text-[#888888] cursor-pointer"
              >
                Clear
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
