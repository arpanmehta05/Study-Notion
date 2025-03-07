import React from "react";

const Stats = [
  { count: "5K", label: "Active Students" },
  { count: "10+", label: "Mentors" },
  { count: "200+", label: "Courses" },
  { count: "50+", label: "Awards" },
];

export default function StatsComponent() {
  return (
    <div className="bg-[#2C333F]">
      <div className="flex flex-col gap-10 justify-between w-[80%] max-w-maxContent text-white mx-auto ">
        <div className="grid grid-cols-2 md:grid-cols-4 text-center">
          {Stats.map((stat, index) => {
            return (
              <div className="flex flex-col py-10" key={index}>
                <h1 className="text-[30px] font-bold text-[#f1f2ff]">
                  {stat.count}
                </h1>
                <h2 className="font-semibold text-[16px] text-[#585D69]">
                  {stat.label}
                </h2>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
