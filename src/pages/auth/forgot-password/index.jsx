import React, { useState } from "react";
import Image from "next/image";
import { AiOutlineMail } from "react-icons/ai";
import Phone from '../../../../public/Group 10.svg';
import logo from '../../../../public/logo-easypay.png';
import Head from "next/head";
import { useRouter } from "next/router";
import http from "../../../helpers/http";

function ResetPassword() {
    const router = useRouter()
    const [errorMessage, setErrorMessage] = useState('')
    const [successMessage, setSuccessMessage] = useState('');
    const [loading, setLoading] = useState(false)
    const doForgotPassword = async (event) => {
        setErrorMessage('')
        try {
            setLoading(true)
            event.preventDefault()
            const { value: email } = event.target.email
            const body = new URLSearchParams({ email }).toString()
            console.log(body)
            const { data } = await http().post('/auth/forgot-password', body)
            console.log(data)
            if (data) {
                setSuccessMessage("Success, the code was sent to the email")
                router.push('/auth/reset-password')
                setLoading(false)
            }
        } catch (err) {
            if (err.response.data.message = "Invalid !") {
                setErrorMessage("Invalid !")
            }
            setSuccessMessage('')
        }
    }
    return (
        <>
            <Head>
                <title>EasyPay || Reset Password</title>
            </Head>
            <div className='flex'>
                <div className='w-[55%] max-sm:hidden h-screen bg-[#857752] relative'>
                    <div className='absolute left-[15%] max-md:left-[5%] top-12 text-white'>
                        <Image className='h-[100px] max-xl:h-[100px] w-[150px]' src={logo} alt="logo" />
                        <Image className='h-[400px] max-xl:h-[200px] w-[500px]' src={Phone} alt='phone' />
                        <div className='grid gap-4 relative top-[30px] w-full'>
                            <div className='font-semibold text-xl'>App that Covering Banking Needs.</div>
                            <div className='text-sm font-extralight'>EasyPay is an application that focussing in banking needs for all users in the world. Always updated and always following world trends. 5000+ users registered in EasyPay everyday with worldwide users coverage.</div>
                        </div>
                    </div>
                </div>
                <div className='w-[45%] max-sm:w-[90%] max-sm:ml-4 max-sm:mt-12 h-screen max-sm:h-[500px]'>
                    <div className='w-[85%] max-lg:w-[90%] grid left-12 max-lg:left-2 relative top-20 gap-7'>
                        <div className='w-[90%] font-bold text-2xl text-[#302b1e] leading-relaxed'>Did You Forgot Your Password?
                            Don’t Worry, You Can Reset Your
                            Password In a Minutes.</div>
                        <div className='w-full text-[#dac387] leading-8 text-base'>To reset your password, you must type your e-mail and we will send a link to your email and you will be directed to the reset password screens.</div>
                        {errorMessage &&
                            (<div>
                                <h1 className="alert alert-error w-[330px]">{errorMessage}</h1>
                            </div>)}
                        {successMessage &&
                            (<div>
                                <h1 className="alert alert-success w-[330px]">{successMessage}</h1>
                            </div>)}
                        <form onSubmit={doForgotPassword} className='grid gap-12 relative top-8'>
                            <div className='grid gap-1'>
                                <div className='flex gap-4'>
                                    <AiOutlineMail size={20} className='text-[#857752]' />
                                    <input name='email' type='email' placeholder='Enter your e-mail' className='border-none pl-4 tracking-wider w-full border-slate-400' />
                                </div>
                                <hr className='h-0.5 bg-slate-300' />
                            </div>
                            <div className='grid gap-4'>
                                <button disabled={loading} className='btn bg-[#302b1e] hover:bg-[#857752] w-full tracking-wider'>Confirm</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    )
}

export default ResetPassword