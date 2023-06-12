import React, { useState, useEffect } from "react";
import { IoNotificationsOutline } from "react-icons/io5";
import { useSelector, useDispatch } from "react-redux";
import { getProfile } from "../redux/actions/profile";
import http from "../helpers/http";

const Navbar = () => {
  const user = useSelector((state) => state.profile);
  const dispatch = useDispatch();
  const token = useSelector((state) => state.auth.token);
  const [page, setPage] = useState(1);
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    dispatch(getProfile(token));
    http(token)
      .get(`/transactions/notification?page=${page}&limit=5`)
      .then((res) => res.data)
      .then((data) => setNotifications(data.results));
  }, [token, page]);

  return (
    <div className="navbar px-20 py-5 bg-white rounded-xl shadow">
      <div className="flex-1">
        <div className="text-3xl text-[#2C74B3] font-bold">Trust-Pay</div>
      </div>

      <div className="flex gap-5 mr-8">
        <div>
          <img className="w-[50px]" src={user.picture ? `${process.env.URL_BACKEND}/upload/${user.picture}` : "/defaultUser.png"} />
        </div>
        <div className="flex flex-col gap-2 justify-center">
          <div className="text-lg font-bold">{`${user.firstName} ${user.lastName}`}</div>
          <div className="text-sm">{user.phoneNumber}</div>
        </div>
      </div>

      <div className="dropdown dropdown-end">
        <label tabIndex={0} className="btn btn-ghost btn-circle">
          <div className="indicator">
            <IoNotificationsOutline className="text-xl" />
          </div>
        </label>
        <div tabIndex={0} className="mt-3 card card-compact dropdown-content bg-slate-200 w-80 shadow">
          <div className="card-body">
            {notifications.map((notif, i) => (
              <div key={i} className="card w-full bg-slate-200 shadow">
                <div className="card-body flex-row items-center gap-3">
                  <div>
                    <img src={notif.type === "CREDIT" ? "/arrow-down-green.svg" : "/arrow-up-red.jpg"} />
                  </div>
                  <div>
                    <div>{notif.notes}</div>
                    <div className={`font-bold ${notif.type === "DEBIT" ? 'text-[#FF5B37]' : 'text-[#1EC15F]'}`}>{notif.amount}</div>
                  </div>
                </div>
              </div>
            ))}

            {!notifications.length ? (
              <div className="text-center font-bold">Empty</div>
            ) : null }
            <div className="flex gap-3 justify-center pb-5">
                <button onClick={() => setPage((prev) => (prev === 1 ? prev : prev - 1))} className="w-[40px] p-1 rounded-xl bg-[#DADADA] hover:bg-[#E5E5E5]">
                  <img src="/arrow-left.svg" />
                </button>
                <button onClick={() => setPage((prev) => prev + 1)} className="w-[40px] p-1 rounded-xl bg-[#DADADA] hover:bg-[#E5E5E5]">
                  <img src="/arrow-right.svg" />
                </button>
              </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
