import React from "react";
import UpdatePassword from "./UpdatePassword";
import ChangeProfiePicture from "./ChangeProfiePicture";
import EditProfile from "./EditProfile";
import DeleteAccount from "./DeleteAccount";

export default function index() {
  return (
    <>
      <h1 className="mb-14 text-3xl font-medium text-[#f1f2ff]">
        Edit Profile
      </h1>
      <ChangeProfiePicture />
      <EditProfile />
      <UpdatePassword />
      <DeleteAccount />
    </>
  );
}
