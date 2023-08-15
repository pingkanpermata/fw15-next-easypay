import React from "react";
import Link from "next/link";
import { withIronSessionSsr } from "iron-session/next";
import cookieConfig from "../../../helpers/cookieConfig";
import checkCredentials from "../../../helpers/checkCredentials";
import Navbar from "../../../components/Navbar";
import SideBar from "../../../components/SideBar";
import Footer from "../../../components/Footer";
import http from "../../../helpers/http";
import { Formik } from "formik";
import { useDispatch } from "react-redux";
import { setProfile as getReduxProfile } from "../../../redux/reducers/profile";

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

function PersonalInformation({ token }) {
    const [profile, setProfile] = React.useState()
    const dispatch = useDispatch()

    React.useEffect(() => {
        const getProfile = async () => {
            const { data } = await http(token).get('/profile')
            setProfile(data.results)
        }
        getProfile()
    }, [token, profile])

    const editProfile = async (values) => {
        const form = new FormData()
        Object.keys(values).forEach((key) => {
            form.append(key, values[key])
        })
        const { data } = await http(token).patch('/profile', form, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        })
        dispatch(getReduxProfile(data.results))
        setProfile(data.results)
    }

    return (
        <div className='bg-[#E5E5E5]'>
            <Navbar token={token} />
            <div className='flex justify-center gap-8 my-20'>
                <div className='max-sm:hidden'>
                    <SideBar />
                </div>
                <div className='bg-white max-w-[850px] w-[850px] h-[678px] rounded-xl p-12'>
                    <div className='flex flex-col gap-6'>
                        <div className='font-bold text-2xl'>Personal Information</div>
                        <div className='max-w-[350px]'>We got your personal information from the sign up proccess. If you want to make changes on your information, contact our support.</div>
                    </div>
                    <Formik
                        initialValues={{
                            fullName: profile?.fullName,
                            username: profile?.username,
                            email: profile?.email,
                        }}
                        onSubmit={editProfile}
                        enableReinitialize
                    >
                        {({ handleSubmit, handleChange, handleBlur, values }) => (
                            <form onSubmit={handleSubmit} className='mt-8 mb-12 w-full flex flex-col gap-6'>
                                <div className='flex flex-col gap-1'>
                                    <div>Full Name</div>
                                    <input name='fullName' type="text" placeholder='Full Name' className={`input input-bordered w-full`} onChange={handleChange} onBlur={handleBlur} value={values.fullName} />
                                </div>
                                <div className='flex flex-col gap-1'>
                                    <div>Username</div>
                                    <input name='username' type="text" placeholder='Username' className={`input input-bordered w-full`} onChange={handleChange} onBlur={handleBlur} value={values.username} />
                                </div>
                                <div className='flex flex-col gap-1'>
                                    <div>Verified E-mail</div>
                                    <input name='email' type="text" placeholder='Verified E-mail' className={`input input-bordered w-full`} onChange={handleChange} onBlur={handleBlur} value={values.email} />
                                </div>
                                <div className='flex flex-col gap-1'>
                                    <div>Phone Number</div>
                                    <div className='flex items-center relative'>
                                        <input name='phones' type="text" placeholder='Phone Number' className={`input input-bordered w-full`} onChange={handleChange} onBlur={handleBlur} value={values.phones} />
                                    </div>
                                </div>
                                <button type='submit' className='btn bg-[#302b1e] hover:bg-[#857752] max-w-[70px] self-end text-white'>Save</button>
                            </form>
                        )}
                    </Formik>
                </div>
            </div>
            <Footer />
        </div>
    )
}

export default PersonalInformation