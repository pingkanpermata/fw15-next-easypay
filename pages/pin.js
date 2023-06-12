import React, { useState } from "react";
import FormLogin from "../components/FormLogin";
import jwt_decode from "jwt-decode";
import { useSelector } from "react-redux";
import http from "../helpers/http";
import { useRef } from "react";
import WithAuth from "../components/hoc/withauth.js";
import { useRouter } from "next/router";


const Pin = () => {
  const token = useSelector((state) => state.auth.token);
  const decode = jwt_decode(token);
  const router = useRouter()

  const [pin1, setPin1] = useState(0);
  const [pin2, setPin2] = useState(0);
  const [pin3, setPin3] = useState(0);
  const [pin4, setPin4] = useState(0);
  const [pin5, setPin5] = useState(0);
  const [pin6, setPin6] = useState(0);

  const input1 = useRef(null);
  const input2 = useRef(null);
  const input3 = useRef(null);
  const input4 = useRef(null);
  const input5 = useRef(null);
  const input6 = useRef(null);

  const createPin = async (e) => {
    e.preventDefault();
    const pin1 = e.target.pin1.value;
    const pin2 = e.target.pin2.value;
    const pin3 = e.target.pin3.value;
    const pin4 = e.target.pin4.value;
    const pin5 = e.target.pin5.value;
    const pin6 = e.target.pin6.value;

    let pin = "";
    pin += pin1;
    pin += pin2;
    pin += pin3;
    pin += pin4;
    pin += pin5;
    pin += pin6;

    try {
      const { data } = await http().post("/auth/set-pin", { userId: decode.id, pin });
      router.push('/pinCreated')
    } catch (err) {
      console.log(err);
    }
  };

  const changeInput = (e) => {
    if (e.target.value.length > 1) {
      e.target.value = e.target.value.slice(0, 1);
    }

    if (e.target.value.length) {
      if (e.target.name === "pin1") {
        input2.current.focus();
      }
      if (e.target.name === "pin2") {
        input3.current.focus();
      }
      if (e.target.name === "pin3") {
        input4.current.focus();
      }
      if (e.target.name === "pin4") {
        input5.current.focus();
      }
      if (e.target.name === "pin5") {
        input6.current.focus();
      }
    }

    if (!e.target.value.length) {
      if (e.target.name === "pin2") {
        input1.current.focus();
      }
      if (e.target.name === "pin3") {
        input2.current.focus();
      }
      if (e.target.name === "pin4") {
        input3.current.focus();
      }
      if (e.target.name === "pin5") {
        input4.current.focus();
      }
      if (e.target.name === "pin6") {
        input5.current.focus();
      }
    }
  };

  return (
    <div className="flex h-screen">
      <FormLogin />

      <div className="flex flex-col flex-[40%] px-10 gap-5 items-center overflow-y-auto pt-16 pb-10 bg-[#f5f5f5]">
        <div className="text-2xl font-bold text-cyan-600 leading-relaxed w-[430px]">Secure Your Account, Your Wallet, and Your Data With 6 Digits PIN That You Created Yourself.</div>
        <div className="leading-relaxed text-cyan-500 w-[430px]">Create 6 digits pin to secure all your money and your data in Trust-Pay app. Keep it secret and don’t tell anyone about your Trust-Pay account password and the PIN.</div>

        <form onSubmit={createPin} className="flex flex-col w-[430px] gap-14">
          <div className="flex gap-6 mt-5">
            <div className={`bg-white rounded-xl text-center px-1 py-2 border-[1px] ${pin1 ? "border-[#2C74B3]" : "border-[#A9A9A9]"}`}>
              <input
                onChange={(e) => {
                  setPin1(e.target.value.length);
                  return changeInput(e);
                }}
                className={`grow no_arrows w-10/12 border-[#A9A9A9] focus:outline-none bg-inherit text-4xl text-center ${pin1 ? null : "border-b-[1px]"}`}
                type="number"
                ref={input1}
                name="pin1"
                id="pin1"
                maxLength="1"
              />
            </div>
            <div className={`bg-white rounded-xl text-center px-1 py-2 border-[1px] ${pin2 ? "border-[#2C74B3]" : "border-[#A9A9A9]"}`}>
              <input
                onChange={(e) => {
                  setPin2(e.target.value.length);
                  return changeInput(e);
                }}
                className={`grow no_arrows w-10/12 border-[#A9A9A9] bg-inherit focus:outline-none text-4xl text-center ${pin2 ? null : "border-b-[1px]"}`}
                type="number"
                ref={input2}
                name="pin2"
                id="pin2"
                maxLength="1"
              />
            </div>
            <div className={`bg-white rounded-xl text-center px-1 py-2 border-[1px] ${pin3 ? "border-[#2C74B3]" : "border-[#A9A9A9]"}`}>
              <input
                onChange={(e) => {
                  setPin3(e.target.value.length);
                  return changeInput(e);
                }}
                className={`grow no_arrows w-10/12 border-[#A9A9A9] bg-inherit focus:outline-none text-4xl text-center ${pin3 ? null : "border-b-[1px]"}`}
                type="number"
                ref={input3}
                name="pin3"
                id="pin3"
                maxLength="1"
              />
            </div>
            <div className={`bg-white rounded-xl text-center px-1 py-2 border-[1px] ${pin4 ? "border-[#2C74B3]" : "border-[#A9A9A9]"}`}>
              <input
                onChange={(e) => {
                  setPin4(e.target.value.length);
                  return changeInput(e);
                }}
                className={`grow no_arrows w-10/12 border-[#A9A9A9] bg-inherit focus:outline-none text-4xl text-center ${pin4 ? null : "border-b-[1px]"}`}
                type="number"
                ref={input4}
                name="pin4"
                id="pin4"
                maxLength="1"
              />
            </div>
            <div className={`bg-white rounded-xl text-center px-1 py-2 border-[1px] ${pin5 ? "border-[#2C74B3]" : "border-[#A9A9A9]"}`}>
              <input
                onChange={(e) => {
                  setPin5(e.target.value.length);
                  return changeInput(e);
                }}
                className={`grow no_arrows w-10/12 border-[#A9A9A9] bg-inherit focus:outline-none text-4xl text-center ${pin5 ? null : "border-b-[1px]"}`}
                type="number"
                ref={input5}
                name="pin5"
                id="pin5"
                maxLength="1"
              />
            </div>
            <div className={`bg-white rounded-xl text-center px-1 py-2 border-[1px] ${pin6 ? "border-[#2C74B3]" : "border-[#A9A9A9]"}`}>
              <input
                onChange={(e) => {
                  setPin6(e.target.value.length);
                  return changeInput(e);
                }}
                className={`grow no_arrows w-10/12 border-[#A9A9A9] bg-inherit focus:outline-none text-4xl text-center ${pin6 ? null : "border-b-[1px]"}`}
                type="number"
                ref={input6}
                name="pin6"
                id="pin6"
                maxLength="1"
              />
            </div>
          </div>
          <div>
            <button disabled={pin1 && pin2 && pin3 && pin4 && pin5 && pin6 ? false : true} className={`w-full rounded-xl font-bold py-3 text-white ${pin1 && pin2 && pin3 && pin4 && pin5 && pin6 ? "bg-[#2C74B3]" : "bg-[#DADADA]"}`}>
              Confirm
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default WithAuth(Pin);
