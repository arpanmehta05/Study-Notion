import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Tab from "../../common/Tab";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { ACCOUNT_TYPE } from "../../../utils/constants";
import { setSignupData } from "../../../slice/authSlice";
import { useDispatch } from "react-redux";
import toast from "react-hot-toast";
import { sendOtp } from "../../../services/operations/authAPI";

export default function SignupForm() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const { firstName, lastName, email, password, confirmPassword } = formData;
  const [accountType, setAccountType] = useState(ACCOUNT_TYPE.STUDENT);

  const handleOnChange = (e) => {
    setFormData((prevData) => ({
      ...prevData,
      [e.target.name]: e.target.value,
    }));
  };

  const handleOnSubmit = (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      toast.error("Passwords Do Not Match");
      return;
    }
    const signupData = {
      ...formData,
      accountType,
    };

    dispatch(setSignupData(signupData));
    dispatch(sendOtp(formData.email, navigate));

    setFormData({
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      confirmPassword: "",
    });
    setAccountType(ACCOUNT_TYPE.STUDENT);
  };

  const tabData = [
    { id: 1, tabName: "Student", tabType: ACCOUNT_TYPE.STUDENT },
    { id: 2, tabName: "Instructor", tabType: ACCOUNT_TYPE.INSTRUCTOR },
  ];

  return (
    <div>
      <Tab tabData={tabData} feild={accountType} setFeild={setAccountType} />
      <form onSubmit={handleOnSubmit} className="flex w-full flex-col gap-y-4">
        <div className="flex gap-x-4">
          <label>
            <p className="text-sm leading-5 font-medium text-[#F1F2FF]">
              First Name <sup className="text-[#EF476F]">*</sup>
            </p>
            <input
              type="text"
              required
              name="firstName"
              value={firstName}
              onChange={handleOnChange}
              placeholder="Enter first name"
              style={{
                boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
              }}
              className="w-full rounded-lg mt-2 p-3 bg-[#161D29] text-[#F1F2FF]"
            />
          </label>
          <label>
            <p className="text-sm leading-5 font-medium text-[#F1F2FF]">
              Last Name <sup className="text-[#EF476F]">*</sup>
            </p>
            <input
              type="text"
              required
              name="lastName"
              value={lastName}
              onChange={handleOnChange}
              placeholder="Enter last name"
              style={{
                boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
              }}
              className="w-full rounded-lg mt-2 p-3 bg-[#161D29] text-[#F1F2FF]"
            />
          </label>
        </div>
        <label className="w-full">
          <p className="text-sm leading-5 font-medium text-[#F1F2FF]">
            Email Address<sup className="text-[#EF476F]">*</sup>
          </p>
          <input
            type="text"
            required
            name="email"
            value={email}
            onChange={handleOnChange}
            placeholder="Enter email address"
            style={{
              boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
            }}
            className="w-full rounded-lg mt-2 p-3 bg-[#161D29] text-[#F1F2FF]"
          />
        </label>
        <div className="flex gap-x-4">
          <label className="relative">
            <p className="text-sm leading-5 font-medium text-[#F1F2FF]">
              Create password<sup className="text-[#EF476F]">*</sup>
            </p>
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              value={password}
              required
              onChange={handleOnChange}
              placeholder="Enter password"
              style={{
                boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
              }}
              className="w-full rounded-lg mt-2 p-3 bg-[#161D29] text-[#F1F2FF]"
            />
            <span
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-[38px] z-[10] cursor-pointer"
            >
              {showPassword ? (
                <AiOutlineEyeInvisible fontSize={24} fill="#AFB2BF" />
              ) : (
                <AiOutlineEye fontSize={24} fill="#AFB2BF" />
              )}
            </span>
          </label>
          <label className="relative">
            <p className="text-sm leading-5 font-medium text-[#F1F2FF]">
              Confirm password<sup className="text-[#EF476F]">*</sup>
            </p>
            <input
              type={showConfirmPassword ? "text" : "password"}
              required
              name="confirmPassword"
              value={confirmPassword}
              onChange={handleOnChange}
              style={{
                boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
              }}
              className="w-full rounded-lg mt-2 p-3 bg-[#161D29] text-[#F1F2FF]"
              placeholder="Conirm passowrd"
            />
            <span
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              className="absolute right-3 top-[38px] z-[10] cursor-pointer"
            >
              {showConfirmPassword ? (
                <AiOutlineEyeInvisible fontSize={24} fill="#AFB2BF" />
              ) : (
                <AiOutlineEye fontSize={24} fill="#AFB2BF" />
              )}
            </span>
          </label>
        </div>
        <button
          type="submit"
          className="mt-6 rounded-[8px] bg-[#FFD60A] py-2 px-3 font-medium text-[#000814]"
        >
          Create Account
        </button>
      </form>
    </div>
  );
}
