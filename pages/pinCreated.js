import React, { useState } from "react";
import FormLogin from "../components/FormLogin";
import WithAuth from "../components/hoc/withauth.js";
import Link from "next/link";

const PinCreated = () => {

  return (
    <div className="flex h-screen">
      <FormLogin />

      <div className="flex flex-col flex-[40%] px-10 gap-5 overflow-y-auto pt-16 pb-10 bg-[#f5f5f5]">
        <img className="w-[80px]" src='/success.svg'/>
        <div className="text-2xl text-cyan-600 font-bold leading-relaxed w-[400px]">Your PIN Was Successfully Created</div>
        <div className="leading-relaxed text-cyan-500 w-[430px]">Your PIN was successfully created and you can now access all the features in Trust-Pay.</div>

            <Link href='/home' className={`w-full rounded-xl font-bold py-3 text-center text-white bg-[#2C74B3]`}>
              Go To Dashboard
            </Link>
          
      </div>
    </div>
  );
};

export default WithAuth(PinCreated);