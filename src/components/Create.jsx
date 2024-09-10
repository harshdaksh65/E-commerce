import React, { useContext, useState } from "react";
import { Productcontext } from "../utils/Context";
import { nanoid } from "nanoid";
import Home from "./Home";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
function Create() {
  const [Product, setProducts] = useContext(Productcontext);
  const [title, settitle] = useState("");
  const [price, setprice] = useState("");
  const [image, setimage] = useState("");
  const [description, setdescription] = useState("");
  const [category, setcategory] = useState("");
  const navigate = useNavigate();

  const submithandler = (e) => {
    e.preventDefault();

    if (
      title.trim().length < 5 ||
      price.trim().length < 1 ||
      image.trim().length < 5 ||
      description.trim().length < 5 ||
      category.trim().length < 5
    ) {
      alert("All fields must be filled and have a minimum length of 5");
      return;
    }

    const product = {
      id: nanoid(),
      title,
      price,
      image,
      description,
      category,
    };

    setProducts([...Product, product]);
    localStorage.setItem("product", JSON.stringify([...Product, product]));
    toast.success("Added Successfully");
    navigate("/");
  };

  return (
    <form onSubmit={submithandler} className="p-[5%] w-screen h-screen">
      <div className="w-[80%] m-auto">
        <h1 className="text-3xl font-bold mb-3 ">ADD PRODUCTS</h1>
        <hr className="mb-3" />
        <input
          type="text"
          name="title"
          placeholder="Product Name"
          className="text-2xl px-3 py-1 w-full my-1 bg-zinc-200 rounded-lg block"
          onChange={(e) => settitle(e.target.value)}
          value={title}
        />
        <input
          type="text"
          name="category"
          placeholder="Category"
          className="text-2xl px-3 py-1 w-full my-1 bg-zinc-200 rounded-lg block"
          onChange={(e) => setcategory(e.target.value)}
          value={category}
        />
        <input
          type="text"
          placeholder="Price"
          name="price"
          className="text-2xl px-3 py-1 w-[49%] bg-zinc-200 rounded-lg my-1 "
          onChange={(e) => setprice(e.target.value)}
          value={price}
        />
        <input
          type="URL"
          placeholder="ImageURL"
          name="image"
          className="text-2xl px-3 py-1 w-[50%] bg-zinc-200 rounded-lg my-1 ml-2"
          onChange={(e) => setimage(e.target.value)}
          value={image}
        />
        <input
          type="textarea"
          placeholder="Description"
          name="description"
          className="text-2xl px-3 py-1 w-full bg-zinc-200 rounded-lg block my-1"
          onChange={(e) => setdescription(e.target.value)}
          value={description}
        />
        <button
          type="submit"
          className="text-1xl font-semibold shadow-xl px-3 py-1 bg-zinc-200 rounded-lg my-1">
          ADD
        </button>
      </div>
    </form>
  );
}

export default Create;
