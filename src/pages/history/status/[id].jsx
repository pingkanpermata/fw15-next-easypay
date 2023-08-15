import React from "react";
import Image from "next/image";
import { AiOutlineDownload } from "react-icons/ai";
import Success from "../../../../public/success.svg";
import Navbar from "../../../components/Navbar";
import SideBar from "../../../components/SideBar";
import Footer from "../../../components/Footer";
import DefPic from "../../../../public/defaultUser.png";
import Link from "next/link";
import cookieConfig from "../../../helpers/cookieConfig";
import { withIronSessionSsr } from "iron-session/next";
import checkCredentials from "../../../helpers/checkCredentials";
import http from "../../../helpers/http";
import moment from "moment";
import { useRouter } from "next/router";
import { useSelector } from "react-redux";

export const getServerSideProps = withIronSessionSsr(
    async function getServerSideProps({ req, res, params }) {
        const token = req.session?.token
        const { id } = params
        checkCredentials(token, res, '/auth/login')
        return {
            props: {
                token,
            },
        };
    },
    cookieConfig
);

function Status({ token }) {
    const { query: { id } } = useRouter()
    const profile = useSelector(state => state.profile.data)
    const [data, setData] = React.useState({})
    const getData = React.useCallback(async () => {
        const { data } = await http(token).get('transactions/' + id)
        setData(data.results)
    }, [id, token])

    React.useEffect(() => {
        getData()
    }, [getData])

    return (
        <div className='bg-[#E5E5E5]'>
            <Navbar token={token} />
            <div className='flex justify-center gap-8 my-20'>
                <div className='max-sm:hidden'>
                    <SideBar />
                </div>
                <div className='w-[950px] h-[678px] bg-white rounded-xl'>
                    <div className='grid content-center justify-items-center relative top-6'>
                        <Image src={Success} alt='success' />
                        <div className='font-bold tracking-wide'>Transfer Success</div>
                    </div>
                    <div className='grid gap-8'>
                        <div className='grid gap-2 pl-6'>
                            <div className='font-light'>Amount</div>
                            <div className='font-bold'>{data.amount}</div>
                        </div>
                        <div className='grid gap-2 pl-6'>
                            <div className='font-light'>Balance Left</div>
                            <div className='font-bold'>{profile.balance}</div>
                        </div>
                        <div className='grid gap-2 pl-6'>
                            <div className='font-light'>Date & Time</div>
                            <div className='font-bold'>{moment(data.createdAt).format('MMM D, YYYY - HH.mm')}</div>
                        </div>
                        <div className='grid gap-2 pl-6'>
                            <div className='font-light'>Notes</div>
                            <div className='font-bold'>{data.notes}</div>
                        </div>
                    </div>
                    <div className='grid relative top-8 left-12 gap-4 h-20 w-[95%]'>
                        <div className='font-bold'>Transfer To</div>
                        <div className='flex gap-4'>
                            {!data?.recipient?.picture ? (
                                <Image src={DefPic} className='rounded-xl' width={50} height={50} alt='user' />) :
                                (<Image src={data?.recipient?.picture} className='rounded-xl' width={50} height={50} alt='user' />)
                            }
                            <div className='grid gap-1'>
                                <div className='font-bold'>{data?.recipient?.fullName}</div>
                                <div className='font-normal text-sm'>{data?.recipient?.username}</div>
                            </div>
                        </div>
                    </div>
                    <div className='flex justify-end items-end gap-4 h-[110px] w-[95%]'>
                        <div className='w-[200px] h-[45px] bg-[#dac387] flex justify-center items-center rounded-xl gap-2 text-[#302b1e] font-bold'>
                            <AiOutlineDownload size={25} />
                            <div className=''>Download PDF</div>
                        </div>
                        <Link href='/home' className='w-[200px] h-[45px] bg-[#302b1e] flex justify-center items-center text-white font-bold rounded-xl'>Back to Home</Link>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    )
}

export default Status