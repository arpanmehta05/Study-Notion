import React, { useState } from "react";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { login } from "../../../services/operations/authAPI";

export default function LoginForm() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleonSubmit = (e) => {
    e.preventDefault();
    dispatch(login(email,password,navigate));
  };
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);

  const { email, password } = formData;

  const handleOnChange = (e) => {
    setFormData((prevData) => ({
      ...prevData,
      [e.target.name]: e.target.value,
    }));
  };
  return (
    <div>
      <form
        onSubmit={handleonSubmit}
        className="mt-6 flex w-full flex-col gap-y-4"
      >
        <label className="w-full">
          <p className="text-sm leading-5 font-medium text-[#F1F2FF]">
            Email Address <sup className="text-[#EF476F]">*</sup>
          </p>
          <input
            type="text"
            required
            name="email"
            placeholder="Enter email address"
            value={email}
            onChange={handleOnChange}
            style={{
              boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
            }}
            className="w-full rounded-lg mt-2 p-3 bg-[#161D29] text-[#F1F2FF]"
          />
        </label>
        <label className="relative">
          <p className="text-sm leading-5 font-medium text-[#F1F2FF]">
            Password <sup className="text-[#EF476F]">*</sup>
          </p>
          <input
            type={showPassword ? "text" : "password"}
            required
            name="password"
            placeholder="Enter password"
            value={password}
            onChange={handleOnChange}
            style={{
              boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
            }}
            className="w-full rounded-lg mt-2 p-3 bg-[#161D29] text-[#F1F2FF]"
          />
          <span
            className="absolute right-3 top-[38px] z-10 cursor-pointer"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? (
              <AiOutlineEyeInvisible fontSize={24} fill="#AFB2BF" />
            ) : (
              <AiOutlineEye fontSize={24} fill="#AFB2BF" />
            )}
          </span>
          <Link to="/forgot-password">
            <p className="mt-1 ml-auto max-w-max text-xs text-[#47A5C5]">
              Forgot Password
            </p>
          </Link>
        </label>
        <button type="submit" className="mt-6 rounded-[8px] bg-[#FFD60A] py-2 px-3 font-medium text-[#000814]">
            Sign In
        </button>
      </form>
    </div>
  );
}
