import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { useLocation, useNavigate } from "react-router-dom";
import { resetPassword } from "../services/operations/authAPI";

export default function UpdatePassword() {
  const loading = useSelector((state) => state.auth.loading);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [formData, setFormData] = useState({
    password: "",
    confirmPassword: "",
  });
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();

  const handleOnChange = (e) => {
    setFormData((prevData) => ({
      ...prevData,
      [e.target.name]: e.target.value,
    }));
  };

  const { password, confirmPassword } = formData;

  const handleOnSubmit = (e) => {
    e.preventDefault();
    const token = location.pathname.split("/").at(-1);
    dispatch(resetPassword(password, confirmPassword, token));
  };

  return (
    <div className="grid min-h-[calc(100vh-3.5rem)] place-items-center">
      {loading ? (
        <div className="spinner"></div>
      ) : (
        <div className="max-w-[500px] p-4 lg:p-8">
          <h1 className="text-[1.875rem] font-semibold leading-[2.375rem] text-[#f1f2ff]">
            Choose new password
          </h1>
          <p className="my-4 text-[1.125rem] leading-[1.625rem] text-[#AFB2BF]">
            Almost done. Enter your new password and youre all set.
          </p>
          <form onSubmit={handleOnSubmit}>
            <label className="relative">
              <p className="mb-1 text-[0.875rem] leading-[1.375rem] text-[#f1f2ff]">
                New Password <sup className="text-[#EF476F]">*</sup>
              </p>
              <input
                required
                type={showPassword ? "text" : "password"}
                name="password"
                value={password}
                onChange={handleOnChange}
                placeholder="Enter Password"
                style={{
                  boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
                }}
                className="w-full rounded-lg mt-2 p-3 bg-[#161D29] text-[#F1F2FF]"
              />
              <span
                onClick={() => setShowPassword((prev) => !prev)}
                className="absolute right-3 top-[65%] z-[10] cursor-pointer"
              >
                {showPassword ? (
                  <AiOutlineEyeInvisible fontSize={24} fill="#AFB2BF" />
                ) : (
                  <AiOutlineEye fontSize={24} fill="#AFB2BF" />
                )}
              </span>
            </label>
            <label className="relative mt-3 block">
              <p className="mb-1 text-[0.875rem] leading-[1.375rem] text-[#f1f2ff]">
                Confirm New Password <sup className="text-[#EF476F]">*</sup>
              </p>
              <input
                required
                type={showConfirmPassword ? "text" : "password"}
                name="confirmPassword"
                value={confirmPassword}
                onChange={handleOnChange}
                placeholder="Confirm Password"
                style={{
                  boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
                }}
                className="w-full rounded-lg mt-2 p-3 bg-[#161D29] text-[#F1F2FF]"
              />
              <span
                onClick={() => setShowConfirmPassword((prev) => !prev)}
                className="absolute right-3 top-[55%] z-[10] cursor-pointer"
              >
                {showConfirmPassword ? (
                  <AiOutlineEyeInvisible fontSize={24} fill="#AFB2BF" />
                ) : (
                  <AiOutlineEye fontSize={24} fill="#AFB2BF" />
                )}
              </span>
            </label>

            <button
              type="submit"
              className="mt-6 w-full rounded-[8px] bg-[#FFD60A] py-[12px] px-[12px] font-medium text-richblack-900"
            >
              Reset Password
            </button>
          </form>
        </div>
      )}
    </div>
  );
}
