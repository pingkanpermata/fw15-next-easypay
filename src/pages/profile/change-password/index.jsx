import React from "react";
import { AiOutlineEyeInvisible, AiOutlineEye } from 'react-icons/ai';
import { HiOutlineLockClosed } from 'react-icons/hi';
import http from "../../../helpers/http";
import cookieConfig from "../../../helpers/cookieConfig";
import { withIronSessionSsr } from "iron-session/next";
import checkCredentials from "../../../helpers/checkCredentials";
import Navbar from "../../../components/Navbar";
import SideBar from '../../../components/SideBar';
import Footer from "../../../components/Footer";

export const getServerSideProps = withIronSessionSsr(
    async function getServerSideProps({ req, res }) {
        const token = req.session?.token
        checkCredentials(token, res, '/auth/login')
        const { data } = await http(token).get('/profile')
        return {
            props: {
                token,
                user: data.results,
            },
        };
    },
    cookieConfig
);

function ChangePassword({ token, user }) {
    const [loading, setLoading] = React.useState(false)
    const [errorMessage, setErrorMessage] = React.useState('')
    const [successMessage, setSuccessMessage] = React.useState('')

    const doChangePassword = async (event) => {
        setErrorMessage('')
        try {
            console.log('masuk')
            // setLoading(true)
            event.preventDefault()
            const { value: oldPassword } = event.target.oldPassword
            const { value: newPassword } = event.target.newPassword
            const { value: confirmPassword } = event.target.confirmPassword
            console.log(oldPassword, newPassword, confirmPassword)
            if (newPassword !== confirmPassword) {
                setErrorMessage('Password and Confirm Password do not match')
                setLoading(false)
                return
            }
            const body = new URLSearchParams({ oldPassword, newPassword, confirmPassword }).toString()
            console.log(body)
            const { data } = await http(token).patch('/profile/change-password', body)
            console.log(data)
            if (data) {
                setSuccessMessage("Successfully changed password")
                setLoading(false)
            }
        } catch (err) {
            console.log(err)
            const message = err?.response?.data?.message
            const results = err?.response?.data?.results
            console.log(message)
            console.log(results)
            if (message === "profile_change_password_wrong_old") {
                setErrorMessage('Old password is incorrect.')
            }
            setSuccessMessage('')
        }
    }

    const [showPassword, setShowPassword] = React.useState(false)
    const handleTogglePassword = () => {
        setShowPassword(!showPassword)
    }
    const [showPassword2, setShowPassword2] = React.useState(false)
    const handleTogglePassword2 = () => {
        setShowPassword2(!showPassword2)
    }
    const [showPassword3, setShowPassword3] = React.useState(false)
    const handleTogglePassword3 = () => {
        setShowPassword3(!showPassword3)
    }

    return (
        <div className='bg-[#E5E5E5]'>
            <Navbar token={token} />
            <div className='flex justify-center gap-8 my-20'>
                <SideBar />
                <div className='bg-white max-w-[850px] w-[850px] h-[678px] rounded-xl p-12'>
                    <div className='flex flex-col gap-6'>
                        <div className='font-bold text-2xl'>Change Password</div>
                        <div className='max-w-[350px]'>You must enter your current password and then type your new password twice.</div>
                    </div>
                    <div className='mt-32 mb-32 flex justify-center'>
                        <form onSubmit={doChangePassword} className='max-w-[500px] w-full flex flex-col gap-12'>
                            <div className='flex flex-col gap-4'>
                                <div className='flex items-center relative'>
                                    <div className='absolute px-4'>
                                        <HiOutlineLockClosed size={30} />
                                    </div>
                                    <input name='oldPassword' type={showPassword ? 'text' : 'password'} placeholder='Current password' className={`input input-bordered w-full pl-16`} />
                                    <div onClick={handleTogglePassword} className='absolute right-4'>
                                        {showPassword ?
                                            <AiOutlineEye size={25} /> :
                                            <AiOutlineEyeInvisible size={25} />
                                        }
                                    </div>
                                </div>
                                <div className='flex items-center relative'>
                                    <div className='absolute px-4'>
                                        <HiOutlineLockClosed size={30} />
                                    </div>
                                    <input name='newPassword' type={showPassword2 ? 'text' : 'password'} placeholder='New Password' className={`input input-bordered w-full pl-16`} />
                                    <div onClick={handleTogglePassword2} className='absolute right-4'>
                                        {showPassword2 ?
                                            <AiOutlineEye size={25} /> :
                                            <AiOutlineEyeInvisible size={25} />
                                        }
                                    </div>
                                </div>
                                <div className='flex items-center relative'>
                                    <div className='absolute px-4'>
                                        <HiOutlineLockClosed size={30} />
                                    </div>
                                    <input name='confirmPassword' type={showPassword3 ? 'text' : 'password'} placeholder='Repeat new password' className={`input input-bordered w-full pl-16`} />
                                    <div onClick={handleTogglePassword3} className='absolute right-4'>
                                        {showPassword3 ?
                                            <AiOutlineEye size={25} /> :
                                            <AiOutlineEyeInvisible size={25} />
                                        }
                                    </div>
                                </div>
                            </div>
                            <button className='bg-[#302b1e] hover:bg-[#857752] w-full rounded-xl h-[55px] text-white'>
                                <div>Change Password</div>
                            </button>
                        </form>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    )
}

export default ChangePassword