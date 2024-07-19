"use client";
import React, { useEffect, useState } from 'react';
import Navbar from '../../components/Navbar';
import Cookies from 'js-cookie';
import axios from 'axios';

const Page = () => {
    const [name, setName] = useState("User");
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Fetch product data including current order status
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`${process.env.NEXT_PUBLIC_BASE_API_URL}/api/products`);
                if (response.status === 200) {
                    setProducts(response.data.data);
                } else {
                    setError("Error fetching data");
                }
            } catch (err) {
                setError("Error fetching data");
                console.error(err);
            } finally {
                setLoading(false);
            }
        };

        if (!Cookies.get('token')) {
            window.location.href = '/login';
            return;
        }

        if (Cookies.get('role') !== "User") {
            window.location.href = Cookies.get('role') === "Admin" ? `/admin` : "/login";
            return;
        }

        if (Cookies.get('name')) {
            setName(Cookies.get('name'));
        }

        fetchData();
    }, []);

    const handleClick = async (sku) => {
        try {
            const response = await axios.post(`${process.env.NEXT_PUBLIC_BASE_API_URL}/api/products/status`, { sku });
            if (response.status === 200) {
                setProducts(products.map(product =>
                    product.sku === sku ? { ...product, status: 'Ordered' } : product
                ));
            } else {
                console.error("Error updating order status:", response.status);
            }
        } catch (err) {
            console.error("Error updating order status:", err);
        }
    };

    if (loading) return <p>Loading...</p>;
    if (error) return <p>{error}</p>;

    return (
        <>
            <Navbar />
            <div className='pl-[200px] p-4'>
                <div>
                    <div className='p-4'>
                        <h1 className='text-2xl text-gray-600 font-semibold'>Welcome back, {name}</h1>
                    </div>
                    <div className='p-4'>
                        <h2 className='text-xl text-gray-600 font-semibold'>All Products</h2>
                        <div className='flex flex-wrap gap-4'>
                            {products.length > 0 ? products.map((item) => (
                                <div key={item.sku} className='border p-4 rounded'>
                                    <h3 className='text-lg font-semibold'>{item.name}</h3>
                                    <p>{item.description}</p>
                                    <p>Price: ${item.price}</p>
                                    <p>Category: {item.category}</p>
                                    <p>SKU: {item.sku}</p>
                                    <button
                                        onClick={() => handleClick(item.sku)}
                                        disabled={item.status !== "Not Ordered"}
                                    >
                                        {item.status === 'Not Ordered' ? 'Order Now' : `${item.status}`}
                                    </button>
                                </div>
                            )) : <p>No products available.</p>}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Page;
