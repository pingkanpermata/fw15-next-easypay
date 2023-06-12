import React, { useState, useEffect } from "react";
import Navbar from "../../../components/navbar";
import Sidebar from "../../../components/sidebar";
import { HiOutlinePencil } from "react-icons/hi";
import Footer from "../../../components/footer";
import Router, { useRouter } from "next/router";
import http from "../../../helpers/http";
import { useSelector, useDispatch } from "react-redux";
import { setAmount as setAmountAction } from "../../../redux/reducers/transfer";
import WithAuth from "../../../components/hoc/withauth";
// import { get } from "immer/dist/internal";

const Amount = () => {
  const [contentNote, setContentNote] = useState(0);
  const [recipient, setRecipient] = useState({});
  const token = useSelector((state) => state.auth.token);
  const user = useSelector((state) => state.profile);
  const dispatch = useDispatch();
  const router = useRouter();

  const { id } = router.query;
  console.log(id);

  useEffect(() => {
    http(token)
      .get(`/transactions/recipient/${id}`)
      .then((res) => res.data)
      .then((data) => setRecipient(data.results));
  }, [id, token]);

  // useEffect(() => {
  //   getDetail (id);
  // }, []);
  // const getDetail = async(id) => {
  //   await axios.get ('https://68xkph-8888.preview.csb.app/transactions/recipient/${id}');
  // };

  const limit = (e) => {
    if (e.target.value > user.balance) {
      e.target.value = user.balance;
    }
  };

  const showFormattedDate = (date) => {
    const options = {
      year: "numeric",
      day: "numeric",
      month: "long",
    };
    return new Date(date).toLocaleString("en-US", options);
  };

  const setAmount = (e) => {
    e.preventDefault();
    const amount = e.target.amount.value;
    const notes = e.target.notes.value;
    const recipientId = recipient.id;
    const date = showFormattedDate(new Date)

    router.push('/transfer/confirmation')
    dispatch(setAmountAction({ amount, notes, recipientId, date }));
  };

  return (
    <>
      <Navbar />
      <main className="flex px-20 py-7 bg-[#f5f5f5] h-[580px] gap-5">
        <Sidebar transactions={true} />
        <div className="flex-[80%] h-full overflow-y-auto rounded-xl shadow-md">
          <div className="card w-full">
            <div className="card-body py-5">
              <div className="flex flex-col gap-5">
                <div className="grow font-bold text-lg text-stone-700">Transfer Money</div>

                <div className="card w-full bg-cyan-100 shadow-md">
                  <div className="card-body p-5 flex flex-row gap-3 items-center">
                    <div>
                      <img className="w-[50px]" src={recipient.picture ? `${process.env.URL_BACKEND}/upload/${recipient.picture}` : "/defaultUser.png"}  />
                    </div>
                    <div className="grow">
                      <div className="font-bold">{`${recipient.firstName} ${recipient.lastName || ""}`}</div>
                      <div>{recipient.phoneNumber}</div>
                    </div>
                  </div>
                </div>

                <form onSubmit={setAmount} className="flex flex-col gap-10">
                  <div className="w-[330px]">Type the amount you want to transfer and then press continue to the next steps.</div>

                  <div className="flex flex-col grow gap-10 items-center">
                    <div>
                      <input onChange={limit} className="text-4xl bg-cyan-50 no_arrows text-center focus:outline-none text-[#10A19D] inner-spin-button-hidden" type="number" name="amount" id="amount" placeholder="0.00" />
                    </div>

                    <div className="font-bold">Rp. {user.balance} Available</div>

                    <div className={`flex items-center gap-3 border-b-2 ${contentNote ? "border-[#2C74B3]" : "border-[#A9A9A9]"}`}>
                      <HiOutlinePencil className={contentNote ? "text-[#10A19D]" : null} />
                      <div>
                        <input onChange={(e) => setContentNote(e.target.value.length)} className="w-[300px] py-2 bg-cyan-50 focus:outline-none" type="text" name="notes" id="notes" placeholder="Add some notes" />
                      </div>
                    </div>
                  </div>

                  <div className="flex justify-end">
                    <button className="rounded-xl py-3 w-[150px] border-2 border-[#2C74B3] text-white bg-[#2C74B3]">Continue</button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
};

export default WithAuth(Amount);
