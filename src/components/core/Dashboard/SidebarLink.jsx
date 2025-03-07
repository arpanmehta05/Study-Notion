import React from "react";
import * as Icons from "react-icons/vsc";
import { useDispatch } from "react-redux";
import { matchPath, NavLink, useLocation } from "react-router-dom";
import { resetCourse } from "../../../slice/courseSlice";

export default function SidebarLink({ link, iconName }) {
  const Icon = Icons[iconName];
  const location = useLocation();
  const dispatch = useDispatch();
  const matchRoute = (route) => {
    return matchPath({ path: route }, location.pathname);
  };

  return (
    <NavLink
      to={link.path}
      key={link.id}
      className={`relative px-8 py-2 text-sm font-medium ${
        matchRoute(link.path)
          ? "bg-[#3D2A01] text-[#FFD60A]"
          : "bg-opacity-0 text-[#838894]"
      } transition-all duration-200`}
      onClick={() => dispatch(resetCourse())}
    >
      <span className={`absolute left-0 top-0 h-full w-[0.15rem] bg-[#ffd60a] ${
          matchRoute(link.path) ? "opacity-100" : "opacity-0"
        }`}>
      </span>
      <div className="flex items-center gap-x-2">
        <Icon className="text-lg" />
        <span>{link.name}</span>
      </div>
    </NavLink>
  );
}
