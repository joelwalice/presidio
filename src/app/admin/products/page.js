"use client"
import React, { useEffect, useState, useCallback } from 'react'
import Link from 'next/link'
import Navbar from '../../../components/Navbar'
import axios from 'axios';

const Page = () => {
    const [selectAll, setSelectAll] = useState(false);
    const [no, setNo] = useState(0);
    const [products, setProducts] = useState([]);
    const [allProducts, setAllProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchValue, setSearchValue] = useState("");

    const handleSearch = useCallback((event) => {
        const searchValue = event.target.value;
        setSearchValue(searchValue);
        const filteredItems = allProducts.filter(item =>
            typeof item.name === 'string' && item.name.toUpperCase().includes(searchValue.toUpperCase())
        );
        setProducts(filteredItems);
    }, [allProducts]);

    function compare( a, b ) {
        if ( a.name < b.name ){
          return -1;
        }
        if ( a.last_nom > b.last_nom ){
          return 1;
        }
        return 0;
      }
    
      function compareDes(a, b) {
        if (a.name > b.name) {
            return -1;
        }
        if (a.name < b.name) {
            return 1;
        }
        return 0;
    }
    
      

    const changeStatus = async (sku, newStatus) => {
        try {
            const response = await axios.post(`${process.env.NEXT_PUBLIC_BASE_API_URL}/api/products/status`, { sku, status: newStatus });
            if (response.ok) {
                const updatedProducts = products.map(product =>
                    product.sku === sku ? { ...product, status: newStatus } : product
                );
                setProducts(updatedProducts);
            } else {
                console.error('Failed to update product status');
            }
        } catch (error) {
            console.error('Error updating product status:', error);
        }
    }

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_API_URL}/api/products`)
                const data = await response.json();
                setProducts(data.data);
                setAllProducts(data.data);
                setNo(data.data.length);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching data:', error);
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    return (
        <>
            <Navbar />
            {loading ? (
                <div className="flex pl-[200px] items-center p-4">
                    <div className="text-center text-gray-500">Loading...</div>
                </div>
            ) : (
                <div className='pl-[200px] p-4'>
                    <div className='flex items-center'>
                        <h1 className='text-2xl font-semibold p-2'>Inventory</h1>
                        <p className='text-gray-500'>({no} inventory)</p>
                    </div>
                    <div className='p-4 flex items-center justify-between'>
                        <div className='flex items-center gap-3'>
                            <div className="flex w-[250px] items-center justify-center border rounded-md px-1">
                                <div className="px-2">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
                                    </svg>
                                </div>
                                <input
                                    className=" bg-transparent p-2 w-full focus:outline-none"
                                    type="text"
                                    placeholder="Search for inventory"
                                    onChange={handleSearch}
                                />
                            </div>
                            <select className='p-2 border border-black font-semibold rounded-lg text-gray-500'>
                                <option>Filter</option>
                                <option onClick={() => products.sort(compare)}>A-Z</option>
                                <option onClick={() => products.sort(compareDes)}>Z-A</option>
                            </select>
                        </div>
                        <Link href="/admin/products/new">
                            <button className='rounded-md bg-green-600 border-0 shadow-lg p-2 text-white font-semibold flex items-center gap-2'>
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="white" className="w-4 h-4">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                                </svg>
                                New Product
                            </button>
                        </Link>
                    </div>

                    

                        {/* Table */ }
                        < div className="m-auto border rounded-lg text-gray-500">
                    <table className="w-full p-4">
                        <thead className="font-semibold border border-l-0 border-r-0 border-t-0">
                            <tr className='gap-2'>
                                <td className="text-md flex items-center gap-2 p-2">
                                    ITEMS
                                </td>
                                <td className="text-md p-2">
                                    CATEGORY
                                </td>
                                <td className="text-md p-2">
                                    SKU
                                </td>
                                <td className="text-md p-2">
                                    STATUS
                                </td>
                                <td className="text-md p-2">
                                    UNIT PRICE
                                </td>
                                <td className="text-md p-2">
                                    ACTION
                                </td>
                            </tr>
                        </thead>
                        <tbody className=''>
                            {products.length === 0 ? <></> : products.map((product) => (
                                <tr key={product._id} className="border border-l-0 border-r-0 border-t-0">
                                    <td className="text-sm md:text-md p-3 flex items-center gap-2">
                                        {product.name}
                                    </td>
                                    <td className="text-sm md:text-md p-3">
                                        {product.category}
                                    </td>
                                    <td className="text-sm md:text-md p-3">
                                        {product.sku}
                                    </td>
                                    <select onChange={(e) => changeStatus(product.sku, e.target.value)}>
                                        <option>{product.status}</option>
                                        <option value="Shipped">Shipped</option>
                                        <option value="Delivered">Delivered</option>
                                    </select>
                                    <td className="text-sm md:text-md p-3">
                                        {product.price}
                                    </td>
                                    <td className="text-sm md:text-md p-3 flex items-center gap-2">
                                        <Link
                                            href={`/admin/products/edit/${product.sku}`}
                                            type="button"
                                            className="p-1 rounded-lg border-green-700 bg-green-700 text-white text-sm flex items-center gap-2"
                                        >
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                                                <path strokeLinecap="round" strokeLinejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" />
                                            </svg>
                                        </Link>
                                        <Link
                                            href={`/home/product/delete/${product.sku}`}
                                            type="button"
                                            className="p-1 bg-red-700 text-white rounded-md border-red-700 text-sm flex items-center gap-2"
                                        >
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                                                <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                                            </svg>
                                        </Link>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    <div className='m-3 flex items-center justify-between'>
                        <div className='flex items-center gap-3'>
                            <select className='p-2 border border-black font-semibold rounded-lg'>
                                <option>Show 20 entries</option>
                            </select>
                            <p>1-20 of {no} results</p>
                        </div>
                        <div className='flex items-center gap-2'>
                            <button className='rounded-md shadow-lg p-2 border-gray-500 font-semibold flex items-center gap-2'>Previous</button>
                            <button className='rounded-md bg-green-600 border-0 shadow-lg p-2 text-white font-semibold flex items-center gap-2'>Next</button>
                        </div>
                    </div>
                </div>
                </div >
            )}
        </>
    )
}

export default Page;
