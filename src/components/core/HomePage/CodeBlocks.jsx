import React from "react";
import CTAButton from "./Button";
import { FaArrowRight } from "react-icons/fa";
import Highlight from "./Highlight";
import { TypeAnimation } from "react-type-animation";

export default function CodeBlocks(props) {
  const position = props.position;
  const heading = props.heading;
  const subheading = props.subheading;
  const ctabtn1 = props.ctabtn1;
  const ctabtn2 = props.ctabtn2;
  const codeColor = props.codeColor;
  const codeblock = props.codeblock;
  const backgroundGradient = props.backgroundGradient;
  return (
    <div className={`flex ${position} my-20 px-15 justify-between flex-col gap-10`}>
      <div className="w-[50%] flex flex-col gap-8">
        {heading}
        <div className="w-[85%] text-[#838894] font-bold">{subheading}</div>
        <div className="flex gap-7 mt-7">
          <CTAButton active={ctabtn1.active} linkto={ctabtn1.link}>
            <div className="flex items-center gap-2">
              {ctabtn1.btnText}
              <FaArrowRight />
            </div>
          </CTAButton>
          <CTAButton active={ctabtn2.active} linkto={ctabtn2.link}>
            {ctabtn2.btnText}
          </CTAButton>
        </div>
      </div>

      <div className="h-fit code-border flex flex-row py-3 text-[10px] sm:text-sm leading-[18px] sm:leading-6 relative w-[100%] lg:w-[470px]">
        {backgroundGradient}
        <div className="text-center w-[10%] flex flex-col text-[#6E727F] font-inter font-bold">
          <p>1</p>
          <p>2</p>
          <p>3</p>
          <p>4</p>
          <p>5</p>
          <p>6</p>
          <p>7</p>
          <p>8</p>
          <p>9</p>
          <p>10</p>
          <p>11</p>
          <p>12</p>
        </div>
        <div
          className={`w-[90%] flex flex-col gap-2 font-bold font-mono ${codeColor} pr-2`}
        >
          <pre>
            <TypeAnimation
              sequence={[codeblock, 1000, ""]}
              repeat={Infinity}
              cursor={true}
              omitDeletionAnimation={true}
            />
          </pre>
        </div>
      </div>
    </div>
  );
}
