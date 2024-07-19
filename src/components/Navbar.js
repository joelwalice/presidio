"use client"
import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import Cookies from 'js-cookie';

const Page = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    useEffect(() => {
        if (!Cookies.get('role')) {
            window.location.href = "/login";
        }
        if (Cookies.get('name')) {
            setName(Cookies.get('name'));
        }
        if (Cookies.get('email')) {
            setEmail(Cookies.get('email'));
        }
    }, [])
    const [nav, setNav] = useState(false);
    const signOut = () => {
        Cookies.remove('isloggedIn');
        Cookies.remove('token');
        Cookies.remove('email');
        Cookies.remove('role');
        Cookies.remove('name');
        window.location.href = '/login';
    };
    return (
        <>
            {nav ? <div className='relative z-40'>
                <div className='flex flex-col absolute right-0 top-[70px] duration-500 bg-gray-100 shadow-lg text-gray-500 min-h-[200px] rounded-l-lg w-[170px] items-center justify-center'>
                    <h1 className='font-bold text-green-700 text-xl'>DETAILS</h1>
                    <div className='flex flex-col justify-center text-black p-4 gap-4'>
                        <h1 className='flex items-center gap-2 font-semibold'>
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-6 h-6">
                                <path fill-rule="evenodd" d="M18.685 19.097A9.723 9.723 0 0 0 21.75 12c0-5.385-4.365-9.75-9.75-9.75S2.25 6.615 2.25 12a9.723 9.723 0 0 0 3.065 7.097A9.716 9.716 0 0 0 12 21.75a9.716 9.716 0 0 0 6.685-2.653Zm-12.54-1.285A7.486 7.486 0 0 1 12 15a7.486 7.486 0 0 1 5.855 2.812A8.224 8.224 0 0 1 12 20.25a8.224 8.224 0 0 1-5.855-2.438ZM15.75 9a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0Z" clip-rule="evenodd" />
                            </svg>
                            {name}</h1>
                        <h1 className='text-[10px] flex items-center font-semibold'>{email}</h1>
                        <button onClick={signOut} className='bg-green-700 border-0 shadow-lg text-white rounded-md p-2'>
                            <h1 className='font-semibold'>Signout</h1>
                        </button>
                    </div>
                </div>

            </div> : <div className='relative'>
                <div className='flex flex-col fixed right-[-500px] top-[70px] duration-500 bg-gray-100 shadow-lg text-gray-500 min-h-[200px] rounded-lg w-[150px] items-center justify-center'>
                    <h1 className='font-bold text-green-700 text-xl'>DETAILS</h1>
                    <div className='flex flex-col justify-center text-black p-4 gap-4'>
                        <h1 className='flex items-center gap-2 font-semibold'>
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-6 h-6">
                                <path fill-rule="evenodd" d="M18.685 19.097A9.723 9.723 0 0 0 21.75 12c0-5.385-4.365-9.75-9.75-9.75S2.25 6.615 2.25 12a9.723 9.723 0 0 0 3.065 7.097A9.716 9.716 0 0 0 12 21.75a9.716 9.716 0 0 0 6.685-2.653Zm-12.54-1.285A7.486 7.486 0 0 1 12 15a7.486 7.486 0 0 1 5.855 2.812A8.224 8.224 0 0 1 12 20.25a8.224 8.224 0 0 1-5.855-2.438ZM15.75 9a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0Z" clip-rule="evenodd" />
                            </svg>
                            {name}</h1>
                        <h1 className='text-[10px] flex items-center font-semibold'>{email}</h1>
                        <button onClick={signOut} className='bg-green-700 border-0 shadow-lg text-white rounded-md p-2'>
                            <h1 className='font-semibold'>Signout</h1>
                        </button>
                    </div>
                </div>
            </div>}
            <nav className='w-screen flex items-center justify-end p-4 border text-gray-500 gap-2'>
                <button className='border-0'>

                    <div>
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="w-7 h-7">
                            <path fill-rule="evenodd" d="M10 2a6 6 0 0 0-6 6c0 1.887-.454 3.665-1.257 5.234a.75.75 0 0 0 .515 1.076 32.91 32.91 0 0 0 3.256.508 3.5 3.5 0 0 0 6.972 0 32.903 32.903 0 0 0 3.256-.508.75.75 0 0 0 .515-1.076A11.448 11.448 0 0 1 16 8a6 6 0 0 0-6-6ZM8.05 14.943a33.54 33.54 0 0 0 3.9 0 2 2 0 0 1-3.9 0Z" clip-rule="evenodd" />
                        </svg>
                    </div>
                </button>
                <button className='border-0'>
                    <div>
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="w-7 h-7">
                            <path d="M3 4a2 2 0 0 0-2 2v1.161l8.441 4.221a1.25 1.25 0 0 0 1.118 0L19 7.162V6a2 2 0 0 0-2-2H3Z" />
                            <path d="m19 8.839-7.77 3.885a2.75 2.75 0 0 1-2.46 0L1 8.839V14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V8.839Z" />
                        </svg>
                    </div>
                </button>
                <p className='text-gray-300'> | </p>
                <button className='border-0' onClick={() => setNav(!nav)}>
                    <div>
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="w-7 h-7">
                            <path fill-rule="evenodd" d="M18 10a8 8 0 1 1-16 0 8 8 0 0 1 16 0Zm-5.5-2.5a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0ZM10 12a5.99 5.99 0 0 0-4.793 2.39A6.483 6.483 0 0 0 10 16.5a6.483 6.483 0 0 0 4.793-2.11A5.99 5.99 0 0 0 10 12Z" clip-rule="evenodd" />
                        </svg>
                    </div>
                </button>
            </nav>
            <div className={"fixed top-0 left-0 w-[180px] flex flex-col bg-white h-screen border"}>
                <Link href="/admin" className="text-decoration-none">
                    <h2 className="text-2xl p-0 mx-0 lg:mx-2 p-3 mt-2 text-green-700 font-semibold">Inventory</h2>
                </Link>
                <nav>
                    <ul className="flex flex-col p-2 text-gray-500 font-semibold">
                        <Link href="/admin">
                            <li className="text-md flex cursor-pointer items-center gap-2 p-2 hover:text-green-800">
                                <div>
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="w-5 h-5">
                                        <path fill-rule="evenodd" d="M9.293 2.293a1 1 0 0 1 1.414 0l7 7A1 1 0 0 1 17 11h-1v6a1 1 0 0 1-1 1h-2a1 1 0 0 1-1-1v-3a1 1 0 0 0-1-1H9a1 1 0 0 0-1 1v3a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1v-6H3a1 1 0 0 1-.707-1.707l7-7Z" clip-rule="evenodd" />
                                    </svg>
                                </div>Dashboard
                            </li>
                        </Link>
                        <Link href="/admin/products">
                            <li className="text-md flex cursor-pointer items-center gap-2 p-2 hover:text-green-800">
                                <div>
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="w-5 h-5">
                                        <path d="M2 3a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1h16a1 1 0 0 0 1-1V4a1 1 0 0 0-1-1H2Z" />
                                        <path fill-rule="evenodd" d="M2 7.5h16l-.811 7.71a2 2 0 0 1-1.99 1.79H4.802a2 2 0 0 1-1.99-1.79L2 7.5ZM7 11a1 1 0 0 1 1-1h4a1 1 0 1 1 0 2H8a1 1 0 0 1-1-1Z" clip-rule="evenodd" />
                                    </svg>
                                </div>Products
                            </li>
                        </Link>
                    </ul>
                </nav>
            </div>

        </>
    )
}

export default Page