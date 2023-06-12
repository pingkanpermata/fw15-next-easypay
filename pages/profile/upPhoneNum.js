import React, { useState } from "react";
import Navbar from "../../components/navbar";
import Sidebar from "../../components/sidebar";
import Footer from "../../components/footer";
import { BsTelephone } from "react-icons/bs";
import http from "../../helpers/http";
import { useSelector } from "react-redux";
import WithAuth from "../../components/hoc/withauth";

const ChangePhoneNumber = () => {
  const [contentPhoneNumber, setContentPhoneNumber] = useState(0)
  const token = useSelector(state => state.auth.token)
  const [successMessage, setSuccessMessage] = useState("");

  const upPhoneNum = async (e) => {
    e.preventDefault()
    const phoneNumber = e.target.phoneNumber.value

    try {
      const { data } = await http(token).post('/profile/phone-number', {phoneNumber})
      setSuccessMessage('Phone number updated')
    } catch (err) {
      console.log(err)
    }
  }

  return (
    <>
      <Navbar />
      <main className="flex px-20 py-7 bg-[#f5f5f5] h-[580px] gap-5">
        <Sidebar profile={true} />
        <div className="flex-[80%] flex flex-col items-center gap-3 pt-5 p-8 bg-white rounded-xl shadow overflow-y-auto">
          <div className="w-full mb-14">
            <div className="font-bold text-lg mb-5 text-stone-800">Edit Phone Number</div>

            <div className="w-[340px] text-slate-500 text-stone-800">Add at least one phone number for the transfer ID so you can start transfering your money to another user.</div>
          </div>
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
          <form onSubmit={upPhoneNum} className="flex flex-col gap-10 w-6/12">
            <div className={`flex gap-3 items-center border-b-2 ${contentPhoneNumber ? "border-[#2C74B3]" : "border-[#2C74B3]"}`}>
              <BsTelephone className={`text-xl ${contentPhoneNumber ? "text-[#2C74B3]" : null}`} />
              <div className="font-bold">+62</div>
              <input
                onChange={(e) => setContentPhoneNumber(e.target.value.length)}
                className="bg-white w-full py-2 focus:outline-none no_arrows"
                type="number"
                name="phoneNumber"
                id="phoneNumber"
                placeholder="Enter your phone number"
              />
    
            </div>
            <div>
              <button type="submit" className={`w-full rounded-xl font-bold py-3 ${contentPhoneNumber ? 'bg-[#2C74B3] text-white': 'bg-[#E5E5E5]'}`}>Continue</button>
            </div>
          </form>
        </div>
      </main>
      <Footer />
    </>
  );
};

export default WithAuth(ChangePhoneNumber);
