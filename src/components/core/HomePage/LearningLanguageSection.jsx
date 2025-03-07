import React from "react";
import Highlight from "./Highlight";
import CTAButton from "./Button";

export default function LearningLanguageSection() {
  return (
    <div className="mt-[130px] mb-32">
      <div className="flex flex-col gap-5 items-center">
        <div className="text-4xl font-semibold text-center">
          Your Swiss Knife for <Highlight text={"learning any language"} />
        </div>
        <div className="text-center text-[#424854] mx-auto text-base mt-3 font-medium w-[70%]">
          Using spin making learning multiple languages easy. with 20+ languages
          realistic voice-over, progress tracking, custom schedule and more.
        </div>
        <div className="flex-row flex items-center justify-center mt-5">
          <img
            src="./Know_your_progress.png"
            alt=""
            className="object-contain -mr-28"
          />
          <img
            src="./Compare_with_others.png"
            alt=""
            className="object-contain"
          />
          <img
            src="./Plan_your_lessons.png"
            alt=""
            className="object-contain -ml-36"
          />
        </div>
        <div className="w-fit ">
          <CTAButton active={true} linkto={"/signup"}>
            Learn More
          </CTAButton>
        </div>
      </div>
    </div>
  );
}
