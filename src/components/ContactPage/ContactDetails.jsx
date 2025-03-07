import React from "react";
import { HiChatBubbleLeftRight } from "react-icons/hi2";
import { BiWorld } from "react-icons/bi";
import { IoCall } from "react-icons/io5";

const contactDetails = [
  {
    icon: <HiChatBubbleLeftRight size={25} />,
    heading: "Chat on us",
    description: "Our friendly team is here to help.",
    details: "info@studynotion.com",
  },
  {
    icon: <BiWorld size={25} />,
    heading: "Visit us",
    description: "Come and say hello at our office HQ.",
    details:
      "Akshya Nagar 1st Block 1st Cross, Rammurthy nagar, Bangalore-560016",
  },
  {
    icon: <IoCall size={25} />,
    heading: "Call us",
    description: "Mon - Fri From 8am to 5pm",
    details: "+123 456 7869",
  },
];

export default function ContactDetails() {
  return (
    <div className="flex flex-col gap-6 rounded-xl bg-[#161D29] p-4 lg:p-6">
      {contactDetails.map((ele, i) => {
        return (
          <div
            key={i}
            className="flex flex-col gap-[2px] p-3 text-sm text-[#999DAA]"
          >
            <div className="flex flex-row items-center gap-3">
              {ele.icon}
              <h1 className="text-lg font-semibold text-[#f1f2ff]">
                {ele.heading}
              </h1>
            </div>
            <p className="font-medium">{ele.description}</p>
            <p className="font-semibold">{ele.details}</p>
          </div>
        );
      })}
    </div>
  );
}
