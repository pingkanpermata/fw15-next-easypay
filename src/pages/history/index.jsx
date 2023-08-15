import React, { useState, useEffect } from "react";
import Image from "next/image";
import DefPic from "../../../public/defaultUser.png";
import Link from "next/link";
import { withIronSessionSsr } from "iron-session/next";
import checkCredentials from "../../helpers/checkCredentials";
import cookieConfig from "../../helpers/cookieConfig";
import Navbar from "../../components/Navbar";
import SideBar from "../../components/SideBar";
import Footer from "../../components/Footer";
import http from "../../helpers/http";
import { useSelector } from "react-redux";

export const getServerSideProps = withIronSessionSsr(
    async function getServerSideProps({ req, res }) {
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

function History({ token }) {
    const [historyUser, setHistoryUser] = useState([])
    const [sortHistory, setSortHistory] = useState(false)
    const user = useSelector(state => state.profile.data)
    const [sortBy, setSortBy] = React.useState('DESC');
    const [sortName, setSortName] = React.useState('type');
    const [paginition, setPaginition] = React.useState(1);

    const sorting = () => {
        setSortHistory(prevSort => !prevSort);
    };

    const sortTransfer = () => {
        setSortBy('DESC');
    };

    const sortTopUp = () => {
        setSortBy('ASC');
    };

    const getHistory = React.useCallback(
        async () => {
            const { data } = await http(token).get(`/transactions?page=${paginition}&limit=4&sort=${sortBy}&orderBy=${sortName}`)
            setHistoryUser(data)
        }, [token, sortBy, sortName, paginition])

    useEffect(() => {
        getHistory()
    }, [getHistory])

    const pageNext = () => {
        setPaginition(paginition + 1);
    };

    const pagePrev = () => {
        setPaginition(paginition - 1);
    };

    return (
        <div className='bg-[#E5E5E5]'>
            <Navbar token={token} />
            <div className='flex justify-center gap-8 my-20'>
                <div className='max-sm:hidden'>
                    <SideBar />
                </div>
                <div className='bg-white max-w-[850px] w-[850px] h-[678px] rounded-xl p-12 max-md:p-2'>
                    <div className='flex justify-around items-center flex-wrap h-20'>
                        <div className='font-bold'>Transaction History</div>
                        <div className='flex items-center gap-6'>
                            {sortHistory &&
                                <div className='flex flex-col gap-2 text-white'>
                                    <button onClick={() => sortTransfer()} className='bg-red-400 w-32 h-8 rounded-md flex items-center justify-center'>
                                        sort by Transfer
                                    </button>
                                    <button onClick={() => sortTopUp()} className='bg-green-400 w-32 h-8 rounded-md flex items-center justify-center'>
                                        sort by TopUp
                                    </button>
                                </div>
                            }
                            <div onClick={() => sorting()} className='w-[155px] h-[40px] bg-slate-200 flex justify-center items-center rounded-xl cursor-pointer'>-- Select Filter --</div>
                        </div>
                    </div>
                    <div className='grid gap-8 mt-6'>
                        {historyUser.results?.map(historyUser => {
                            return (
                                <div key={`history-${historyUser.id}`} className='flex justify-around items-center'>
                                    <Link href={`/history/status/${historyUser.id}`} className='flex gap-4'>
                                        {historyUser.recipient.picture === null ?
                                            <Image src={DefPic} className='rounded-xl w-16 h-16' alt='avatar' /> :
                                            <Image src={historyUser.recipient.picture} className='rounded-xl' width={50} height={50} alt='avatar' />
                                        }
                                        <div className='grid gap-2'>
                                            {historyUser.recipient.fullName === null ?
                                                <div className='font-bold'>{historyUser.recipient.username}</div> :
                                                <div className='font-bold'>{historyUser.recipient.fullName}</div>
                                            }
                                            <div className='text-sm'>{historyUser.type}</div>
                                        </div>
                                    </Link>
                                    <Link href={`/history/status/${historyUser.id}`}>
                                        <div className={`font-bold ${historyUser.type === 'TOP-UP' ? 'text-green-500' : 'text-red-500'}`}>Rp.{historyUser.amount.toLocaleString('id-ID')}</div>
                                    </Link>
                                </div>
                            )
                        })}
                        <div className='flex justify-center mt-4 gap-6'>
                            <button disabled={paginition <= 1} onClick={() => pagePrev()} className='w-16 rounded-md text-center font-semibold h-6 bg-slate-300'>Prev</button>
                            <div className='font-bold'>{historyUser.pageInfo?.page}</div>
                            <button disabled={paginition === historyUser.pageInfo?.totalPage} onClick={() => pageNext()} className='w-16 rounded-md text-center font-semibold h-6 bg-slate-400'>Next</button>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    )
}

export default History