import React from "react";

export default function Tab({ tabData, feild, setFeild }) {
  return (
    <div
      style={{
        boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
      }}
      className="flex bg-[#161D29] p-1 gap-x-1 my-6 rounded-full max-w-max"
    >
      {tabData.map((tab) => (
        <button
          key={tab?.id}
          onClick={() => setFeild(tab?.tabType)}
          className={`py-2 px-5 rounded-full transition-all duration-200 cursor-pointer ${
            feild === tab?.tabType
              ? "bg-[#000814] text-[#F1F2FF]"
              : "bg-[#ffffff01] text-[#999DAA]"
          }`}
        >
          {tab?.tabName}
        </button>
      ))}
    </div>
  );
}
