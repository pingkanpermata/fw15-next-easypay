import React from "react";
import Navbar from "../../components/navbar";
import Sidebar from "../../components/sidebar";
import Footer from "../../components/footer";

const Error = () => {
  return (
    <>
      <Navbar />
      <main className="flex px-20 py-7 bg-[#f5f5f5] h-[580px] gap-5">
        <Sidebar transactions={true} />
        <div className="flex-[80%] py-10 p-5 bg-white overflow-y-auto rounded-xl shadow-md">
          <div className="flex flex-col items-center gap-5 mb-5">
            <div>
              <img src="/failed.svg" />
            </div>
            <div className="font-bold text-xl">Transfer Failed</div>
            <div className="w-[600px] text-center">We can’t transfer your money at the moment, we recommend you to check your internet connection and try again.</div>
          </div>

          <div className="flex flex-col gap-5">
            <div className="card w-full shadow-md">
              <div className="card-body p-3 flex flex-row gap-3 items-center">
                <div className="flex flex-col">
                  <div className="text-sm">Amount</div>
                  <div className="font-bold">Rp500.000</div>
                </div>
              </div>
            </div>
            <div className="card w-full shadow-md">
              <div className="card-body p-3 flex flex-row gap-3 items-center">
                <div className="flex flex-col">
                  <div className="text-sm">Balance Left</div>
                  <div className="font-bold">Rp200.000</div>
                </div>
              </div>
            </div>
            <div className="card w-full shadow-md">
              <div className="card-body p-3 flex flex-row gap-3 items-center">
                <div className="flex flex-col">
                  <div className="text-sm">Date & Time</div>
                  <div className="font-bold">May 18, 2022 - 14.20</div>
                </div>
              </div>
            </div>
            <div className="card w-full shadow-md">
              <div className="card-body p-3 flex flex-row gap-3 items-center">
                <div className="flex flex-col">
                  <div className="text-sm">Notes</div>
                  <div className="font-bold">English Course</div>
                </div>
              </div>
            </div>

            <div className="grow font-bold text-lg">Transfer To</div>

            <div className="card w-full shadow-md">
              <div className="card-body p-5 flex flex-row gap-3 items-center">
                <div>
                  <img src="/profile 3.svg" />
                </div>
                <div className="grow">
                  <div className="font-bold">Michael Jackson</div>
                  <div>+62 812-1802-14045</div>
                </div>
              </div>
            </div>

            <div className="flex justify-end gap-3">
              <div>
                <button className="text-center rounded-xl py-3 px-7 border-2 border-[#2C74B3] text-white bg-[#2C74B3] hover:cursor-pointer font-bold">Try Again</button>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
};

export default WithAuth(Error);
