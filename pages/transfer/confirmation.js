import React, { useState } from "react";
import Navbar from "../../components/navbar";
import Sidebar from "../../components/sidebar";
import Footer from "../../components/footer";
import { useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { resetTransfer } from "../../redux/reducers/transfer";
import Router, { useRouter } from "next/router";
import http from "../../helpers/http";
import WithAuth from "../../components/hoc/withauth";

const Confirmation = () => {
  const user = useSelector((state) => state.profile);
  const amount = useSelector((state) => state.transfer.amount);
  const notes = useSelector((state) => state.transfer.notes);
  const date = useSelector((state) => state.transfer.date);
  const recipientId = useSelector((state) => state.transfer.recipientId);
  const token = useSelector((state) => state.auth.token);
  const dispatch = useDispatch((state) => state.auth.token);
  const router = useRouter();
  const [successMessage, setSuccessMessage] = useState("");

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

  const transfer = async (e) => {
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
      const { data } = await http(token).post("/transactions/transfer", { amount, notes, recipientId, pin });
      setSuccessMessage(data.message);
      setTimeout(() => {
        router.push("/home");
      }, 3000);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <Navbar />
      <main className="flex px-20 py-7 bg-[#f5f5f5] h-[580px] gap-5">
        <Sidebar transactions={true} />

        <div className="flex-[80%] bg-white p-5 h-full overflow-y-auto rounded-xl shadow-md">
          <div className="flex flex-col gap-3">
            <div className="grow font-bold text-lg">Transfer To</div>

            <div className="card w-full shadow-md">
              <div className="card-body p-5 flex flex-row gap-3 items-center">
                <div>
                  <img className="w-[50px]" src={"/defaultUser.png"} />
                </div>
                <div className="grow">
                  <div className="font-bold text-stone-800">Dian</div>
                  <div>082256964453</div>
                </div>
              </div>
            </div>
            <div className="grow font-bold text-lg text-stone-800">Detaills</div>

            <div className="card w-full shadow-md">
              <div className="card-body p-3 flex flex-row gap-3 items-center">
                <div className="flex flex-col">
                  <div className="text-sm text-stone-800">Amount</div>
                  <div className="font-bold text-stone-800">Rp. {amount}</div>
                </div>
              </div>
            </div>
            <div className="card w-full shadow-md">
              <div className="card-body p-3 flex flex-row gap-3 items-center">
                <div className="flex flex-col">
                  <div className="text-sm text-stone-800">Balance Left</div>
                  <div className="font-bold text-stone-800">Rp. {user.balance - amount}</div>
                </div>
              </div>
            </div>
            <div className="card w-full shadow-md">
              <div className="card-body p-3 flex flex-row gap-3 items-center">
                <div className="flex flex-col">
                  <div className="text-sm text-stone-800">Date & Time</div>
                  <div className="font-bold text-stone-800">{date}</div>
                </div>
              </div>
            </div>
            <div className="card w-full shadow-md">
              <div className="card-body p-3 flex flex-row gap-3 items-center">
                <div className="flex flex-col">
                  <div className="text-sm text-stone-800">Notes</div>
                  <div className="font-bold text-stone-800">{notes}</div>
                </div>
              </div>
            </div>

            <div className="flex justify-end">
              <label htmlFor="my-modal-1" className="text-center rounded-xl py-3 w-[150px] border-2 border-[#2C74B3] text-white bg-[#2C74B3] hover:cursor-pointer">
                Continue
              </label>
            </div>
          </div>
        </div>
      </main>

      <Footer />

      <input type="checkbox" id="my-modal-1" className="modal-toggle" />
      <div className="modal">
        <div className="modal-box relative bg-cyan-100">
          <label htmlFor="my-modal-1" className="btn btn-sm btn-circle absolute right-2 top-2">
            ✕
          </label>
          <h3 className="text-lg font-bold">Enter PIN to Transfer</h3>
          <p className="py-4">Enter your 6 digits PIN for confirmation to continue transferring money.</p>
            {successMessage ? (
              <div className="alert alert-success shadow-lg mb-5">
                <div>
                  <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current flex-shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span>{successMessage}</span>
                </div>
              </div>
            ) : null}
          <form onSubmit={transfer} className="flex flex-col w-[430px] gap-14">
            <div className="flex gap-5 mt-5">
              <div className={`bg-white rounded-xl text-center px-1 py-2 bg-inherit border-[1px] ${pin1 ? "border-[#10A19D]" : "border-[#A9A9A9]"}`}>
                <input
                  onChange={(e) => {
                    setPin1(e.target.value.length);
                    return changeInput(e);
                  }}
                  className={`grow no_arrows w-10/12 border-[#2C74B3] bg-inherit focus:outline-none text-4xl text-center ${pin1 ? null : "border-b-[1px]"}`}
                  type="number"
                  ref={input1}
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
                  className={`grow no_arrows w-10/12 border-[#2C74B3] bg-inherit focus:outline-none text-4xl text-center ${pin2 ? null : "border-b-[1px]"}`}
                  type="number"
                  ref={input2}
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
                  className={`grow no_arrows w-10/12 border-[#2C74B3] bg-inherit focus:outline-none text-4xl text-center ${pin3 ? null : "border-b-[1px]"}`}
                  type="number"
                  ref={input3}
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
                  className={`grow no_arrows w-10/12 border-[#2C74B3] bg-inherit focus:outline-none text-4xl text-center ${pin5 ? null : "border-b-[1px]"}`}
                  type="number"
                  ref={input4}
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
                  className={`grow no_arrows w-10/12 border-[#2C74B3] bg-inherit focus:outline-none text-4xl text-center ${pin5 ? null : "border-b-[1px]"}`}
                  type="number"
                  ref={input5}
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
                  className={`grow no_arrows w-10/12 border-[#2C74B3] bg-inherit focus:outline-none text-4xl text-center ${pin6 ? null : "border-b-[1px]"}`}
                  type="number"
                  ref={input6}
                  name="pin6"
                  id="pin6"
                  maxLength="1"
                />
              </div>
            </div>

            <div className="flex justify-end">
              <button
                disabled={pin1 && pin2 && pin3 && pin4 && pin5 && pin6 ? false : true}
                className={`text-center rounded-xl py-3 w-[150px] text-white hover:cursor-point ${pin1 && pin2 && pin3 && pin4 && pin5 && pin6 ? "bg-[#2C74B3]" : "bg-[#DADADA]"}`}
                type="submit"
              >
                Continue
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default WithAuth(Confirmation);
