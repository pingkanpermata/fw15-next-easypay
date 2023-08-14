import React from "react";
import Image from "next/image";
import Phone from '../../../../public/Group 10.svg';
import logo from '../../../../public/logo-easypay.png'
import {AiOutlineEyeInvisible, AiOutlineEye, AiOutlineUser, AiOutlineMail, AiOutlineLock} from 'react-icons/ai';
import Link from "next/link";
import Head from "next/head";
import { useRouter } from "next/router";
import http from "../../../helpers/http";
import {saveEmail} from "../../../redux/reducers/auth";
import { useDispatch } from "react-redux";

function Register() {
    const dispatch = useDispatch()
    const router = useRouter()
    const [errorMessage, setErrorMessage] = React.useState('')
    const [successMessage, setSuccessMessage] = React.useState('')
    const [showPassword, setShowPassword] = React.useState(false)
    const [loading, setLoading] = React.useState(false)

    const handleTogglePassword = () => {
        setShowPassword(!showPassword)
    }

    const doRegister = async (event) => {
        try{
            setLoading(true)
            event.preventDefault()
            const {value: username} = event.target.username
            const {value: email} = event.target.email
            const {value: password} = event.target.password
            setSuccessMessage('')
            
            if(!username || username.length < 6){
                setErrorMessage('username must be at least 10 characters long')
                return
            }
            if(!email || !email.includes('@')){
                setErrorMessage('Invalid email')
                return
            }
            const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]).{8,}$/;
            if (!password || !passwordRegex.test(password)) {
                setErrorMessage('Password must contain at least 8 characters, including 1 uppercase letter, 1 lowercase letter, 1 number, and 1 symbol')
                return
            }
            const body = new URLSearchParams({username, email, password}).toString()
            console.log(body)
            const {data} = await http().post('/auth/register', body)
            console.log(data)
            setSuccessMessage(data.message)
            setErrorMessage('')
            dispatch(saveEmail(email))
            router.push('/auth/set-pin')
        }catch(err){
            const message = err?.response?.data?.message
            if(message){
                setErrorMessage(message)
            }
            setSuccessMessage('')
        }finally{
            setLoading(false)
        }
    }

    return (
        <>
        <Head>
            <title>EasyPay || Register</title>
        </Head>
        <div className='flex'>
            <div className='w-[55%] max-sm:hidden h-screen bg-[#857752] relative'>
                <div className='absolute left-[15%] max-md:left-[5%] top-10 text-white'>
                    <Image className='h-[100px] max-xl:h-[100px] w-[150px]' src={logo} alt="logo" />
                    <Image className='h-[400px] max-xl:h-[200px] w-[500px]' src={Phone} alt='phone' />
                    <div className='grid gap-4 relative top-[30px] w-full'>
                        <div className='font-semibold text-xl'>App that Covering Banking Needs.</div>
                        <div className='text-sm font-extralight'>EasyPay is an application that focussing in banking needs for all users in the world. Always updated and always following world trends. 5000+ users registered in EasyPay everyday with worldwide users coverage.</div>
                    </div>
                </div>
            </div>
            <div className='w-[45%] max-sm:w-[90%] max-sm:ml-4 max-sm:mt-12 h-screen max-sm:h-[500px]'>
                <div className='w-[85%] max-lg:w-[90%] grid left-12 max-lg:left-2 relative top-4 max-md:top-0 gap-4'>
                    <div className='w-[90%] max-sm:hidden text-[#302b1e] font-bold text-2xl leading-relaxed max-md:text-xl'>Start Accessing Banking Needs With All Devices and All Platforms With 30.000+ Users</div>
                    <div className='w-[90%] sm:hidden font-bold text-2xl leading-relaxed'>Sign Up</div>
                    <div className='w-full max-sm:hidden text-[#dac387] leading-8 text-base'>Transfering money is eassier than ever, you can access EasyPay wherever you are. Desktop, laptop, mobile phone? we cover all of that for you!</div>
                    <div className='w-full sm:hidden text-slate-400 leading-8 text-base'>Create your account to access EasyPay.</div>
                    {errorMessage && (
                    <div>
                        <h1 className="alert alert-error max-w-[400px]">{errorMessage}</h1>
                    </div>
                    )}
                    {successMessage && (
                    <div>
                        <h1 className="alert alert-success max-w-[400px]">{successMessage}</h1>
                    </div>
                    )}
                    <form onSubmit={doRegister} className='grid gap-10 relative top-4'>
                        <div className='grid gap-1'>
                            <div className='flex gap-4'>
                                <AiOutlineUser size={20} className='text-[#857752]'/>
                                <input name='username' type='text' placeholder='Enter your username' className='border-none pl-4 tracking-wider w-full border-slate-400'/>
                            </div>
                            <hr className='h-0.5 bg-slate-300' />
                        </div>
                        <div className='grid gap-1'>
                            <div className='flex gap-4'>
                                <AiOutlineMail size={20} className='text-[#857752]'/>
                                <input name='email' type='email' placeholder='Enter your e-mail' className='border-none pl-4 tracking-wider w-full border-slate-400'/>
                            </div>
                            <hr className='h-0.5 bg-slate-300' />
                        </div>
                        <div className='grid gap-1'>
                            <div className='flex gap-4'>
                                <AiOutlineLock size={20} className='text-[#857752]'/>
                                <input name='password' type={showPassword ? 'text' : 'password'} placeholder='Create your password' className='border-none pl-4 tracking-wider w-full border-slate-400'/>
                                <div className='absolute right-6' onClick={handleTogglePassword}>
                                    {showPassword ?
                                        <AiOutlineEye size={25} /> :
                                        <AiOutlineEyeInvisible size={25}/>
                                    }
                                </div>
                            </div>
                            <hr className='h-0.5 bg-slate-300' />
                        </div>
                        <div className='grid gap-4'>
                            <button disabled={loading} type='submit' className='btn bg-[#302b1e] hover:bg-[#857752] w-full tracking-wider'>Sign Up</button>
                            <div className='place-self-center tracking-wider text-slate-500'>Already have an account?<Link href='/auth/login' className='text-blue-500 font-semibold'> Let’s Login</Link></div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
        </>
    )
}

export default Register