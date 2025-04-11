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
    register(name, { required: true, validate: (value) => value.length > 0 });
  }, [register, name]);
  useEffect(() => {
    if (editCourse && course) {
      if (course.instructions && course.instructions.length > 0) {
        let processedInstructions = [];

        if (typeof course.instructions === "string") {
          try {
            processedInstructions = JSON.parse(course.instructions);
          } catch (e) {
            if (course.instructions.includes(",")) {
              processedInstructions = course.instructions
                .split(",")
                .map((i) => i.trim());
            } else {
              processedInstructions = [course.instructions];
            }
          }
        } else if (Array.isArray(course.instructions)) {
          processedInstructions = course.instructions;
        }
        processedInstructions = processedInstructions.filter(
          (item) => item && typeof item === "string" && item.trim() !== ""
        );
        setRequirementList(processedInstructions);
        setValue(name, processedInstructions);
      } else {
        console.log("No instructions found in course data");
        setRequirementList([]);
        setValue(name, []);
      }
    }
  }, [editCourse, course, setValue, name]);
  const handleAddRequirement = () => {
    if (requirement) {
      const newList = [...requirementList, requirement];
      setRequirementList(newList);
      setValue(name, newList);
      setRequirement("");
    }
  };
  const handleRemoveRequirement = (index) => {
    const newList = requirementList.filter((_, i) => i !== index);
    setRequirementList(newList);
    setValue(name, newList);
  };

  return (
    <div className="flex flex-col space-y-2">
      <label className="text-sm text-[#f1f2ff]" htmlFor={name}>
        {label} <sup className="text-[#EF476F]">*</sup>
      </label>
      <div className="flex flex-col items-start space-y-2">
        <input
          type="text"
          value={requirement}
          onChange={(e) => setRequirement(e.target.value)}
          className="form-style w-full"
          placeholder="Enter a requirement"
        />
        <button
          type="button"
          onClick={handleAddRequirement}
          className="font-semibold text-[#FFE83D]"
        >
          Add
        </button>
      </div>
      {requirementList.length > 0 && (
        <ul className="mt-2 list-inside list-disc">
          {requirementList.map((item, index) => (
            <li key={index} className="flex items-center text-[#C5C7D4]">
              <span>{item}</span>
              <button
                type="button"
                onClick={() => handleRemoveRequirement(index)}
                className="ml-2 text-xs text-[#EF476F]"
              >
                Remove
              </button>
            </li>
          ))}
        </ul>
      )}
      {errors[name] && (
        <span className="ml-2 text-xs tracking-wide text-[#EF476F]">
          At least one requirement is required
        </span>
      )}
    </div>
  );
}
