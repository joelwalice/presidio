"use client"
import React, { useEffect, useState } from 'react'
import Navbar from '../../components/Navbar'
import Cookies from 'js-cookie'
import Link from 'next/link'
import axios from 'axios'

const page = () => {
    const [name, setName] = useState("Admin");
    const [total, setTotal] = useState(0);

    useEffect(() => {
        const getData = async () => {
            const response = await axios.get(`${process.env.NEXT_PUBLIC_BASE_API_URL}/api/products`);
            if (response.status === 200) {
                setTotal(response.data.data.length);
            } else {
                console.log("Error fetching data:", response.status);
            }
        }
        if (!Cookies.get('token')) {
            window.location.href = '/login';
        }
        if (!Cookies.get('role') === "Admin") {
            window.location.href = `/${Cookies.get('role')}`;
        }
        if (Cookies.get('name')) {
            setName(Cookies.get('name'));
        }
        getData();
    }, [])
    return (
        <>
            <Navbar />
            <div className='pl-[200px] p-4'>
                <div>
                    <div className='p-4'>
                        <h1 className='text-2xl text-gray-600 font-semibold'>Welcome back, {name}</h1>
                    </div>
                    <div className='p-4 flex items-center justify-between gap-4'>
                        <div className='w-1/3 bg-green-200 shadow-lg duration-500 hover:scale-105 hover:shadow-xl rounded-lg p-4 text-green-700'>
                            <Link href="/home/inventory"><div className='relative'>
                                <h1 className='absolute right-4 top-0 text-green-700 font-semibold'>See more {'>'}</h1>
                                <div className='flex flex-col m-2 p-2'>
                                    <div className='bg-green-700 flex items-center w-[45px] rounded-lg p-2'><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="white" class="w-7 h-7">
                                        <path stroke-linecap="round" stroke-linejoin="round" d="m20.25 7.5-.625 10.632a2.25 2.25 0 0 1-2.247 2.118H6.622a2.25 2.25 0 0 1-2.247-2.118L3.75 7.5M10 11.25h4M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125Z" />
                                    </svg>
                                    </div>
                                    <div className='flex flex-col mt-4'>
                                        <h1 className='font-semibold text-xl'>{total} Items</h1>
                                        <h1 className='font-semibold text-green-700'>Items Total</h1>
                                    </div>
                                </div>
                            </div></Link>
                        </div>

                        <div className='w-1/3 bg-orange-200 shadow-lg duration-500 hover:scale-105 hover:shadow-xl rounded-lg p-4 text-orange-700'>
                            <Link href="/home/inventory"><div className='relative'>
                                <h1 className='absolute right-4 top-0 text-orange-700 font-semibold'>See more {'>'}</h1>
                                <div className='flex flex-col m-2 p-2'>
                                    <div className='bg-orange-700 flex items-center w-[45px] rounded-lg p-2'>
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="white" class="w-7 h-7">
                                            <path stroke-linecap="round" stroke-linejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126ZM12 15.75h.007v.008H12v-.008Z" />
                                        </svg>
                                    </div>
                                    <div className='flex flex-col mt-4'>
                                        <h1 className='font-semibold text-xl'> Items</h1>
                                        <h1 className='font-semibold text-orange-700'>Items Threshold</h1>
                                    </div>
                                </div>
                            </div>
                            </Link>
                        </div>
                        <div className='w-1/3 bg-red-200 shadow-lg duration-500 hover:shadow-xl cursor-pointer hover:scale-105 rounded-lg p-4 text-red-700'>
                            <Link href="/home/inventory"><div className='relative'>
                                <h1 className='absolute right-4 top-0 text-red-700 font-semibold'>See more {'>'}</h1>
                                <div className='flex flex-col m-2 p-2'>
                                    <div className='bg-red-700 flex items-center w-[45px] rounded-lg p-2'>
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="white" class="w-7 h-7">
                                            <path stroke-linecap="round" stroke-linejoin="round" d="m9.75 9.75 4.5 4.5m0-4.5-4.5 4.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                                        </svg>
                                    </div>
                                    <div className='flex flex-col mt-4'>
                                        <h1 className='font-semibold text-xl'> Items</h1>
                                        <h1 className='font-semibold text-red-700'>Items Out of Stock</h1>
                                    </div>
                                </div>
                            </div></Link>
                        </div>
                    </div>
                    <div className='p-4'>
                        <h1 className='text-2xl text-gray-600 font-semibold'>Recently added Products</h1>
                    </div>
                </div>
            </div >
        </>
    )
}

export default page