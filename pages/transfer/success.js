import React from "react";
import Navbar from "../../components/navbar";
import Sidebar from "../../components/sidebar";
import Footer from "../../components/footer";
import { useSelector } from "react-redux";

const Success = () => {
  const amount = useSelector(state=> state.transfer.amount)
  const notes = useSelector(state=> state.transfer.notes)
  const date = useSelector(state => state.transfer.date)
  const balance = useSeletor(state => state.profile.balance)

  return (
    <>
      <Navbar />
      <main className="flex px-20 py-7 bg-[#f5f5f5] h-[580px] gap-5">
        <Sidebar transactions={true} />
        <div className="flex-[80%] py-10 p-5 bg-white overflow-y-auto rounded-xl shadow-md">
          <div className="flex flex-col items-center gap-5 mb-5">
            <div>
              <img src="/success.svg" />
            </div>
            <div className="font-bold text-xl">Transfer Success</div>
          </div>

          <div className="flex flex-col gap-5">
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
                  <div className="font-bold text-stone-800">Rp. {balance - amount}</div>
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

            <div className="grow font-bold text-lg">Transfer To</div>

            <div className="card w-full shadow-md">
              <div className="card-body p-5 flex flex-row gap-3 items-center">
                <div>
                  <img src="/profile 3.svg" />
                </div>
                <div className="grow">
                  <div className="font-bold text-stone-800">Krisdayanti</div>
                  <div>+62 813-1802-1997</div>
                </div>
              </div>
            </div>

            <div className="flex justify-end gap-3">
              <div className="flex items-center text-center rounded-xl px-7 border-2 border-[#10A19D26] text-[#10A19D] bg-[#10A19D26] hover:cursor-pointer gap-3">
                <div>
                  <img src="/download.svg" />
                </div>
                <button className="py-3 font-bold text-stone-800">Download PDF</button>
              </div>
              <div>
                <button className="text-center rounded-xl py-3 px-7 border-2 border-[#2C74B3] text-white bg-[#2C74B3] hover:cursor-pointer font-bold">Back to Home</button>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
};

export default Success;
