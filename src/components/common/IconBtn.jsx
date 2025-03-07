import React from "react";

export default function IconBtn({
  text,
  onclick,
  children,
  disabled,
  outline = false,
  customClasses,
  type
}) {
  return (
    <button
      disabled={disabled}
      onClick={onclick}
      className={`flex items-center ${
        outline ? "border border-[#FFD604] bg-transparent" : "bg-[#FFD60A]"
      } cursor-pointer gap-x-2 rounded-md py-2 px-5 font-semibold text-[#000814] ${customClasses}`}
      type={type}
    >
      {children ? (
        <>
          <span className={`${outline && "text-[#FFD60A]"}`}>{text}</span>
          {children}
        </>
      ) : (
        text
      )}
    </button>
  );
}
