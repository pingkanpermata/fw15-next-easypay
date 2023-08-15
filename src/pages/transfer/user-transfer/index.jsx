import React from "react";
import Image from "next/image";
import { AiOutlineEdit } from "react-icons/ai";
import cookieConfig from "../../../helpers/cookieConfig";
import { withIronSessionSsr } from "iron-session/next";
import checkCredentials from "../../../helpers/checkCredentials";
import http from "../../../helpers/http";
import Navbar from "../../../components/Navbar";
import SideBar from "../../../components/SideBar";
import Footer from "../../../components/Footer";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/router";
import { setNotes, setAmount } from "../../../redux/reducers/transfer";
import DefPic from "../../../../public/defaultUser.png";

export const getServerSideProps = withIronSessionSsr(
    async function getServerSideProps({ req, res, params }) {
        const token = req.session?.token
        checkCredentials(token, res, '/auth/login')
        return {
            props: {
                token,
            },
        };
    },
    cookieConfig
);

function UserTransfer({ token }) {
    const router = useRouter()
    const dispatch = useDispatch()
    const recipient = useSelector(state => state.transfer.user)
    const profile = useSelector(state => state.profile.data)
    const amount = useSelector(state => state.transfer.amount)
    React.useEffect(() => {
        if (!recipient) {
            router.replace('/transfer')
        }
    }, [recipient, router])

    const checkAmount = (amount) => {
        amount = parseInt(amount)
        if (amount > profile.balance) {
            return profile.balance
        }
        return amount
    }

    return (
        <div className='bg-[#E5E5E5]'>
            <Navbar token={token} />
            <div className='flex justify-center gap-8 my-20'>
                <div className='max-sm:hidden'>
                    <SideBar token={token} />
                </div>
                <div className='w-[65%] max-sm:w-[90%] max-md:w-full max-lg:w-[60%] max-lg:mx-6 h-[678px] bg-white rounded-xl'>
                    <div className='w-[90%] ml-12 max-md:ml-4 max-lg:pr-6'>
                        <div className='grid relative top-12 gap-4 h-20'>
                            <div className='font-bold'>Transfer Money</div>
                            <div className='flex gap-8'>
                                {recipient.picture === null ?
                                    <Image src={DefPic} className='rounded-xl' width={50} height={50} alt='user' /> :
                                    <Image src={recipient.picture} className='rounded-xl' width={50} height={50} alt='user' />
                                }
                                <div className='grid gap-2'>
                                    <div className='font-bold'>{recipient.fullName}</div>
                                    <div className='font-normal text-sm'>{recipient.email}</div>
                                </div>
                            </div>
                        </div>
                        <div className='relative top-28 flex flex-col justify-center gap-8'>
                            <div className='max-w-[350px] text-slate-400'>Type the amount you want to transfer and then press continue to the next steps.</div>
                            <div className='grid justify-items-center gap-6'>
                                <input onChange={(e) => dispatch(setAmount(checkAmount(e.target.value)))} name='input-transfer' type='number' className='border-4 rounded-xl text-5xl text-slate-400 text-center w-[60%] max-md:w-full' defaultValue='0.00' value={checkAmount(amount)} />
                                <div className='font-bold text-[#302b1e]'>Rp. {Number(profile.balance).toLocaleString('id')} Available</div>
                                <div>
                                    <div className='grid gap-1'>
                                        <div className='flex gap-4 items-center'>
                                            <AiOutlineEdit size={25} className='text-slate-400' />
                                            <input onChange={(e) => dispatch(setNotes(e.target.value))} name='notes' type='text' placeholder='Add some notes' className='border-none pl-4 tracking-wider border-slate-400' />
                                        </div>
                                        <hr className='h-0.5 bg-slate-300 w-full' />
                                    </div>
                                </div>
                            </div>
                            <button onClick={() => router.replace('/confirmation')} disabled={!(amount >= 10000)} className='btn bg-[#302b1e] hover:bg-[#857752] text-white relative top-8'>Continue</button>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    )
}

export default UserTransfer