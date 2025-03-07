import React from "react";
import { useSelector } from "react-redux";
import RenderTotalAmount from "./RenderTotalAmount";
import RenderCartCourses from "./RenderCartCourses";

export default function index() {
  const { total, totalitem } = useSelector((state) => state.cart);

  return (
    <>
      <h1 className="mb-14 text-3xl font-medium text-[#f1f2ff]">Cart</h1>
      <p className="border-b border-b-[#6E727F] pb-2 font-semibold text-[#6E727F]">
        {totalitem} Courses in Cart
      </p>
      {total > 0 ? (
        <div className="mt-8 flex flex-col-reverse items-start gap-x-10 gap-y-6 lg:flex-row">
          <RenderCartCourses />
          <RenderTotalAmount />
        </div>
      ) : (
        <p className="mt-14 text-center text-3xl text-[#AFB2BF]">
          Your cart is empty
        </p>
      )}
    </>
  );
}
