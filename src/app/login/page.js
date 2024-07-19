"use client"
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';

const Login = () => {
    const [email, setEmail] = useState('');
    const [PasswordType, setPasswordType] = useState(false);
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [role, setRole] = useState("");

    useEffect(() => {
        if (Cookies.get('token')) {
            if (Cookies.get("role") === "Admin") {
                window.location.href = "/admin";
            }
            if (Cookies.get("role") === "User") {
                window.location.href = "/user";
            }
        }
    }, [])

    const handleLogin = async (e) => {
        e.preventDefault();
        if (!email || !password || !role) {
            alert("Fill all the columns");
        }
        setLoading(true);
        try {
            const data = await axios.post(`${process.env.NEXT_PUBLIC_BASE_API_URL}/api/users/login`, { email, password, role});
            if (data.status === 200) {
                const token = data.data.data.token;
                const role = data.data.data.role;
                const email = data.data.data.email;
                const name = data.data.data.name;
                Cookies.set('token', token, { expires: 7 });
                Cookies.set('role', role, { expires: 7 });
                Cookies.set('name', name, { expires: 7 });
                Cookies.set('email', email, { expires: 7 });
                if (role === "Admin") {
                    window.location.href = "/admin";
                }
                if (role === "User") {
                    window.location.href = "/users";
                }
            }
            else{
                alert(data.status);
            }
        } catch (error) {
            console.error('Error signing up:', error);
            alert('Invalid login credentials');
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <title>Admin Login</title>
            <div className='min-h-screen flex flex-col justify-center items-center'>
                <div className='w-[500px] md:w-[500px] lg:w-[500px] h-[500px] bg-gray-200 rounded-3xl p-4 mx-auto my-auto shadow-lg'>
                    <div className={'w-full flex flex-col justify-center'}>
                        <h1 className='text-4xl md:text-5xl flex items-center justify-center lg:text-5xl font-semibold px-4 lg:mr-4 pt-2'>Login Page</h1>
                        <form method='post' action="" className='flex flex-col justify-center p-4 pt-6 mt-5 gap-5'>
                            <div className=' flex flex-col justify-center gap-5'>
                                <input className='p-2 rounded shadow-lg focus:outline-none' type="email" name='email' placeholder='Email' onChange={(e) => setEmail(e.target.value)} />
                                <input className='p-2 rounded shadow-lg focus:outline-none' type="password" name='password' placeholder='Password' onChange={(e) => setPassword(e.target.value)} />
                                <select className='p-2 rounded-lg' onChange={e => setRole(e.target.value)}>
                                    <option value="none">-NONE-</option>
                                    <option value="Admin">Admin</option>
                                    <option value="User">User</option>
                                </select>
                            </div>
                            <button onClick={handleLogin} className='p-4 flex flex-col items-center bg-green-700 text-xl text-white border border-green-700 rounded-xl pt-auto'>{loading ? 'Loading...' : 'Login'}
                            </button>
                            <div className='flex justify-center items-center gap-2 md:text-xl lg:text-xl'><p
                                className='text-gray-500'>--------</p>
                                <h3 className='text-center text-gray-500'>OR</h3>
                                <p className='text-gray-500'> --------</p>
                            </div>
                        </form>
                        <div className='flex justify-center items-center gap-4'>
                            <button onClick={() => {
                                window.location.assign('register')
                            }} className='bg-green-600 text-white text-xl border-green-600 rounded-md p-4'>Register
                                Yourself
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Login;
