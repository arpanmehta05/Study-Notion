import React from "react";
import Template from "../components/core/Auth/Template";

export default function Signup() {
  return (
    <Template
      title="Join the millions learning to code with StudyNotion for free"
      description1="Build skills for today, tomorrow, and beyond."
      description2="Education to future-proof your career."
      image = "./signup.webp"
      formType="signup"
    />
  );
}
