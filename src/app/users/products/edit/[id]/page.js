"use client"
import React, { useEffect, useState } from "react";
import Navbar from "../../../../../components/Navbar";
import { useParams } from "next/navigation";
import axios from "axios";

const EditProduct = () => {
    const [name, setName] = useState("");
    const [price, setPrice] = useState("");
    const [sku, setSku] = useState("");
    const [incoming, setIncoming] = useState("");
    const [stock, setStock] = useState("");
    const [product, setProduct] = useState(false);
    const { id } = useParams();
    const [category, setCategory] = useState("");
    const [image, setImage] = useState("");


    useEffect(() => {
        if (!id) {
            setProduct(true);
            return product;
        } else {
            const fetchData = async () => {
                try {
                    const response = await axios.get(`${process.env.NEXT_PUBLIC_BASE_API_URL}/api/products/${sku}`);
                    if (response.status === 200) {
                        const data = response.data;
                        console.log(data);
                        const datas = data.data[0]
                        setName(datas.name);
                        setCategory(datas.category);
                        setPrice(datas.price);
                        setSku(datas.sku);
                        setImage(datas.image);
                    } else {
                        console.log("Error fetching data:", response.status);
                    }
                } catch (error) {
                    console.error("Error fetching data:", error);
                }
            };
    
            fetchData();
        }
    }, []);    

    const createP = async (e) => {
        e.preventDefault(e);
        if (name === "" || price === "") {
            alert("Please fill all the fields");
            return;
        }
        
        const response = await axios.put(`${process.env.NEXT_PUBLIC_BASE_API_URL}/api/products/${sku}`, {
                image,
                name,
                category,
                sku,
                price,
            })
        if (response.status === 200) {
            window.location.href = "/admin/products";
        }
    };

    return (
        <div>
            <Navbar />
            <div className='pl-[200px] p-4'>
                <form className="flex flex-col p-4 gap-4 text-gray-500">
                    <h1 className="text-4xl font-semibold text-center text-black">
                        Edit Product
                    </h1>
                    <label className="text-xl font-semibold text-black">Product Name</label>
                    <input
                        type="text"
                        placeholder="Product Name"
                        required
                        value={name}
                        onChange={(ev) => setName(ev.target.value)}
                        className=" flex flex-col justify-center items-center p-2 border border-black rounded-md"
                    />
                    <label className="text-xl font-semibold text-black">Product Category</label>
                    <div className="rounded-lg flex items-center gap-4">
                        <label className="">
                            <input
                                type="radio"
                                name="category"
                                style={{ accentColor: "green" }}
                                value="Mobiles"
                                checked={category === "Mobiles"}
                                onChange={(ev) => setCategory(ev.target.value)}
                            />
                            {" "}Mobiles
                        </label>
                        <label className="">
                            <input
                                type="radio"
                                style={{ accentColor: "green" }}
                                name="category"
                                value="Laptop"
                                checked={category === "Laptop"}
                                onChange={(ev) => setCategory(ev.target.value)}
                            />
                            {" "}Laptop
                        </label>
                        <label className="">
                            <input
                                type="radio"
                                name="category"
                                style={{ accentColor: "green" }}
                                value="Groceries"
                                checked={category === "Groceries"}
                                onChange={(ev) => setCategory(ev.target.value)}
                            />
                            {" "}Groceries
                        </label>
                        <label className="">
                            <input
                                type="radio"
                                style={{ accentColor: "green" }}
                                name="category"
                                value="Tablets"
                                checked={category === "Tablets"}
                                onChange={(ev) => setCategory(ev.target.value)}
                            />
                            {" "}Tablets
                        </label>
                    </div>
                    <label className="text-xl font-semibold text-black">Product SKU</label>
                    <input
                        type="text"
                        placeholder="Product SKU"
                        required
                        value={sku}
                        className=" flex flex-col justify-center items-center p-2 border border-black rounded-md" disabled
                    />
                    <label className="text-xl font-semibold text-black">Product Image</label>
                    <div className="flex flex-col justify-center ">
                        <div className="rounded-xl">
                            {image === "" || image == null ? (
                                ""
                            ) : (
                                <img
                                    src={image}
                                    width={200}
                                    height={200}
                                    className="rounded-xl mb-4"
                                />
                            )}
                        </div>
                        <input accept="image/*" type="file" onChange={(e) => setImage(e.target.files[0])}/>
                    </div>
                    <label className="text-xl font-semibold text-black">Product Price</label>
                    <input
                        type="text"
                        placeholder="Price"
                        required
                        value={price}
                        onChange={(ev) => setPrice(ev.target.value)}
                        className=" flex flex-col justify-center items-center p-4 border border-black rounded-md"
                    />
                    <div>
                        <button
                            onClick={createP}
                            className="rounded-xl p-4 bg-green-700 border-green-700 text-white font-semibold"
                        >
                            Submit
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default EditProduct;
