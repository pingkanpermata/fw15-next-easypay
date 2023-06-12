import React, { useState, useEffect } from "react";
import Navbar from "../../components/navbar";
import Sidebar from "../../components/sidebar";
import Footer from "../../components/footer";
import { HiOutlinePencil } from "react-icons/hi";
import http from "../../helpers/http";
import { useSelector, useDispatch } from "react-redux";
import Link from "next/link";
import { useRouter } from "next/router";
import { logout as logoutAction } from "../../redux/reducers/auth";
import { resetProfile } from "../../redux/reducers/profile";
import WithAuth from "../../components/hoc/withauth";

const Profile = () => {
  const user = useSelector((state) => state.profile);
  const token = useSelector((state) => state.auth.token);
  const [successMessage, setSuccessMessage] = useState("");

  const dispatch = useDispatch();
  const router = useRouter();

  const logout = () => {
    dispatch(logoutAction());
    dispatch(resetProfile());
    router.push("/login");
  };

  const uploadPhoto = async (e) => {
    try {
      const file = e.target.files[0];
      const formData = new FormData();
      formData.append("picture", file);
      const { data } = await http(token).post("/profile", formData);

      setSuccessMessage("Profile picture updated");
      setTimeout(() => {
        router.reload("/profile");
      }, 3000);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Navbar />
      <main className="flex px-20 py-7 bg-[#f5f5f5] h-[580px] gap-5">
        <Sidebar profile={true} />
        <div className="flex-[80%] flex flex-col items-center gap-3 py-14 p-5 bg-white rounded-xl shadow overflow-y-auto">
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
          <div className="flex flex-col items-center gap-3">
            <div>
              <img src={user.picture ? `${process.env.URL_BACKEND}/upload/${user.picture}` : "/defaultUser.png"} width="80" />
            </div>
            <div className="flex gap-2 items-center justify-center">
              <HiOutlinePencil className="text-sm" />
              <label for="picture" className="hover:cursor-pointer">
                Edit
              </label>
              <input className="hidden" onChange={uploadPhoto} type="file" name="picture" id="picture" />
            </div>
          </div>

          <div className="text-center mb-5">
            <div className="text-2xl mb-3 font-bold">{`${user.firstName} ${user.lastName}`}</div>
            <div>{user.phoneNumber}</div>
          </div>

          <div className="flex flex-col gap-3 w-7/12">
            <div>
              <Link href="/profile/information" className="flex w-full bg-[#E5E5E5] px-5 py-4 rounded-xl items-center">
                <button className="flex justify-start grow w-full text-lg">Personal Information</button>
                <div>
                  <img className="w-[30px]" src="/arrow-right.svg" />
                </div>
              </Link>
            </div>
            <div>
              <Link href="/profile/changePass" className="flex w-full bg-[#E5E5E5] px-5 py-4 rounded-xl items-center">
                <button className="flex justify-start grow w-full text-lg">Change Password</button>
                <div>
                  <img className="w-[30px]" src="/arrow-right.svg" />
                </div>
              </Link>
            </div>
            <div>
              <Link href="/profile/changePin" className="flex w-full bg-[#E5E5E5] px-5 py-4 rounded-xl items-center">
                <button className="flex justify-start grow w-full text-lg">Change PIN</button>
                <div>
                  <img className="w-[30px]" src="/arrow-right.svg" />
                </div>
              </Link>
            </div>
            <div>
              <Link href="/" className="flex w-full bg-[#E5E5E5] px-5 py-4 rounded-xl items-center">
                <div className="flex justify-start grow w-full text-lg">Logout</div>
              </Link>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
};

export default WithAuth(Profile);
