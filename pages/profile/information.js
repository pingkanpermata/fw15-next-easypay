import React from "react";
import Navbar from "../../components/navbar";
import Sidebar from "../../components/sidebar";
import Footer from "../../components/footer";
import Link from "next/link";
import { useSelector } from "react-redux";
import WithAuth from "../../components/hoc/withauth";


const Information = () => {
  const user = useSelector(state => state.profile)

  return (
    <>
      <Navbar />
      <main className="flex px-20 py-7 bg-[#f5f5f5] h-[580px] gap-5">
        <Sidebar profile={true} />
        <div className="flex-[80%] flex flex-col items-center gap-3 pt-5 p-8 bg-white rounded-xl shadow overflow-y-auto">
          <div className="w-full mb-5">
            <div className="font-bold text-lg mb-5 text-stone-800">Personal Information</div>

            <div className="w-[340px] text-slate-500 text-stone-800">We got your personal information from the sign up proccess. If you want to make changes on your information, contact our support.</div>
          </div>

          <div className="flex flex-col w-full gap-5">
            <div className="card w-full bg-cyan-50 shadow">
              <div className="card-body p-5">
                <div>First Name</div>
                <div className="text-xl font-bold text-stone-800">{user.firstName}</div>
              </div>
            </div>
            <div className="card w-full bg-cyan-50 shadow">
              <div className="card-body p-5">
                <div>Last Name</div>
                <div className="text-xl font-bold text-stone-800">{user.lastName}</div>
              </div>
            </div>
            <div className="card w-full bg-cyan-50 shadow">
              <div className="card-body p-5">
                <div>Verified E-mail</div>
                <div className="text-xl font-bold text-stone-800">{user.email}</div>
              </div>
            </div>
            <div className="card w-full bg-cyan-50 shadow">
              <div className="card-body p-5 flex flex-row items-center">
                <div className="grow">
                  <div>Phone Number</div>
                  <div className="text-xl font-bold text-stone-800">{user.phoneNumber || '-'}</div>
                </div>
                <Link href="/profile/upPhoneNum" className="text-[#10A19D]">Manage</Link>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
};

export default WithAuth(Information);
