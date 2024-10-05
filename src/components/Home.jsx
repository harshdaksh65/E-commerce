import React, { useContext, useEffect, useState } from "react";
import Nav from "./Nav";
import { Link, useLocation } from "react-router-dom";
import { Productcontext } from "../utils/Context";
import Loading from "./Loading";
import axios from "../utils/axios";

const Home = () => {
  const [products] = useContext(Productcontext);
  const { search } = useLocation();
  const category = decodeURIComponent(search.split("=")[1]);
  console.log(category);

  const [filtered, setfiltered] = useState(null);

  const getproductcategory = async () => {
    try {
      const { data } = await axios.get(`/products/category/${category}`);
      setfiltered(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (!filtered || category == "undefined") setfiltered(products);
    if (category != "undefined") {
      // getproductcategory();
      setfiltered(products.filter((p)=> p.category == category));
    }
  }, [category, products]);

  return products ? (
    <>
      <Nav />
      <div className="w-[85%] mt-8 p-5 h-screen flex flex-wrap gap-5 overflow-x-hidden overflow-y-auto">
        {filtered &&
          filtered.map((p, i) => (
            <Link
              to={`/details/${p.id}`}
              key={i}
              className="w-44 h-60 bg-white p-2 shadow-lg hover:shadow-2xl rounded-lg overflow-hidden flex flex-col items-center">
              <div
                className="hover:scale-110 hover:ease-in-out w-full h-44 bg-contain bg-center bg-no-repeat"
                style={{ backgroundImage: `URL(${p.image})` }}></div>
              <h1 className="mt-2 text-ellipsis overflow-hidden font-semibold">
                {p.title}
              </h1>
            </Link>
          ))}
      </div>
    </>
  ) : (
    <Loading />
  );
};

export default Home;
