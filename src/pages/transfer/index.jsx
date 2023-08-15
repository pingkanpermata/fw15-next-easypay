import React, {useState, useEffect} from "react";
import Link from "next/link";
import Image from "next/image";
import DefPic from "../../../public/defaultUser.png";
import { AiOutlineSearch } from "react-icons/ai";
import { withIronSessionSsr } from "iron-session/next";
import checkCredentials from "../../helpers/checkCredentials";
import cookieConfig from "../../helpers/cookieConfig";
import Navbar from "../../components/Navbar";
import SideBar from "../../components/SideBar";
import Footer from "../../components/Footer";
import { useDispatch, useSelector } from "react-redux";
import http from "../../helpers/http";
import { setRecipient as setRecipientAction } from "../../redux/reducers/transfer";
import { useRouter } from "next/router";

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

function Transfer({ token }) {
    const dispatch = useDispatch()
    const [recipient, setRecipient] = useState({})
    const [search, setSearch] = useState('')
    const router = useRouter()

    const getUsers = React.useCallback(async (page = 1, search = '') => {
        const { data } = await http(token).get('/users', { params: { page, search, limit: 4 } })
        setRecipient(data)
    }, [token])

    useEffect(() => {
        getUsers(1, search)
    }, [search, getUsers])

    const recipientRedux = useSelector(state => state.transfer.user)

    React.useEffect(() => {
        if (recipientRedux) {
            router.push('transfer/user-transfer')
        }
    }, [recipientRedux, router])

    return (
        <div className='bg-[#E5E5E5]'>
            <Navbar token={token} />
            <div className='flex justify-center gap-8 my-20'>
                <div className='max-sm:hidden'>
                    <SideBar token={token} />
                </div>
                <div className='bg-white max-w-[850px] w-[850px] h-[678px] rounded-xl px-12 max-md:px-4'>
                    <div className='w-[90%] ml-12 max-lg:pr-6 max-md:ml-4'>
                        <div className='grid relative top-12 gap-4 h-20'>
                            <div className='font-bold'>Search Receiver</div>
                            <input onChange={(e) => setSearch(e.target.value)} type="text" placeholder="Search receiver here" class="input input-bordered w-full bg-slate-200 pl-16" />
                            <AiOutlineSearch size={30} className='relative top-[-55px] left-4 text-slate-400' />
                        </div>
                        <div className='grid gap-10 relative top-[100px]'>
                            {recipient.results?.map(historyTransaksi => {
                                return (
                                    <div key={`history-${historyTransaksi.id}`} className='flex justify-between'>
                                        <div onClick={() => dispatch(setRecipientAction(historyTransaksi))} className='cursor-pointer flex left-4 gap-4'>
                                            <>
                                                <div>
                                                    {!historyTransaksi.picture && <Image src={DefPic} className='rounded-xl' width={50} height={50} alt='avatar' />}
                                                    {historyTransaksi.picture && <Image src={historyTransaksi.picture} className='rounded-xl w-12 h-12' width={50} height={50} alt='avatar' />}
                                                </div>
                                                <div className='grid gap-2'>
                                                    <div className='font-bold'>{historyTransaksi.fullName}</div>
                                                    <div className='text-sm'>{historyTransaksi.email}</div>
                                                </div>
                                            </>
                                        </div>
                                    </div>
                                )
                            })}
                            <div className='flex gap-5 justify-center items-center'>
                                <button disabled={recipient.pageInfo?.page <= 1} onClick={() => getUsers(recipient.pageInfo?.page - 1, search)} className='btn bg-[#302b1e] hover:bg-[#857752] text-white'>Prev</button>
                                <div className='font-bold'>{recipient.pageInfo?.page} of {recipient.pageInfo?.totalPage}</div>
                                <button disabled={recipient.pageInfo?.page === recipient.pageInfo?.totalPage} onClick={() => getUsers(recipient.pageInfo?.page + 1, search)} className='btn bg-[#302b1e] hover:bg-[#857752] text-white'>Next</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    )
}

export default Transfer