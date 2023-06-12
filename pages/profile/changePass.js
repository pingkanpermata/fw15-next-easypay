import React, { useState } from "react";
import Navbar from "../../components/navbar";
import Sidebar from "../../components/sidebar";
import Footer from "../../components/footer";
import { FiLock, FiEye, FiEyeOff } from "react-icons/fi";
import http from "../../helpers/http";
import { useSelector } from "react-redux";
import WithAuth from "../../components/hoc/withauth";

const ChangePassword = () => {
  const token = useSelector((state) => state.auth.token);
  const [contentCurrentPassword, setContentCurrentPassword] = useState(0);
  const [contentNewPassword, setContentNewPassword] = useState(0);
  const [contentConfirmNewPassword, setContentConfirmNewPassword] = useState(0);
  const [isCurrentPassword, setIsCurrentPassword] = useState(true);
  const [isNewPassword, setIsNewPassword] = useState(true);
  const [isConfirmNewPassword, setIsConfirmNewPassword] = useState(true);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const changePassword = async (e) => {
    e.preventDefault();
    const currentPassword = e.target.currentPassword.value;
    const newPassword = e.target.newPassword.value;
    const confirmPassword = e.target.confirmPassword.value;

    if (newPassword !== confirmPassword) {
      setSuccessMessage("");
      return setErrorMessage("New password and confirm password not match");
    }

    try {
      const { data } = await http(token).post("/profile/change-password", { currentPassword, newPassword, confirmPassword });
      setSuccessMessage("Password has been changed");
      setErrorMessage("");
    } catch (err) {
      setErrorMessage(err.response.data.message);
      setSuccessMessage("");
    }
  };

  return (
    <>
      <Navbar />
      <main className="flex px-20 py-7 bg-[#f5f5f5] h-[580px] gap-5">
        <Sidebar profile={true} />
        <div className="flex-[80%] flex flex-col items-center gap-3 pt-5 p-8 bg-white rounded-xl shadow overflow-y-auto">
          <div className="w-full mb-14">
            <div className="font-bold text-lg mb-5 text-stone-800">Change Password</div>

            <div className="w-[340px] text-slate-500 text-stone-800">You must enter your current password and then type your new password twice.</div>
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
          <form onSubmit={changePassword} className="flex flex-col gap-10 w-5/12">
            <div className={`flex gap-3 items-center border-b-2 ${contentCurrentPassword ? "border-[#2C74B3]" : "border-[#2C74B3]"}`}>
              <FiLock className={`text-xl ${contentCurrentPassword ? "text-[#2C74B3]" : null}`} />
              <input
                onChange={(e) => setContentCurrentPassword(e.target.value.length)}
                className="bg-white w-full py-2 focus:outline-none"
                type={isCurrentPassword ? "password" : "text"}
                name="currentPassword"
                id="currentPassword"
                placeholder="Current password"
              />
              {isCurrentPassword ? <FiEyeOff onClick={() => setIsCurrentPassword(false)} className="text-xl" /> : <FiEye onClick={() => setIsCurrentPassword(true)} className="text-xl" />}
            </div>

            <div className={`flex gap-3 items-center border-b-2 ${contentNewPassword ? "border-[#2C74B3]" : "border-[#2C74B3]"}`}>
              <FiLock className={`text-xl ${contentNewPassword ? "text-[#2C74B3]" : null}`} />
              <input
                onChange={(e) => setContentNewPassword(e.target.value.length)}
                className="bg-white w-full py-2 focus:outline-none"
                type={isNewPassword ? "password" : "text"}
                name="newPassword"
                id="newPassword"
                placeholder="New password"
              />
              {isNewPassword ? <FiEyeOff onClick={() => setIsNewPassword(false)} className="text-xl" /> : <FiEye onClick={() => setIsNewPassword(true)} className="text-xl" />}
            </div>

            <div className={`flex gap-3 items-center border-b-2 ${contentConfirmNewPassword ? "border-[#2C74B3]" : "border-[#2C74B3]"}`}>
              <FiLock className={`text-xl ${contentConfirmNewPassword ? "text-[#2C74B3]" : null}`} />
              <input
                onChange={(e) => setContentConfirmNewPassword(e.target.value.length)}
                className="bg-white w-full py-2 focus:outline-none"
                type={isConfirmNewPassword ? "password" : "text"}
                name="confirmPassword"
                id="confirmPassword"
                placeholder="Repeat password"
              />
              {isConfirmNewPassword ? <FiEyeOff onClick={() => setIsConfirmNewPassword(false)} className="text-xl" /> : <FiEye onClick={() => setIsConfirmNewPassword(true)} className="text-xl" />}
            </div>

            <div>
              <button
                disabled={contentCurrentPassword && contentNewPassword && contentConfirmNewPassword ? false : true}
                className={`w-full rounded-xl font-bold py-3 ${contentCurrentPassword && contentNewPassword && contentConfirmNewPassword ? "bg-[#2C74B3] text-white" : "bg-[#DADADA]"}`}
              >
                Change Password
              </button>
            </div>
          </form>
        </div>
      </main>
      <Footer />
    </>
  );
};

export default WithAuth(ChangePassword);
