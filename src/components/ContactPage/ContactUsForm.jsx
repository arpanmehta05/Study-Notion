import React, { useEffect, useState } from "react";
import { apiConnector } from "../../services/ApiConnector";
import { contactUs } from "../../services/apis";
import { useForm } from "react-hook-form";
import countrycode from "../../../public/countrycode.json";

export default function ContactUsForm() {
  const [loading, setloading] = useState(false);
  const {
    handleSubmit,
    register,
    reset,
    formState: { errors, isSubmitSuccessful },
  } = useForm();
  const submitContactForm = async (data) => {
    try {
      setloading(true);
      const response = await apiConnector(
        "POST",
        contactUs.CONTACT_US_API,
        data
      );
      setloading(false);
    } catch (err) {
      console.log(err);
      setloading(false);
    }
  };

  useEffect(() => {
    if (isSubmitSuccessful) {
      reset({
        email: "",
        firstName: "",
        lastName: "",
        message: "",
        phoneNo: "",
      });
    }
  }, [reset, isSubmitSuccessful]);

  return (
    <form
      className="flex flex-col gap-7"
      onSubmit={handleSubmit(submitContactForm)}
    >
      <div className="flex flex-col gap-5 lg:flex-row">
        <div className="flex flex-col gap-2 lg:w-[48%]">
          <label htmlFor="firstName" className="lable-style">
            First Name
          </label>
          <input
            type="text"
            name="firstName"
            id="firstName"
            placeholder="Enter first name"
            className="form-style"
            {...register("firstName", { required: true })}
          />
          {errors.firstName && (
            <span className="-mt-1 text-[12px] text-[#E7C009]">
              Please enter your name
            </span>
          )}
        </div>
        <div className="flex flex-col gap-2 lg:w-[48%]">
          <label htmlFor="lastName" className="lable-style">
            Last Name
          </label>
          <input
            type="text"
            name="lastName"
            id="lastName"
            placeholder="Enter last name"
            className="form-style"
            {...register("lastName")}
          />
        </div>
      </div>
      <div className="flex flex-col gap-2">
        <label htmlFor="email" className="lable-style">
          Email Address
        </label>
        <input
          type="email"
          name="email"
          id="email"
          placeholder="Enter your email address"
          className="form-style"
          {...register("email", { required: true })}
        />
        {errors.email && (
          <span className="-mt-1 text-[12px] text-[#E7C009]">
            Please enter your email
          </span>
        )}
      </div>
      <div className="flex flex-col gap-2">
        <label htmlFor="phoneNo" className="lable-style">
          Phone Number
        </label>
        <div className="flex gap-5">
          <div className="flex flex-col w-[81px] gap-2">
            <select
              type="text"
              name="countrycode"
              id="countrycode"
              className="form-style"
              {...register("countrycode", { required: true })}
            >
              {countrycode.map((ele, i) => {
                return (
                  <option key={i} value={ele.code}>
                    {ele.code} -{ele.country}
                  </option>
                );
              })}
            </select>
          </div>
          <div className="flex w-[calc(100%-90px)] flex-col gap-2">
            <input
              type="text"
              className="form-style"
              name="phoneNo"
              id="phoneNo"
              placeholder="12345 67890"
              {...register("phoneNo", {
                required: {
                  value: true,
                  message: "Please enter your Phone Number.",
                },
                maxLength: { value: 12, message: "Invalid Phone Number" },
                minLength: { value: 10, message: "Invalid Phone Number" },
              })}
            />
          </div>
        </div>
        {errors.phoneNo && (
          <span className="-mt-1 text-[12px] text-[#E7C009]">
            {errors.phoneNo.message}
          </span>
        )}
      </div>
      <div className="flex flex-col gap-2">
        <label htmlFor="message" className="lable-style">
          Message
        </label>
        <textarea
          name="message"
          id="message"
          cols="30"
          rows="7"
          placeholder="Enter your message here"
          className="form-style"
          {...register("message", { required: true })}
        />
      </div>
      <button
        disabled={loading}
        type="submit"
        className={`rounded-md bg-[#FFD60A] px-6 py-3 text-center text-[13px] font-bold text-black shadow-[2px_2px_0px_0px_rgba(255,255,255,0.18)] ${
          !loading &&
          "transition-all duration-200 hover:scale-95 hover:shadow-none"
        } disabled:bg-[#585D69] sm:text-[16px]`}
      >
        Send Message
      </button>
    </form>
  );
}
