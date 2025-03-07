import React from "react";
import Highlight from "../HomePage/Highlight";
import CTAButon from "../HomePage/Button";

const LearningGridArray = [
  {
    order: -1,
    heading: "World-Class Learning for",
    highlightText: "Anyone, Anywhere",
    description:
      "Studynotion partners with more than 275+ leading universities and companies to bring flexible, affordable, job-relevant online learning to individuals and organizations worldwide.",
    BtnText: "Learn More",
    BtnLink: "/",
  },
  {
    order: 1,
    heading: "Curriculum Based on Industry Needs",
    description:
      "Save time and money! The Belajar curriculum is made to be easier to understand and in line with industry needs.",
  },
  {
    order: 2,
    heading: "Our Learning Methods",
    description:
      "Studynotion partners with more than 275+ leading universities and companies to bring",
  },
  {
    order: 3,
    heading: "Certification",
    description:
      "Studynotion partners with more than 275+ leading universities and companies to bring",
  },
  {
    order: 4,
    heading: `Rating "Auto-grading"`,
    description:
      "Studynotion partners with more than 275+ leading universities and companies to bring",
  },
  {
    order: 5,
    heading: "Ready to Work",
    description:
      "Studynotion partners with more than 275+ leading universities and companies to bring",
  },
];

export default function LearningGrid() {
  return (
    <div className="grid mx-auto w-[350px] xl:w-fit grid-cols-1 xl:grid-cols-4 mb-12">
      {LearningGridArray.map((item, i) => {
        return (
          <div
            key={i}
            className={`${i == 0 && "xl:col-span-2 xl:h-[294px]"} ${
              item.order % 2 == 1
                ? "h-[294px] bg-[#2C333F]"
                : item % 2 === 0
                ? "bg-[#161D29] h-[294px]"
                : "bg-[#ffffff01]"
            } ${item.order === 3 && "xl:col-start-2"}`}
          >
            {item.order < 0 ? (
              <div className="xl:w-[90%] flex flex-col gap-3 pb-10 xl:pb-0">
                <div className="text-4xl font-semibold ">
                  {item.heading}
                  <Highlight text={item.highlightText} />
                </div>
                <p className="text-[#838894] font-medium">
                    {item.description}
                </p>
                <div className="w-fit mt-2">
                    <CTAButon active={true} linkto={item.BtnLink}>
                        {item.BtnText}
                    </CTAButon>
                </div>
              </div>
            ) : (
              <div className="p-8 flex flex-col gap-8">
                <h1 className="text-[#f1f2ff] text-lg">{item.heading}</h1>
                <p className="font-medium text-[#838894]">
                    {item.description}
                </p>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
