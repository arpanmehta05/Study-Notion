import React, { useState } from "react";
import { HomePageExplore } from "../../../../public/homepage-explore";
import Highlight from "./Highlight";
import CourseCardHome from "./CourseCardHome";

const tabNames = [
  "Free",
  "New to coding",
  "Most popular",
  "Skill Paths",
  "Career Paths",
];

export default function ExploreMore() {
  const [currentTab, setCurrentTab] = useState(tabNames[0]);
  const [courses, setCourses] = useState(HomePageExplore[0].courses);
  const [currentCard, setcurrentCard] = useState(
    HomePageExplore[0].courses[0].heading
  );

  const setMyCards = (value) => {
    setCurrentTab(value);
    const result = HomePageExplore.filter((courses) => courses.tag === value);
    setCourses(result[0].courses);
    setcurrentCard(result[0].courses[0].heading);
  };
  return (
    <div>
      <div className="text-[36px] font-semibold text-center">
        Unlock the <Highlight text={"The power of Code"} />
      </div>
      <p className="text-center text-[#838894] text-[16px] mt-3">
        Learn to build anything you can imagine
      </p>
      <div className="flex flex-row rounded-full m-5 border-[#AFB2BF] bg-[#161D29] p-2">
        {tabNames.map((tab, index) => {
          return (
            <div
              className={`txet-[16px] flex flex-row items-center gap-2 ${
                currentTab === tab
                  ? "bg-[#000814] text-[#F1F2FF] font-medium"
                  : "text-[#999DAA]"
              } rounded-full transition-all duration-200 cursor-pointer hover:bg-[#000814] hover:text-[#f1f2ff] px-7 py-2`}
              key={index}
              onClick={() => setMyCards(tab)}
            >
              {tab}
            </div>
          );
        })}
      </div>
      <div className="h-[150px]"></div>
      <div className="lg:absolute gap-10 justify-center lg:gap-0 flex lg:justify-between flex-wrap w-full lg:bottom-[0] lg:left-[50%] lg:translate-x-[-50%] lg:translate-y-[50%] text-black lg:mb-0 mb-7 lg:px-0 px-3">
        {courses.map((course, index) => {
          return (
            <CourseCardHome
              key={index}
              cardData={course}
              currentCard={currentCard}
              setcurrentCard={setcurrentCard}
            />
          );
        })}
      </div>
    </div>
  );
}
