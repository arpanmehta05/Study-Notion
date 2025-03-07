import React from "react";
import { HiUser } from "react-icons/hi";
import { ImTree } from "react-icons/im";

export default function CourseCardHome({
  setcurrentCard,
  currentCard,
  cardData,
}) {
  return (
    <div
      className={`w-[360px] ${
        currentCard === cardData.heading
          ? "bg-white shadow-[12px_12px_0_0] shadow-[#FFD60A]"
          : "bg-[#161D29]"
      } text-[#DBDDEA] h-[300px] box-border cursor-pointer mt-8`}
      onClick={() => {
        setcurrentCard(cardData?.heading);
      }}
    >
      <div className="border-b-[2px] border-dashed border-[#6E727F] p-6 flex flex-col gap-3 h-[80%]">
        <div
          className={` ${
            currentCard === cardData?.heading && "text-[#161D29]"
          } font-bold text-[20px]`}
        >
            {cardData?.heading}
        </div>
        <div
        className="text-[#6E727F] font-semibold"
        >
            {cardData?.description}
        </div>
      </div>
      <div
        className={`flex px-6 py-3 font-medium justify-between ${
          currentCard === cardData.heading ? "text-[#0F7A9D]" : "text-[#838894]"
        }`}
      >
        <div className="flex items-center gap-2 text-[16px]">
          <HiUser />
          <p>{cardData?.level}</p>
        </div>
        <div className="flex items-center gap-2 text-[16px]">
          <ImTree />
          <p>{cardData?.lessionNumber} Lesions</p>
        </div>
      </div>
    </div>
  );
}
