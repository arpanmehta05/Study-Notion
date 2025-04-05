import React from "react";
import { useSelector } from "react-redux";
import { FaCheck } from "react-icons/fa";
import CourseInformation from "./CourseInformation/CourseInformation";
import CourseBuilderForm from "./CourseBuilder/CourseBuilderForm";
import PublishCourse from "./PublishCourse/index";

export default function RenderSteps() {
  const { step } = useSelector((state) => state.course);
  const steps = [
    {
      id: 1,
      title: "Course Information",
    },
    {
      id: 2,
      title: "Course Builder",
    },
    {
      id: 3,
      title: "Publish",
    },
  ];
  return (
    <>
      <div className="relative mb-2 flex w-full justify-center">
        {steps.map((item) => {
          return (
            <>
              <div className="flex flex-col items-center " key={item.id}>
                <button
                  className={`grid cursor-default aspect-square w-[34px] place-items-center rounded-full border-[1px] ${
                    step === item.id
                      ? "border-[#FFD166] bg-[#291100] text-[#FFD166] "
                      : "border-[#2C333F] bg-[#161D29] text-[#838894]"
                  } ${step > item.id && "bg-[#FFD166] text-[#FFD166]"}} `}
                >
                  {step > item.id ? (
                    <FaCheck className="font-bold text-richblack-900" />
                  ) : (
                    item.id
                  )}
                </button>
              </div>
              {item.id !== steps.length && (
                <>
                  <div
                    className={`h-[calc(34px/2)] w-[33%]  border-dashed border-b-2 ${
                      step > item.id ? "border-[#FFD166]" : "border-[#585D69]"
                    }`}
                  ></div>
                </>
              )}
            </>
          );
        })}
      </div>

      <div className="relative mb-16 flex w-full select-none justify-between">
        {steps.map((item) => {
          return (
            <>
              <div
                className="flex min-w-[130px] flex-col items-center gap-y-2"
                key={item.id}
              >
                <p
                  className={`text-sm ${
                    step >= item.id ? "text-[#f1f2ff]" : "text-[#585D69]"
                  }`}
                >
                  {item.title}
                </p>
              </div>
            </>
          );
        })}
      </div>
      {step === 1 && <CourseInformation />}
      {step === 2 && <CourseBuilderForm />}
      {step === 3 && <PublishCourse />}
    </>
  );
}
