import React, { useEffect, useState } from "react";
import OTPInput from "react-otp-input";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { BiArrowBack } from "react-icons/bi";
import { RxCountdownTimer } from "react-icons/rx";
import { sendOtp, signup } from "../services/operations/authAPI";

export default function VerifyEmail() {
  const loading = useSelector((state) => state.auth.loading);
  const signupData = useSelector((state) => state.auth.signupData);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [otp, setOtp] = useState("");

  const handleVerifyAndSignup = (e) => {
    e.preventDefault();
    const {
      accountType,
      firstName,
      lastName,
      email,
      password,
      confirmPassword,
    } = signupData;

    dispatch(
      signup(
        accountType,
        firstName,
        lastName,
        email,
        password,
        otp,
        confirmPassword,
        navigate
      )
    );
  };

  useEffect(() => {
    if (!signupData) {
        navigate("/signup");
    }
  }, []);
  return (
    <div className="min-h-[calc(100vh-3.5rem)] grid place-items-center">
      {loading ? (
        <div className="spinner"></div>
      ) : (
        <div className="max-w-[500px] p-4 lg:p-8">
          <h1 className="text-[#F1F2FF] font-semibold text-[1.875rem] leading-[2.375rem]">
            Verify Email
          </h1>
          <p className="text-[1.125rem] leading-[1.625rem] my-4 text-[#AFB2BF]">
            A verification code has been sent to you. Enter the code below
          </p>
          <form onSubmit={handleVerifyAndSignup}>
            <OTPInput
              value={otp}
              onChange={setOtp}
              numInputs={6}
              renderInput={(props) => (
                <input
                  {...props}
                  placeholder="-"
                  style={{
                    boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
                  }}
                  className="w-[48px] lg:w-[60px] border-0 bg-[#161D29] rounded-[0.5rem] text-[#f1f2ff] aspect-square text-center focus:border-0 focus:outline-2 focus:outline-[#FFD60A]"
                />
              )}
              containerStyle={{ justifyContent: "space-between", gap: "0 6px" }}
            />

            <button
              type="submit"
              className="w-full bg-[#FFD60A] py-[12px] px-[12px] rounded-[8px] mt-6 font-medium text-[#000814]"
            >
              Verify Email
            </button>
          </form>
          <div className="mt-6 flex items-center justify-between">
            <Link to="/signup">
              <p className="text-[#f1f2ff] flex items-center gap-x-2">
                <BiArrowBack /> Back to Signup
              </p>
            </Link>
            <button
              className="flex items-center text-[#47A5C5] gap-x-2"
              onClick={() => dispatch(sendOtp(signupData.email, navigate))}
            >
              <RxCountdownTimer />
              Resend it
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
