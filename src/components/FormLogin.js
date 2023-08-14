import React from "react";
import Link from "next/link";

export default function FormLogin() {
  return (
    <div>
      <div
        className="hidden lg:flex flex-[60%] flex-col bg-[url('/MaskGroup.svg')] bg-cover px-20 py-10 text-white">
        <Link href="/" ><img className="w-[30%]" src="/logo-easypay.png" alt="" /></Link>
        <div className="flex justify-center">
          <img className="h-[400px] w-[500px]" src="/Group 10.svg" />
        </div>
        <div>
          <div className="text-xl font-bold mb-5">App that Covering Banking Needs.</div>
          <div className="max-w-[500px]">
            Trust-Pay is an application that focussing in banking needs for all users in the world. Always updated and always following world trends. 5000+ users registered in FazzPay everyday with worldwide users coverage.
          </div>
        </div>
      </div>
    </div>
  );
}
