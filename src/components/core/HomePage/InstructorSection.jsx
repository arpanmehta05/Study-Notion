import React from "react";
import Highlight from "./Highlight";
import CTAButton from "./Button";
import { FaArrowRight } from "react-icons/fa";

export default function InstrucotrSection() {
  return (
    <div className="mt-16">
      <div className="flex flex-col lg:flex-row gap-20 items-center">
        <div className="w-[50%]">
          <img
            src="./Instructor.png"
            alt=""
            className="shadow-white shadow-[-20px_-20px_0_0]"
          />
        </div>
        <div className="w-[50%] flex flex-col gap-10">
          <div className="text-[36px] font-semibold w-[50%]">
            Become an <Highlight text={"Instructor"} />
          </div>
          <p className="font-medium text-[16px] text-justify w-[90%] text-[#838894]">
            Instructors from around the world teach millions of students on
            StudyNotion. We provide the tools and skills to teach what you love.
          </p>
          <div className="w-fit items-center">
            <CTAButton active={true} linkto={"/signup"}>
              <div className="flex items-center gap-2">
                Start Learning Today
                <FaArrowRight />
              </div>
            </CTAButton>
          </div>
        </div>
      </div>
    </div>
  );
}
