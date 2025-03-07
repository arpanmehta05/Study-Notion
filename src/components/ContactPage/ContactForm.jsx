import React from "react";
import ContactUsForm from "./ContactUsForm";

export default function ContactForm() {
  return (
    <div className="border border-[#424854] text-[#838894] rounded-xl p-7 lg:p-14 flex gap-3 flex-col">
      <h1 className="text-[36px] leading-10 font-semibold text-[#f1f2ff]">
        Got a Idea? We&apos;ve got the skills. Let&apos;s team up
      </h1>
      <p className="text-[18px] text-[#838894]">
      Tell us more about yourself and what you&apos;re got in mind.
      </p>
      <div>
        <ContactUsForm />
      </div>
    </div>
  );
}
