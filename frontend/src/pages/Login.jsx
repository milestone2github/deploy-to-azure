import React, { useEffect } from 'react'
import { SiZoho } from "react-icons/si";
// import login from '../assets/illustration.png'
import toast, { Toaster } from 'react-hot-toast';
// import logo from '../assets/mNiveshLogo.png';

const Login = () => {
    useEffect(() => {
        const searchParams = new URLSearchParams(window.location.search);

        const error = searchParams.get('error');
        if(error === 'permissionDenied') {
            toast.error('Access not allowed')
        }
        else if(error === 'InternalServerError') { toast.error("Login failed: Internal server error") }
        else if(error) { toast.error("Login Failed") }

    }, []);

    const handleLoginWithZoho = () => {
        const frontendRedirectUrl = encodeURIComponent(window.location.origin);
        window.location.href = `${import.meta.env.VITE_API_BASE_URL}/auth/zoho?redirect=${frontendRedirectUrl}`
    }

    return (
        <section className=' fixed w-full h-full left-0 z-50 flex justify-center items-center bg-white'>
            <div className='login flex mx-12 py-12 sm:py-0 lg:mx-[17rem]'>
                <div className=' login-page w-full sm:px-3  sm:w-[50%] flex flex-col justify-center items-center'>
                    <h1 className='  text-center text-[28.8px] lg:text-4xl'>Welcome to NiveshOnline</h1>
                    <button onClick={handleLoginWithZoho} className='  text-[24px] flex items-center gap-3 py-1 hover:bg-[#DD5709] hover:text-white px-2 mt-5 text-[#DD5709] border-[1px] border-solid border-[#DD5709] rounded-md'><SiZoho className=' text-4xl' />Login with Zoho</button>
                </div>
                <div className="hidden px-4  login-img sm:flex items-center justify-center bg-blue-800 w-[50%]">
                    {/* <img src={login} alt="" /> */}
                </div>
            </div>
            {/* <img src={logo} alt="" className=' absolute top-4 right-4 w-44'/> */}
            <Toaster />
        </section>
    )
}

export default Login