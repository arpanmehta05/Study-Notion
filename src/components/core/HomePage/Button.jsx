import React from "react";
import { Link } from "react-router-dom";

export default function Button(props) {
  const child = props.children;
  const active = props.active;
  const linkto = props.linkto;
  return (
    <div>
      <Link to={linkto}>
        <div
          className={`text-center text-[13px] px-6 py-3 rounded-md font-bold shadow-[2px_2px_0px_0px_rgba(255,255,255,0.18)] ${
            active ? "bg-[#FFD60A] text-black" : "bg-[#161D29]"
          } hover:shadow-none hover:scale-95 transition-all duration-200
          `}
        >
          {child}
        </div>
      </Link>
    </div>
  );
}
