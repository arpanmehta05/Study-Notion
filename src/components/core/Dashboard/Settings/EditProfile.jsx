import React from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { updateProfile } from "../../../../services/operations/SettingsAPI";
import IconBtn from "../../../common/IconBtn";

export default function EditProfile() {
  const genders = [
    "Male",
    "Female",
    "Non-Binary",
    "Prefer not to say",
    "Other",
  ];
  const { token } = useSelector((state) => state.auth);
  const { user } = useSelector((state) => state.profile);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const submitProfile = async (data) => {
    try {
      dispatch(updateProfile(token, data));
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit(submitProfile)}>
        <div className="my-10 flex flex-col gap-y-6 rounded-md border-[1px] border-[#2c333f] bg-[#161D29] p-8 px-12">
          <h2 className="text-lg font-semibold text-[#f1f2ff]">
            Profile Information
          </h2>
          <div className="flex flex-col gap-5 lg:flex-row">
            <div className="flex flex-col gap-2 lg:w-[48%]">
              <label className="lable-style" htmlFor="firstName">
                First Name
              </label>
              <input
                type="text"
                name="firstName"
                id="firstName"
                placeholder="Enter first name"
                className="form-style"
                {...register("firstName", { required: true })}
                defaultValue={user?.firstName}
              />
              {errors.firstName && (
                <span className="-mt-1 text-[12px] text-[#E7C009]">
                  Please enter your first name
                </span>
              )}
            </div>
            <div className="flex flex-col gap-2 lg:w-[48%]">
              <label className="lable-style" htmlFor="lastName">
                Last Name
              </label>
              <input
                type="text"
                name="lastName"
                id="lastName"
                placeholder="Enter your last name"
                className="form-style"
                {...register("lastName", { required: true })}
                defaultValue={user?.lastName}
              />
              {errors.lastName && (
                <span className="-mt-1 text-[12px] text-[#E7C009]">
                  Please enter your last name
                </span>
              )}
            </div>
          </div>
          <div className="flex flex-col gap-5 lg:flex-row">
            <div className="flex flex-col gap-2 lg:w-[48%]">
              <label className="lable-style" htmlFor="dateOfBirth">
                Date of Birth
              </label>
              <input
                type="date"
                name="dateOfBirth"
                id="dateOfBirth"
                className="form-style"
                {...register("dateOfBirth", {
                  required: {
                    value: true,
                    message: "Please enter your Date of Birth.",
                  },
                  max: {
                    value: new Date().toISOString().split("T")[0],
                    message: "Date of Birth cannot be in the future.",
                  },
                })}
                defaultValue={user?.additionalDetail?.dateOfBirth}
              />
              {errors.dateOfBirth && (
                <span className="-mt-1 text-[12px] text-[#E7C009]">
                  {errors.dateOfBirth.message}
                </span>
              )}
            </div>
            <div className="flex flex-col gap-2 lg:w-[48%]">
              <label htmlFor="gender" className="lable-style">
                Gender
              </label>
              <select
                className="form-style"
                type="text"
                name="gender"
                id="gender"
                {...register("gender", { required: true })}
                defaultValue={user.additionalDetail?.gender}
              >
                {genders.map((ele, i) => {
                  return (
                    <option key={i} value={ele}>
                      {ele}
                    </option>
                  );
                })}
              </select>
              {errors.gender && (
                <span className="-mt-1 text-[12px] text-[#E7C009]">
                  Please Select Your Option
                </span>
              )}
            </div>
          </div>
          <div className="flex flex-col gap-5 lg:flex-row">
            <div className="flex flex-col gap-2 lg:w-[48%]">
              <label htmlFor="contactNumber" className="lable-style">
                Contact Number
              </label>
              <input
                type="tel"
                name="contactNumber"
                id="contactNumber"
                placeholder="Enter Contact Number"
                className="form-style"
                {...register("contactNumber", {
                  required: {
                    value: true,
                    message: "Please enter your contact number",
                  },
                  maxLength: {
                    value: 12,
                    message: "Invalid contact number",
                  },
                  minLength: {
                    value: 10,
                    message: "Invalid contact number",
                  },
                })}
                defaultValue={user?.additionalDetail?.contactNumber}
              />
              {errors.contactNumber && (
                <span className="-mt-1 text-[12px] text-[#E7C009]">
                  {errors.contactNumber.message}
                </span>
              )}
            </div>
            <div className="flex flex-col gap-2 lg:w-[48%]">
              <label className="lable-style" htmlFor="about">
                About
              </label>
              <input
                type="text"
                name="about"
                id="about"
                placeholder="Enter Bio Details"
                className="form-style"
                {...register("about", { required: true })}
                defaultValue={user?.additionalDetail?.about}
              />
              {errors.about && (
                <span className="-mt-1 text-[12px] text-[#E7C009]">
                  Please enter your bio
                </span>
              )}
            </div>
          </div>
        </div>
        <div className="flex justify-end gap-2">
          <button
            onClick={() => navigate("/dashboard/my-profile")}
            className="cursor-pointer rounded-md bg-[#2C333F] py-2 px-5 font-semibold text-[#C5C7D4]"
          >
            Cancel
          </button>
          <IconBtn text="save" type="submit" />
        </div>
      </form>
    </>
  );
}
