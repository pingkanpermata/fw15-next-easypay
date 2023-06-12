import React, { useState } from "react";
import Navbar from "../../components/navbar";
import Sidebar from "../../components/sidebar";
import Footer from "../../components/footer";
import { useSelector } from "react-redux";
import http from "../../helpers/http";
import { useRef } from "react";
import WithAuth from "../../components/hoc/withauth";

const ChangePin = () => {
  const token = useSelector((state) => state.auth.token);
  const oldPin = useSelector(state => state.profile.pin)
  const [changePin, setChangePin] = useState(false);
  const [successMessage, setSuccessMessage] = useState("Please set your new pin");
  const [errorMessage, setErrorMessage] = useState("");

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

  const updatePin = async (e) => {
    e.preventDefault();
    const pin1 = e.target.pin1.value;
    const pin2 = e.target.pin2.value;
    const pin3 = e.target.pin3.value;
    const pin4 = e.target.pin4.value;
    const pin5 = e.target.pin5.value;
    const pin6 = e.target.pin6.value;

    let newPin = "";
    newPin += pin1;
    newPin += pin2;
    newPin += pin3;
    newPin += pin4;
    newPin += pin5;
    newPin += pin6;

    try {
      const { data } = await http(token).post("/profile/change-pin", { newPin });
      setSuccessMessage('Pin updated')
    } catch (err) {
      console.log(err);
    }
  };

  const confirmOldPin = (e) => {
    e.preventDefault();
    const pin1 = e.target.pin1.value;
    const pin2 = e.target.pin2.value;
    const pin3 = e.target.pin3.value;
    const pin4 = e.target.pin4.value;
    const pin5 = e.target.pin5.value;
    const pin6 = e.target.pin6.value;

    let confirmPin = "";
    confirmPin += pin1;
    confirmPin += pin2;
    confirmPin += pin3;
    confirmPin += pin4;
    confirmPin += pin5;
    confirmPin += pin6;

    if(confirmPin !== oldPin) {
      return setErrorMessage('Pin does not match!')
    }
    
    if(confirmPin === oldPin) {
     setTimeout(() => {
      setChangePin(true)
      e.target.pin1.value = null
      e.target.pin2.value = null
      e.target.pin3.value = null
      e.target.pin4.value = null
      e.target.pin5.value = null
      e.target.pin6.value = null
     }, 1000)
    }
  }

  return (
    <>
      <Navbar />
      <main className="flex px-20 py-7 bg-[#f5f5f5] h-[580px] gap-5">
        <Sidebar profile={true} />
        {!changePin ? (
          <div className="flex-[80%] flex flex-col items-center gap-3 pt-5 p-8 bg-white rounded-xl shadow overflow-y-auto">
            <div className="w-full mb-14">
              <div className="font-bold text-lg mb-5 text-stone-800">Change PIN</div>

              <div className="w-[340px] text-slate-500 text-stone-800">Enter your current 6 digits Trust-Pay PIN below to continue to the next steps.</div>
            </div>

            {errorMessage ? (
            <div className="alert alert-error shadow-lg">
              <div>
                <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current flex-shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span>{errorMessage}</span>
              </div>
            </div>
          ) : null}

            <form onSubmit={confirmOldPin} className="flex flex-col gap-10 w-6/12">
              <div className="flex gap-6 mt-5">
                <div className={`bg-white rounded-xl text-center px-1 py-2 border-[1px] ${pin1 ? "border-[#10A19D]" : "border-[#A9A9A9]"}`}>
                  <input
                    onChange={(e) => {
                      setPin1(e.target.value.length);
                      return changeInput(e);
                    }}
                    className={`grow no_arrows w-10/12 border-[#A9A9A9] bg-inherit focus:outline-none text-4xl text-center ${pin1 ? null : "border-b-[1px]"}`}
                    ref={input1}
                    type="number"
                    name="pin1"
                    id="pin1"
                    maxLength="1"
                  />
                </div>
                <div className={`bg-white rounded-xl text-center px-1 py-2 border-[1px] ${pin2 ? "border-[#10A19D]" : "border-[#A9A9A9]"}`}>
                  <input
                    onChange={(e) => {
                      setPin2(e.target.value.length);
                      return changeInput(e);
                    }}
                    className={`grow no_arrows w-10/12 border-[#A9A9A9] bg-inherit focus:outline-none text-4xl text-center ${pin2 ? null : "border-b-[1px]"}`}
                    ref={input2}
                    type="number"
                    name="pin2"
                    id="pin2"
                    maxLength="1"
                  />
                </div>
                <div className={`bg-white rounded-xl text-center px-1 py-2 border-[1px] ${pin3 ? "border-[#10A19D]" : "border-[#A9A9A9]"}`}>
                  <input
                    onChange={(e) => {
                      setPin3(e.target.value.length);
                      return changeInput(e);
                    }}
                    className={`grow no_arrows w-10/12 border-[#A9A9A9] bg-inherit focus:outline-none text-4xl text-center ${pin3 ? null : "border-b-[1px]"}`}
                    ref={input3}
                    type="number"
                    name="pin3"
                    id="pin3"
                    maxLength="1"
                  />
                </div>
                <div className={`bg-white rounded-xl text-center px-1 py-2 border-[1px] ${pin4 ? "border-[#10A19D]" : "border-[#A9A9A9]"}`}>
                  <input
                    onChange={(e) => {
                      setPin4(e.target.value.length);
                      return changeInput(e);
                    }}
                    className={`grow no_arrows w-10/12 border-[#A9A9A9] bg-inherit focus:outline-none text-4xl text-center ${pin4 ? null : "border-b-[1px]"}`}
                    ref={input4}
                    type="number"
                    name="pin4"
                    id="pin4"
                    maxLength="1"
                  />
                </div>
                <div className={`bg-white rounded-xl text-center px-1 py-2 border-[1px] ${pin5 ? "border-[#10A19D]" : "border-[#A9A9A9]"}`}>
                  <input
                    onChange={(e) => {
                      setPin5(e.target.value.length);
                      return changeInput(e);
                    }}
                    className={`grow no_arrows w-10/12 border-[#A9A9A9] bg-inherit focus:outline-none text-4xl text-center ${pin5 ? null : "border-b-[1px]"}`}
                    ref={input5}
                    type="number"
                    name="pin5"
                    id="pin5"
                    maxLength="1"
                  />
                </div>
                <div className={`bg-white rounded-xl text-center px-1 py-2 border-[1px] ${pin6 ? "border-[#10A19D]" : "border-[#A9A9A9]"}`}>
                  <input
                    onChange={(e) => {
                      setPin6(e.target.value.length);
                      return changeInput(e);
                    }}
                    className={`grow no_arrows w-10/12 border-[#A9A9A9] bg-inherit focus:outline-none text-4xl text-center ${pin6 ? null : "border-b-[1px]"}`}
                    ref={input6}
                    type="number"
                    name="pin6"
                    id="pin6"
                    maxLength="1"
                  />
                </div>
              </div>
              <div>
                <button disabled={pin1 && pin2 && pin3 && pin4 && pin5 && pin6 ? false : true} className={`w-full rounded-xl font-bold py-3 text-white ${pin1 && pin2 && pin3 && pin4 && pin5 && pin6 ? "bg-[#10A19D]" : "bg-[#DADADA]"}`}>
                  Continue
                </button>
              </div>
            </form>
          </div>
        ) : (
          <div className="flex-[80%] flex flex-col items-center gap-3 pt-5 p-8 bg-white rounded-xl shadow overflow-y-auto">
            <div className="w-full mb-14">
              <div className="font-bold text-lg mb-5 text-stone-800">Change PIN</div>

              <div className="w-[340px] text-slate-500 text-stone-800">Type your new 6 digits security PIN to use in Fazzpay.</div>
            </div>

            {successMessage ? (
            <div className="alert alert-success shadow-lg">
              <div>
                <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current flex-shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span>{successMessage}</span>
              </div>
            </div>
          ) : null}

            <form onSubmit={updatePin} className="flex flex-col gap-10 w-6/12">
              <div className="flex gap-6 mt-5">
                <div className={`bg-white rounded-xl text-center px-1 py-2 border-[1px] ${pin1 ? "border-[#10A19D]" : "border-[#A9A9A9]"}`}>
                  <input
                    onChange={(e) => {
                      setPin1(e.target.value.length);
                      return changeInput(e);
                    }}
                    className={`grow no_arrows w-10/12 border-[#A9A9A9] bg-inherit focus:outline-none text-4xl text-center ${pin1 ? null : "border-b-[1px]"}`}
                    ref={input1}
                    type="number"
                    name="pin1"
                    id="pin1"
                    maxLength="1"
                  />
                </div>
                <div className={`bg-white rounded-xl text-center px-1 py-2 border-[1px] ${pin2 ? "border-[#10A19D]" : "border-[#A9A9A9]"}`}>
                  <input
                    onChange={(e) => {
                      setPin2(e.target.value.length);
                      return changeInput(e);
                    }}
                    className={`grow no_arrows w-10/12 border-[#A9A9A9] bg-inherit focus:outline-none text-4xl text-center ${pin2 ? null : "border-b-[1px]"}`}
                    ref={input2}
                    type="number"
                    name="pin2"
                    id="pin2"
                    maxLength="1"
                  />
                </div>
                <div className={`bg-white rounded-xl text-center px-1 py-2 border-[1px] ${pin3 ? "border-[#10A19D]" : "border-[#A9A9A9]"}`}>
                  <input
                    onChange={(e) => {
                      setPin3(e.target.value.length);
                      return changeInput(e);
                    }}
                    className={`grow no_arrows w-10/12 border-[#A9A9A9]bg-inherit focus:outline-none text-4xl text-center ${pin3 ? null : "border-b-[1px]"}`}
                    ref={input3}
                    type="number"
                    name="pin3"
                    id="pin3"
                    maxLength="1"
                  />
                </div>
                <div className={`bg-white rounded-xl text-center px-1 py-2 border-[1px] ${pin4 ? "border-[#10A19D]" : "border-[#A9A9A9]"}`}>
                  <input
                    onChange={(e) => {
                      setPin4(e.target.value.length);
                      return changeInput(e);
                    }}
                    className={`grow no_arrows w-10/12 border-[#A9A9A9] bg-inherit  focus:outline-none text-4xl text-center ${pin4 ? null : "border-b-[1px]"}`}
                    ref={input4}
                    type="number"
                    name="pin4"
                    id="pin4"
                    maxLength="1"
                  />
                </div>
                <div className={`bg-white rounded-xl text-center px-1 py-2 border-[1px] ${pin5 ? "border-[#10A19D]" : "border-[#A9A9A9]"}`}>
                  <input
                    onChange={(e) => {
                      setPin5(e.target.value.length);
                      return changeInput(e);
                    }}
                    className={`grow no_arrows w-10/12 border-[#A9A9A9] bg-inherit focus:outline-none text-4xl text-center ${pin5 ? null : "border-b-[1px]"}`}
                    ref={input5}
                    type="number"
                    name="pin5"
                    id="pin5"
                    maxLength="1"
                  />
                </div>
                <div className={`bg-white rounded-xl text-center px-1 py-2 border-[1px] ${pin6 ? "border-[#10A19D]" : "border-[#A9A9A9]"}`}>
                  <input
                    onChange={(e) => {
                      setPin6(e.target.value.length);
                      return changeInput(e);
                    }}
                    className={`grow no_arrows w-10/12 border-[#A9A9A9] bg-inherit focus:outline-none text-4xl text-center ${pin6 ? null : "border-b-[1px]"}`}
                    ref={input6}
                    type="number"
                    name="pin6"
                    id="pin6"
                    maxLength="1"
                  />
                </div>
              </div>
              <div>
                <button disabled={pin1 && pin2 && pin3 && pin4 && pin5 && pin6 ? false : true} className={`w-full rounded-xl font-bold py-3 text-white ${pin1 && pin2 && pin3 && pin4 && pin5 && pin6 ? "bg-[#2C74B3]" : "bg-[#DADADA]"}`}>
                  Continue
                </button>
              </div>
            </form>
          </div>
        )}
      </main>
      <Footer />
    </>
  );
};

export default WithAuth(ChangePin);
