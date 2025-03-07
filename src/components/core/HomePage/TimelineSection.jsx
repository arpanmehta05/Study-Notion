import React from "react";

const TimeLine = [
  {
    Logo: "./Logo1.svg",
    Heading: "Leadership",
    Description: "Fully committed to the success company",
  },
  {
    Logo: "./Logo2.svg",
    Heading: "Responsibility",
    Description: "Students will always be our top priority",
  },
  {
    Logo: "./Logo3.svg",
    Heading: "Flexibility",
    Description: "The ability to switch is an important skills",
  },
  {
    Logo: "./Logo4.svg",
    Heading: "Solve the problem",
    Description: "Code your way to a solution",
  },
];

export default function TimelineSection() {
  return (
    <div>
      <div className="flex flex-row gap-20 items-center ">
        <div className="w-[45%] flex flex-col gap-5">
          {TimeLine.map((ele, i) => {
            return (
              <div className="flex flex-col gap-3" key={i}>
                <div className="flex gap-6">
                  <div className="w-[52px] h-[52px] bg-white rounded-full flex justify-center items-center shadow-[#00000012] shadow-[0_0_62px_0]">
                    <img src={ele.Logo} alt="" />
                  </div>
                  <div>
                    <h2 className="font-semibold text-[18px]">{ele.Heading}</h2>
                    <p className="text-base">{ele.Description}</p>
                  </div>
                </div>
                <div
                  className={`hidden ${
                    TimeLine.length - 1 === i ? "hidden" : "lg:block"
                  }  h-14 border-dotted border-r border-richblack-100 bg-richblack-400/0 w-[26px]`}
                ></div>
              </div>
            );
          })}
        </div>
        <div className="relative w-fit h-fit shadow-[#118AB2] shadow-[0px_0px_30px_0px]">
          <img
            src="./TimelineImage.png"
            alt="TimelineImage"
            className="shadow-white shadow-[20px_20px_0px_0px] object-cover h-[400px] lg:h-fit"
          />
          <div className="absolute bg-[#014A32] flex flex-row text-white uppercase py-7 left-1/2 translate-x-[-50%] translate-y-[-78%]">
            <div className="flex felx-row gap-5 items-center border-r border-[#05A77B] px-7">
              <p className="text-3xl font-bold ">10</p> 
              <p className="text-sm text-[#05A77B] ">Years of Experience</p>
            </div>
            <div className="flex gap-5 items-center px-7">
            <p className="text-3xl font-bold ">250</p> 
            <p className="text-sm text-[#05A77B] ">Type of Courses</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
