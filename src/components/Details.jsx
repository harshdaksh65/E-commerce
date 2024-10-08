import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Productcontext } from "../utils/Context";
import axios from "../utils/axios";
import Loading from "./Loading";
import { toast } from "react-toastify";

function Details() {
  const navigate = useNavigate();
  const [Product, setProducts] = useContext(Productcontext);
  const [product, setproduct] = useState(null);

  const { id } = useParams();

  const getproduct = async()=>{
    try{
      const {data} = await axios(`/products/${id}`)
      setproduct(data);
    }
    catch(error){
      console.error(error)
    }
  }

  useEffect(() => {
    if (!product) {
      setproduct(Product.filter((p) => p.id == id)[0]);
    }
    getproduct();
  }, []);

  const deletehandler = (id) => {
    const filterdproduct = Product.filter((p) => p.id !== id);
    setProducts(filterdproduct);
    localStorage.setItem("product", JSON.stringify(filterdproduct));
    toast.success("Delete product successfully")
    navigate("/");
  };

  return product ? (
    <div className="w-[80%]  h-screen m-auto flex flex-col gap-4 justify-center items-center lg:flex-row ">
      <div
        className="w-72 h-80 bg-contain bg-center bg-no-repeat"
        style={{ backgroundImage: `URL(${product.image})` }}></div>
      <div className="h-60 w-80 items-center">
        <h1 className="text-2xl font-bold ">{product.title}</h1>
        <h1 className="opacity-30 font-bold text-md mb-3">
          {product.category}
        </h1>
        <h1 className="font-semibold mb-3">${product.price}</h1>
        <p className="mb-4">{product.description}</p>
        <button className="px-3 py-1 mr-2 border border-blue-500 text-blue-600 shadow-lg">
          Edit
        </button>
        <button
          onClick={() => deletehandler(product.id)}
          className="px-3 py-1 border border-red-500 text-red-600 shadow-lg">
          Delete
        </button>
      </div>
    </div>
  ) : (
    <Loading />
  );
}

export default Details;
