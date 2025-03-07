import React, { useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { AiOutlineCaretDown } from "react-icons/ai";
import { VscDashboard, VscSignOut } from "react-icons/vsc";
import { logout } from "../../../services/operations/authAPI";
import useOnClickOutside from "../../../hooks/useOnClickOutside";

export default function ProfileDropdown() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.profile.user);
  const [Open, setOpen] = useState(false);
  const navigate = useNavigate();
  const ref = useRef();

  useOnClickOutside(ref, () => setOpen(false));

  if (!user) return null;
  return (
    <button onClick={() => setOpen(true)} className="relative">
      <div className="flex items-center gap-x-1">
        <img
          src={user?.image}
          alt={user?.firstName}
          className="aspect-square w-[30px] rounded-full object-cover"
        />
        <AiOutlineCaretDown className="text-sm text-[#AFB2BF]" />
      </div>
      {Open && (
        <div
          className="absolute top-[118%] right-0 z-[1000] divide-y-[1px] divide-[#2C333F] overflow-hidden rounded-md border-[1px] border-[#2C333F] bg-[#161D29]"
          ref={ref}
        >
          <Link
            to="/dashboard/my-profile"
            className="flex w-full items-center gap-x-1 py-[10px] px-[12px] text-sm text-[#AFB2BF] hover:bg-[#2C333F] hover:text-[#DBDDEA]"
            onClick={() => setOpen(false)}
          >
            <VscDashboard className="text-lg" />
            Dashboard
          </Link>
          <div
            onClick={() => {
              dispatch(logout(navigate));
              setOpen(false);
            }}
            className="flex w-full items-center gap-x-1 py-[10px] px-[12px] text-sm text-[#AFB2BF] hover:bg-[#2C333F] hover:text-[#DBDDEA]"
          >
            <VscSignOut className="text-lg" />
            Logout
          </div>
        </div>
      )}
    </button>
  );
}
