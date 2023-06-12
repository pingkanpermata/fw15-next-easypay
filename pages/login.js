import React, { useState } from "react";
import Link from "next/link";
import { AiOutlineMail } from "react-icons/ai";
import { FiLock, FiEye, FiEyeOff } from "react-icons/fi";
import FormLogin from "../components/FormLogin";
import {useDispatch} from 'react-redux'
import { useRouter } from "next/router";
import { loginAction } from "../redux/actions/auth";

const Login = () => {
  const dispatch = useDispatch()
  const router = useRouter()
  const [isPassword, setIsPassword] = useState(true);
  const [contentEmail, setContentEmail] = useState(0);
  const [contentPassword, setContentPassword] = useState(0);
  const [errorMessage, setErrorMessage] = useState("");

  const login = async (e) => {
    e.preventDefault()
    const email = e.target.email.value
    const password = e.target.password.value

    const cb = () => {
      router.push('/home')
    }

    try {
      const result = await dispatch(loginAction({email, password, cb}))
      if(result.payload.startsWith('Wrong')){
        setErrorMessage(result.payload)
      }
    } catch(err){
    console.log(err)
  }
}

  return (
    <div className="flex h-screen">
      <FormLogin />

      <div className="flex flex-col flex-[100%] lg:flex-[40%] px-10 justify-center gap-5  bg-[#f5f5f5]">
        <div className="lg:hidden text-3xl font-bold text-[#10A19D]">e-Pay</div>

        <div className="text-2xl font-bold leading-relaxed max-w-[400px]">Start Accessing Banking Needs With All Devices and All Platforms With 30.000+ Users</div>
        <div className="leading-relaxed max-w-[430px]">Transfering money is eassier than ever, you can access FazzPay wherever you are. Desktop, laptop, mobile phone? we cover all of that for you!</div>
        <form onSubmit={login} className="flex flex-col w-full lg:w-[430px] gap-7">
          <div className={`flex gap-3 items-center border-b-2 ${contentEmail ? "border-[#10A19D]" : "border-[#A9A9A9]"}`}>
            <AiOutlineMail className={`text-xl ${contentEmail ? "text-[#10A19D]" : null}`} />
            <input onChange={(e) => setContentEmail(e.target.value.length)} className="bg-[#f5f5f5] w-full py-2 focus:outline-none" type="text" name="email" id="email" placeholder="Enter your e-mail" />
          </div>

          <div>
            <div className={`flex gap-3 items-center border-b-2 mb-3 ${contentPassword ? "border-[#10A19D]" : "border-[#A9A9A9]"}`}>
              <FiLock className={`text-xl ${contentPassword ? "text-[#10A19D]" : null}`} />
              <input
                onChange={(e) => setContentPassword(e.target.value.length)}
                className="bg-[#f5f5f5] w-full py-2 focus:outline-none"
                type={isPassword ? "password" : "text"}
                name="password"
                id="password"
                placeholder="Enter your password"
              />
              {isPassword ? <FiEyeOff onClick={() => setIsPassword(false)} className="text-xl" /> : <FiEye onClick={() => setIsPassword(true)} className="text-xl" />}
            </div>

            <div className="text-end text-stone-800">
              <Link href="/forgotPassword">Forgot password?</Link>
            </div>
          </div>

          {errorMessage ? <div className="alert alert-error shadow-lg">
  <div>
    <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current flex-shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
    <span>{errorMessage}</span>
  </div>
</div> : null}

          <div>
            <button type='submit' disabled={contentEmail && contentPassword ? false : true} className={`w-full rounded-xl py-3 ${contentEmail && contentPassword ? "bg-[#10A19D] text-white" : "bg-[#DADADA]"}`}>Login</button>
          </div>
          <div className="text-center">
            Don’t have an account? Let’s{" "}
            <Link href="/register" className="text-[#10A19D]">
              Sign Up
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
