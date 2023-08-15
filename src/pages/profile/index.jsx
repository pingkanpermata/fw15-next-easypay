import React from "react";
import Image from "next/image";
import DefPic from "../../../public/defaultUser.png";
import { AiOutlineEdit, AiOutlineArrowRight } from 'react-icons/ai';
import Link from "next/link";
import cookieConfig from "../../helpers/cookieConfig";
import { withIronSessionSsr } from "iron-session/next";
import checkCredentials from "../../helpers/checkCredentials";
import Navbar from "../../components/Navbar";
import SideBar from "../../components/SideBar.jsx";
import Footer from "../../components/Footer";
import http from "../../helpers/http";
import { useDispatch } from "react-redux";
import { setProfile as getReduxProfile } from "../../redux/reducers/profile";

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

function Profile({ token }) {
    const [selectedImage, setSelectedImage] = React.useState(null);
    const [profile, setProfile] = React.useState()
    const dispatch = useDispatch()

    React.useEffect(() => {
        const getProfile = async () => {
            const { data } = await http(token).get('/profile')
            setProfile(data.results)
            dispatch(getReduxProfile(data.results))
        }
        getProfile()
    }, [token, profile, dispatch])

    const handleSubmit = async (event) => {
        event.preventDefault();
        const formData = new FormData();
        formData.append('picture', selectedImage);
        const { data } = await http(token).patch('/profile', formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        })
        dispatch(getReduxProfile(data.results))
        setSelectedImage(null)
    };

    return (
        <div className='bg-[#E5E5E5]'>
            <Navbar token={token} />
            <div className='flex justify-center gap-8 my-20'>
                <div className='max-sm:hidden'>
                    <SideBar />
                </div>
                <div className='bg-white max-w-[850px] w-[850px] h-[678px] rounded-xl p-12'>
                    <div className='flex flex-col gap-6 items-center'>
                        <form onSubmit={handleSubmit} className='flex flex-col items-center gap-2'>
                            {profile?.picture ?
                                <Image priority={true} src={profile?.picture} alt='picture' width={120} height={120} className='rounded-xl' /> :
                                <Image priority={true} src={DefPic} alt='picture' className='w-24 h-24 rounded-full' />
                            }
                            <label className='flex items-center gap-2 cursor-pointer'>
                                <AiOutlineEdit />
                                <div className='max-w-[350px]'>Edit</div>
                                <input name='picture' onChange={(e) => setSelectedImage(e.target.files[0])} type="file" className='hidden' />
                            </label>
                            {selectedImage &&
                                <button type='submit' className='btn btn-primary'>Save</button>
                            }
                        </form>
                        <div className='text-center'>
                            <div className='font-bold text-xl'>{profile?.fullName}</div>
                            <div>{profile?.phones}</div>
                        </div>
                    </div>
                    <div className='mt-12 mb-12 flex flex-col gap-6 items-center'>
                        <Link href='/profile/personal-information' className='max-w-[430px] w-full h-[60px] bg-[#E5E8ED] rounded-xl flex items-center justify-between px-6'>
                            <div className='font-semibold'>Personal Information</div>
                            <AiOutlineArrowRight size={25} />
                        </Link>
                        <Link href='/profile/change-password' className='max-w-[430px] w-full h-[60px] bg-[#E5E8ED] rounded-xl flex items-center justify-between px-6'>
                            <div className='font-semibold'>Change Password</div>
                            <AiOutlineArrowRight size={25} />
                        </Link>
                        <Link href='/profile/change-pin' className='max-w-[430px] w-full h-[60px] bg-[#E5E8ED] rounded-xl flex items-center justify-between px-6'>
                            <div className='font-semibold'>Change Pin</div>
                            <AiOutlineArrowRight size={25} />
                        </Link>
                        <Link href='/auth/logout' className='max-w-[430px] w-full h-[60px] bg-[#E5E8ED] rounded-xl flex items-center justify-between px-6'>
                            <div className='font-semibold'>Logout</div>
                        </Link>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    )
}

export default Profile