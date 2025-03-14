import React, { useEffect, useState } from "react";
import { MdClose } from "react-icons/md";
import { useSelector } from "react-redux";

export default function ChipInput({
  label,
  name,
  placeholder,
  register,
  errors,
  setValue,
  getValues,
}) {
  const [chips, setChips] = useState([]);
  const { editCourse, course } = useSelector((state) => state.course);
  const handleDeleteChip = (chipndex) => {
    const newChips = chips.filter((_, index) => index !== chipndex);
    setChips(newChips);
  };

  useEffect(() => {
    if (editCourse) {
      setChips(course?.tag);
    }
    register(name, { required: true, validate: (value) => value.length > 0 });
  }, []);

  useEffect(() => {
    setValue(name, chips);
  }, [chips]);

  const handKeyDown = (e) => {
    if (e.key === "Enter" || event.key === ",") {
      e.preventDefault();
      const value = e.target.value.trim();
      if (value && !chips.includes(value)) {
        const newChips = [...chips, value];
        setChips(newChips);
        e.target.value = "";
      }
    }
  };

  return (
    <div className="flex flex-col space-y-2">
      <label htmlFor={name} className="text-sm text-[#f1f2ff]">
        {label} <sup className="text-[#EF476F]">*</sup>
      </label>
      <div className="flex w-full flex-wrap gap-y-2">
        {chips.map((chip, index) => (
          <div
            key={index}
            className="m-1 flex items-center rounded-full bg-[#9E8006] px-2 py-1 text-sm text-[#f1f2ff]"
          >
            {chip}
            <button
              type="button"
              className="ml-2 focus-outline-none"
              onClick={() => {
                handleDeleteChip(index);
              }}
            >
              <MdClose className="text-sm" />
            </button>
          </div>
        ))}
        <input
          id={name}
          name={name}
          type="text"
          placeholder={placeholder}
          onKeyDown={handKeyDown}
          className="form-style w-full"
        />
      </div>
      {errors[name] && (
        <span className="ml-2 text-xs tracking-wide text-[#EF476F]">
          {label} is required
        </span>
      )}
    </div>
  );
}
