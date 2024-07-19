"use client";
import React, { useEffect, useState } from 'react';
import Navbar from '../../components/clientNav';
import Cookies from 'js-cookie';
import axios from 'axios';

const Page = () => {
    const [name, setName] = useState("User");
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (!Cookies.get('token')) {
            window.location.href = "/login";
        }
        if (Cookies.get('role') !== "User") {
            window.location.href = "/login";
        }
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
        fetchData();
    }, []);

    const handleClick = async (sku,newStatus) => {
        try {
            const response = await axios.post(`${process.env.NEXT_PUBLIC_BASE_API_URL}/api/products/statusChange`, { sku, newStatus });
            if (response.status === 200) {
                const updatedProducts = products.map(product =>
                    product.sku === sku ? { ...product, status: newStatus } : product
                );
                setProducts(updatedProducts);
            } else {
                console.error('Failed to update product status');

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
                                        onClick={() => handleClick(item.sku, Ordered)}
                                        disabled={item.status !== "Not Ordered"}
                                        className={`p-2 rounded-md text-white ${item.status === 'Ordered' ? 'bg-green-700' : 'bg-gray-700'
                                            }`}
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
