import React, { useState } from "react";
import FormLogin from "../components/FormLogin";
import Link from "next/link";
import { AiOutlineMail } from "react-icons/ai";
import { FiLock, FiEye, FiEyeOff } from "react-icons/fi";
import { BsPerson } from "react-icons/bs";
import { registerAction } from "../redux/actions/auth";
import {useDispatch} from 'react-redux'
import { useRouter } from "next/router";

const Register = () => {
  const dispatch = useDispatch()
  const router = useRouter()

  const [isPassword, setIsPassword] = useState(true);
  const [contentEmail, setContentEmail] = useState(0);
  const [contentFirstName, setContentFirstName] = useState(0);
  const [contentLastName, setContentLastName] = useState(0);
  const [contentPassword, setContentPassword] = useState(0);
    const [errMessage, setErrMessage] = useState('')


  const register = async (e) => {
    e.preventDefault()
    const firstName = e.target.firstName.value
    const lastName = e.target.lastName.value
    const email = e.target.email.value
    const password = e.target.password.value

    const cb = () => {
      router.push('/pin')
    }

    try{
      const result = await dispatch(registerAction({firstName, lastName,email, password, cb}))
      
      if(result.payload.startsWith('duplicate')){
        setErrMessage('Email already used')
      }
    }catch(err){
      console.log(err)
    }
  }
  return (
    <div className="flex h-screen">
      <FormLogin />

      <div className="flex flex-col flex-[40%] px-10 gap-5 overflow-y-auto pt-10 lg:pt-16 pb-10  bg-[#f5f5f5]">
        <div className="lg:hidden text-3xl font-bold text-[#2C74B3]">Trust-Pay</div>

        <div className="text-2xl font-bold text-cyan-600 leading-relaxed max-w-[400px]">Start Accessing Banking Needs With All Devices and All Platforms With 30.000+ Users</div>
        <div className="leading-relaxed text-cyan-500 max-w-[430px]">Transfering money is eassier than ever, you can access Trust-Pay wherever you are. Desktop, laptop, mobile phone? we cover all of that for you!</div>
        <form onSubmit={register} className="flex flex-col w-full lg:w-[430px] gap-7">
          <div className={`flex gap-3 items-center border-b-2 ${contentFirstName ? "border-[#2C74B3]" : "border-[#A9A9A9]"}`}>
            <BsPerson className={`text-xl ${contentFirstName ? "text-[#2C74B3]" : null}`} />
            <input onChange={(e) => setContentFirstName(e.target.value.length)} className="bg-[#f5f5f5] w-full py-2 focus:outline-none" type="text" name="firstName" id="firstName" placeholder="Enter your first name" />
          </div>

          <div className={`flex gap-3 items-center border-b-2 ${contentLastName ? "border-[#2C74B3]" : "border-[#A9A9A9]"}`}>
            <BsPerson className={`text-xl ${contentLastName ? "text-[#2C74B3]" : null}`} />
            <input onChange={(e) => setContentLastName(e.target.value.length)} className="bg-[#f5f5f5] w-full py-2 focus:outline-none" type="text" name="lastName" id="lastName" placeholder="Enter your last name" />
          </div>

          <div className={`flex gap-3 items-center border-b-2 ${contentEmail ? "border-[#2C74B3]" : "border-[#A9A9A9]"}`}>
            <AiOutlineMail className={`text-xl ${contentEmail ? "text-[#2C74B3]" : null}`} />
            <input onChange={(e) => setContentEmail(e.target.value.length)} className="bg-[#f5f5f5] w-full py-2 focus:outline-none" type="text" name="email" id="email" placeholder="Enter your e-mail" />
          </div>

          <div>
            <div className={`flex gap-3 items-center border-b-2 mb-3 ${contentPassword ? "border-[#2C74B3]" : "border-[#A9A9A9]"}`}>
              <FiLock className={`text-xl ${contentPassword ? "text-[#2C74B3]" : null}`} />
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

          </div>

          {errMessage ? <div className="alert alert-error shadow-lg">
  <div>
    <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current flex-shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
    <span>{errMessage}</span>
  </div>
</div> : null}

          <div>
            <button type="submit" disabled={contentEmail && contentPassword && contentFirstName && contentLastName ? false : true} className={`w-full rounded-xl py-3 ${contentEmail && contentPassword && contentFirstName && contentLastName ? "bg-[#2C74B3] text-white" : "bg-[#DADADA]"}`}>Sign Up</button>
          </div>
        </form>

        <div className="text-center text-stone-800">
          Already have an account? Let’s{" "}
          <Link href="/login" className="text-[#2C74B3]">
            Login
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Register;
