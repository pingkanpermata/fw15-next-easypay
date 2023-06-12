import React, {useState} from "react";
import { FiLock, FiEye, FiEyeOff } from "react-icons/fi";
import FormLogin from "../components/FormLogin";

const ResetPassword = () => {
  const [contentPassword, setContentPassword] = useState(0);
  const [contentConfirmPassword, setContentConfirmPassword] = useState(0);
  const [isPassword, setIsPassword] = useState(true);
  const [isConfirmPassword, setIsConfirmPassword] = useState(true);

  return (
    <div className="flex h-screen">
      <FormLogin />

      <div className="flex flex-col flex-[40%] px-10 pt-10 lg:pt-16 gap-5  bg-[#f5f5f5]">
      <div className="lg:hidden text-3xl font-bold text-[#10A19D]">e-Pay</div>
        <div className="text-2xl font-bold leading-relaxed max-w-[400px]">Did You Forgot Your Password? Don’t Worry, You Can Reset Your Password In a Minutes.</div>
        <div className="leading-relaxed max-w-[430px]">Now you can create a new password for your FazzPay account. Type your password twh ice so we can confirm your new passsword.</div>
        <form className="flex flex-col w-full lg:w-[430px] gap-14 mt-5 pb-5">
          <div className={`flex gap-3 items-center border-b-2 ${contentPassword ? "border-[#10A19D]" : "border-[#A9A9A9]"}`}>
            <FiLock className={`text-xl ${contentPassword ? "text-[#10A19D]" : null}`} />
            <inputb
              onChange={(e) => setContentPassword(e.target.value.length)}
              className="bg-[#f5f5f5] w-full py-2 focus:outline-none"
              type={isPassword ? "password" : "text"}
              name="password"
              id="password"
              placeholder="Create new password"
            />
            {isPassword ? <FiEyeOff onClick={() => setIsPassword(false)} className="text-xl" /> : <FiEye onClick={() => setIsPassword(true)} className="text-xl" />}
          </div>
          
          <div className={`flex gap-3 items-center border-b-2 ${contentConfirmPassword ? "border-[#10A19D]" : "border-[#A9A9A9]"}`}>
            <FiLock className={`text-xl ${contentConfirmPassword ? "text-[#10A19D]" : null}`} />
            <input
              onChange={(e) => setContentConfirmPassword(e.target.value.length)}
              className="bg-[#f5f5f5] w-full py-2 focus:outline-none"
              type={isConfirmPassword ? "password" : "text"}
              name="password"
              id="password"
              placeholder="Create new password"
            />
            {isConfirmPassword ? <FiEyeOff onClick={() => setIsConfirmPassword(false)} className="text-xl" /> : <FiEye onClick={() => setIsConfirmPassword(true)} className="text-xl" />}
          </div>

          <div>
            <button className={`w-full rounded-xl py-3 ${contentPassword && contentConfirmPassword? "bg-[#10A19D] text-white" : "bg-[#DADADA]"}`}>Login</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ResetPassword;
