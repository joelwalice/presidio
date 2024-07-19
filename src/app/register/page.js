"use client"
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';

const Login = () => {
    const [email, setEmail] = useState('');
    const [name, setName] = useState(false);
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [role, setRole] = useState("");

    useEffect(() => {
        if (Cookies.get('token')) {
            if (Cookies.get("role") === "Admin") {
                window.location.href = "/admin/";
            }
            if (Cookies.get("role") === "User") {
                window.location.href = "/user/";
            }
        }
    }, [])

    const handleRegister = async () => {
        if (!email || !password || !name || !role || role === "none") {
            alert("Fill all the columns");
        }
        if (password.length < 8) {
            alert("Password must be at least 8 characters long");
            return;
        }
        const data = await axios.post('http://localhost:3000/api/users',{ name, email, password, role })
        
        console.log(data);
        if (data.status === 200) {
            window.location.href = "/login";
        }
        else {
            alert(response.message);
        }
    };

    return (
        <>
            <title>Admin Login</title>
            <div className='min-h-screen flex flex-col justify-center items-center'>
                <div className='w-[500px] md:w-[500px] lg:w-[500px] h-[500px] bg-gray-200 rounded-3xl p-4 mx-auto my-auto shadow-lg'>
                    <div className={'w-full flex flex-col justify-center'}>
                        <h1 className='text-4xl md:text-5xl flex items-center justify-center lg:text-5xl font-semibold px-4 lg:mr-4 pt-2'>Register Page</h1>
                        <div className='flex flex-col justify-center p-4 pt-6 mt-5 gap-5'>
                            <div className=' flex flex-col justify-center gap-5'>
                                <input className='p-2 rounded shadow-lg focus:outline-none' type="text" name='name' placeholder='Name' onChange={(e) => setName(e.target.value)} />
                                <input className='p-2 rounded shadow-lg focus:outline-none' type="email" name='email' placeholder='Email' onChange={(e) => setEmail(e.target.value)} />
                                <input className='p-2 rounded shadow-lg focus:outline-none' type="password" name='password' placeholder='Password' onChange={(e) => setPassword(e.target.value)} />
                                <select className='p-2 rounded-lg' onChange={(e) => setRole(e.target.value)}>
                                    <option value="none">-NONE-</option>
                                    <option value="Admin">Admin</option>
                                    <option value="User">User</option>
                                </select>
                            </div>
                            <button onClick={handleRegister} className='p-4 flex flex-col items-center bg-green-700 text-xl text-white border border-green-700 rounded-xl pt-auto'>{loading ? 'Loading...' : 'Register'}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Login;
