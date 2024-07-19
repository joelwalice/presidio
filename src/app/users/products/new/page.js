"use client"
import React, { useEffect, useState } from "react";
import Navbar from '../../../../components/Navbar';
import axios from "axios";


const NewProduct = () => {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [image, setImage] = useState("");
  const [category, setCategory] = useState("");
  const [sku, setSku] = useState("");
  const [incoming, setIncoming] = useState("");
  const [stock, setStock] = useState("");

  const createP = async (e) => {
    e.preventDefault();
    console.log(typeof incoming);
    try {
      const response = await axios.post(`${process.env.NEXT_PUBLIC_BASE_API_URL}/api/products`, {
          image,
          name,
          category,
          sku,
          incoming,
          stock,
          price,
        })
  
      const data = await response.json();
  
      if (response.status === 200) {
        console.log("Done");
        window.location.href = "/admin/products";
      } else {
        console.error("Error adding product:", data.message);
      }
    } catch (err) {
      console.error("Error adding product:", err);
    }
  };
  

  return (
    <div>
        <Navbar />
      <div className='pl-[200px] p-4'>
        <form className="flex flex-col p-4 gap-4 text-gray-500">
          <h1 className="text-4xl font-semibold text-center text-black">
            New Product
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
                style={{accentColor : "green"}}
                value="Mobiles"
                checked={category === "Mobiles"}
                onChange={(ev) => setCategory(ev.target.value)}
              />
              {" "}Mobiles
            </label>
            <label className="">
            <input
                type="radio"
                name="category"
                style={{accentColor : "green"}}
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
                style={{accentColor : "green"}}
                value="Groceries"
                checked={category === "Groceries"}
                onChange={(ev) => setCategory(ev.target.value)}
              />
              {" "}Groceries
            </label>
            <label className="">
              <input
                type="radio"
                name="category"
                style={{accentColor : "green"}}
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
            onChange={(ev) => setSku(ev.target.value)}
            className=" flex flex-col justify-center items-center p-2 border border-black rounded-md"
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
            <input accept="image/*" type="file" />
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

export default NewProduct;
