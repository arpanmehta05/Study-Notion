import React from "react";

export default function RequiremntFeild({
  name,
  label,
  register,
  setValue,
  errors,
  getValues,
}) {
  return (
    <div className="flex flex-col space-y-2">
      <label className="text-sm text-[#f1f2ff]" htmlFor={name}>
        {label} <sup className="text-[#EF476F]">*</sup>
      </label>
    </div>
  );
}
