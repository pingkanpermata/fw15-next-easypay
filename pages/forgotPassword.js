import React, { useState } from "react";
import { AiOutlineMail } from "react-icons/ai";
import FormLogin from "../components/FormLogin";

const ForgotPassword = () => {
  const [contentEmail, setContentEmail] = useState(0);

  return (
    <div className="flex h-screen">
      <FormLogin />

      <div className="flex flex-col flex-[40%] px-10 pt-16 gap-5  bg-[#f5f5f5]">
      <div className="lg:hidden text-3xl font-bold text-[#10A19D]">Trust-Pay</div>

        <div className="text-2xl font-bold leading-relaxed max-w-[400px] text-stone-800">Did You Forgot Your Password? Don’t Worry, You Can Reset Your Password In a Minutes.</div>
        <div className="leading-relaxed max-w-[430px] text-stone-800">To reset your password, you must type your e-mail and we will send a link to your email and you will be directed to the reset password screens.</div>
        <form className="flex flex-col w-full lg:w-[430px] gap-14 mt-5">
          <div className={`flex gap-3 items-center border-b-2 ${contentEmail ? "border-[#2C74B3]" : "border-[#2C74B3]"}`}>
            <AiOutlineMail className={`text-xl ${contentEmail ? "text-[#2C74B3]" : null}`} />
            <input onChange={(e) => setContentEmail(e.target.value.length)} className="bg-[#f5f5f5] w-full py-2 focus:outline-none" type="text" name="email" id="email" placeholder="Enter your e-mail" />
          </div>

          <div>
            <button className={`w-full rounded-xl py-3 ${contentEmail ? "bg-[#2C74B3] text-white" : "bg-[#DADADA]"}`}>Send</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ForgotPassword;
