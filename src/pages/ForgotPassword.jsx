import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { BiArrowBack } from "react-icons/bi";
import { getPasswordResetToken } from "../services/operations/authAPI";
import { Link } from "react-router-dom";

export default function ForgotPassword() {
  const loading = useSelector((state) => state.auth.loading);
  const [emailSent, setEmailSent] = useState(false);
  const [email, setEmail] = useState("");
  const dispatch = useDispatch();

  const handleOnSubmit = (e) => {
    e.preventDefault();
    dispatch(getPasswordResetToken(email, setEmailSent));
  };

  return (
    <div className="grid min-h-[calc(100vh-3.5rem)] place-items-center">
      {loading ? (
        <div className="spinner"></div>
      ) : (
        <div className="max-w-[500px] p-4 lg:p-8">
          <h1 className="text-[1.875rem] font-semibold leading-[2.375rem] text-[#f1f2ff]">
            {!emailSent ? "Reset Your Password" : "Check Your Email"}
          </h1>
          <p className="my-4 text-[1.125rem] leading-[1.625rem] text-[#AFB2BF]">
            {!emailSent
              ? "Have no fear. We'll email you instructions to reset your password. If you dont have access to your email we can try account recovery"
              : `We have sent the reset email to ${email}`}
          </p>
          <form onSubmit={handleOnSubmit}>
            {!emailSent && (
              <label>
                <p className="text-sm leading-5 font-medium text-[#F1F2FF]">
                  Email Address <sup className="text-[#EF476F]">*</sup>
                </p>
                <input
                  type="email"
                  required
                  name="email"
                  style={{
                    boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
                  }}
                  className="w-full rounded-lg mt-2 p-3 bg-[#161D29] text-[#F1F2FF]"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email address"
                />
              </label>
            )}
            <button type="submit" className="mt-6 w-full rounded-[8px] bg-[#FFD60A] py-[12px] px-[12px] font-medium text-[#000814]">
              {!emailSent ? "Reset Password" : "Resend Email"}
            </button>
          </form>
          <div className="mt-6 flex items-center justify-between">
            <Link to="/login">
              <p className="flex items-center gap-x-2 text-[#F1F2FF]">
                <BiArrowBack />
                Back to login
              </p>
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
