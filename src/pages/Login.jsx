import React from "react";
import Template from "../components/core/Auth/Template";

export default function Login() {
  return (
    <Template
      title="Welcome Back"
      description1="Build skills for today, tomorrow, and beyond."
      description2="Education to future-proof your career."
      image="./login.webp"
      formType="login"
    />
  );
}
