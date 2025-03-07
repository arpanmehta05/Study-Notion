import React from "react";
import ReviewSlider from "../components/common/ReviewSlider";
import Footer from "../components/common/Footer";
import ContactDetails from "../components/ContactPage/ContactDetails";
import ContactForm from "../components/ContactPage/ContactForm";

export default function Contact() {
  return (
    <div>
      <div className="mx-auto mt-20 flex w-[80%] max-w-maxContent flex-col justify-between gap-10 text-white lg:flex-row">
        <div className="lg:w-[40%]">
            <ContactDetails />
        </div>
        <div className="lg:w-[60%]">
          <ContactForm />
        </div>
      </div>
      <div className="relative mx-auto my-20 flex w-11/12 max-w-maxContent flex-col items-center justify-between gap-8 bg-[#000814] text-white">
        <h1 className="text-center text-[36px] font-semibold mt-8">
            Reviews from other learners
        </h1>
        <ReviewSlider />
      </div>
      <Footer />
    </div>
  );
}
