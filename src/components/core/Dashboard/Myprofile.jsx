import React from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import IconBtn from "../../common/IconBtn";
import { RiEditBoxLine } from "react-icons/ri";
import { formattedDate } from "../../../utils/dateFormatter";

export default function Myprofile() {
  const { user } = useSelector((state) => state.profile);
  const navigate = useNavigate();
  return (
    <div>
      <h1 className="mb-14 text-3xl font-medium text-[#f1f2ff]">My Profile</h1>
      <div className="flex items-center justify-between rounded-md border-[1px] border-[#2C333F] bg-[#161D29] p-8 px-12">
        <div>
          <img
            src={user?.image}
            alt={`profile-${user?.firstName}`}
            className="aspect-square w-[78px] rounded-full object-cover"
          />
          <div className="space-y-1 mt-2">
            <p className="text-lg font-semibold text-[#f1f2ff]">
              {user?.firstName + " " + user?.lastName}
            </p>
            <p className="text-sm text-[#838894]">{user?.email}</p>
          </div>
        </div>
        <IconBtn
          text={"Edit"}
          onclick={() => {
            navigate("/dashboard/Settings");
          }}
        >
          <RiEditBoxLine />
        </IconBtn>
      </div>
      <div className="my-10 flex flex-col gap-y-10 rounded-md border-[1px] border-[#2C333F] bg-[#161D29] p-8 px-12">
        <div className="flex w-full items-center justify-between">
          <p className="text-lg font-semibold text-[#f1f2ff]">About</p>
          <IconBtn
            text={"Edit"}
            onclick={() => {
              navigate("/dashboard/Settings");
            }}
          >
            <RiEditBoxLine />
          </IconBtn>
        </div>
        <p
          className={`${
            user?.additionalDetail?.about ? "text-[#f1f2ff]" : "text-[#6E727F]"
          } text-sm font-medium`}
        >
          {user?.additionalDetail?.about ?? "Write something about yourself"}
        </p>
      </div>
      <div className="my-10 flex flex-col gap-y-10 rounded-md border-[1px] border-[#2C333F] bg-[#161D29] p-8 px-12">
        <div className="flex w-full items-center justify-between">
          <p className="text-lg font-semibold text-[#f1f2ff]">
            Personal Details
          </p>
          <IconBtn
            text={"Edit"}
            onclick={() => {
              navigate("/dashboard/Settings");
            }}
          >
            <RiEditBoxLine />
          </IconBtn>
        </div>
        <div className="flex max-w-[500px] justify-between">
          <div className="flex flex-col gap-y-5">
            <div>
              <p className="mb-2 text-sm text-[#424854]">First Name</p>
              <p className="text-sm font-medium text-[#f1f2ff]">
                {user?.firstName}
              </p>
            </div>
            <div>
              <p className="mb-2 text-sm text-[#424854]">Email</p>
              <p className="text-sm font-medium text-[#f1f2ff]">
                {user?.email}
              </p>
            </div>
            <div>
              <p className="mb-2 text-sm text-[#424854]">Gender</p>
              <p className="text-sm font-medium text-[#f1f2ff]">
                {user?.additionalDetail?.gender ?? "Add Gender"}
              </p>
            </div>
          </div>
          <div className="flex flex-col gap-y-5">
            <div>
              <p className="mb-2 text-sm text-[#424854]">Last Name</p>
              <p className="text-sm font-medium text-[#f1f2ff]">
                {user?.lastName}
              </p>
            </div>
            <div>
              <p className="mb-2 text-sm text-[#424854]">Phone</p>
              <p className="text-sm font-medium text-[#f1f2ff]">
                {user?.additionalDetail?.contactNumber ?? "Add Phone"}
              </p>
            </div>
            <div>
              <p className="mb-2 text-sm text-[#424854]">Date of Birth</p>
              <p className="text-sm font-medium text-[#f1f2ff]">
                {formattedDate(user?.additionalDetail?.dateOfBirth) ??
                  "Add Date of Birth"}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
