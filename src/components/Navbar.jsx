import React from "react";
import Image from "next/image";
import DefPic from "../../public/defaultUser.png";
import logo from "../../public/logo-easypay.png";
import { AiOutlineBell } from "react-icons/ai";
import { useSelector } from "react-redux";

function Navbar({ token }) {
    const user = useSelector(state => state.profile.data)

    return (
        <div>
            <div className='w-full bg-[#857752] h-24 flex justify-between items-center px-24 max-sm:px-4'>
                <Image className='h-[100px] max-xl:h-[100px] w-[150px]' src={logo} alt="logo" />
                <div className='flex items-center gap-6'>
                    {user?.picture === null ?
                        <Image src={DefPic} className='rounded-full w-10 h-10' alt='avatar' /> :
                        <Image src={user?.picture} width={60} height={60} className='rounded-full w-12 h-12' alt='avatar' />
                    }
                    <div className='grid text-[#dac387] font-semibold'>
                        <div>{user?.username}</div>
                    </div>
                    <AiOutlineBell size={25} className="text-[#dac387]" />
                </div>
            </div>
        </div>
    )
}

export default Navbar