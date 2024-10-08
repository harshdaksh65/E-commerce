import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { Productcontext } from "../utils/Context";

function Nav() {
  const [products] = useContext(Productcontext);

  let distinct_category =
    products && products.reduce((acc, cv) => [...acc, cv.category], []);
  distinct_category = [...new Set(distinct_category)];

  const color = () => {
    return `rgba(${(Math.random() * 255).toFixed()},${(
      Math.random() * 255
    ).toFixed()},${(Math.random() * 255).toFixed()},0.5)`;
  };

  return (
    <>
    <div className="hidden lg:flex w-[15%] h-full bg-zinc-100 flex-col items-center pt-5">
      <nav>
        <a
          className="px-3 py-1 border rounded-lg border-blue-500 text-blue-600 shadow-xl"
          href="/create">
          ADD PRODUCTS
        </a>
        <hr className="w-full mt-3 " />
        <h1 className="text-xl font-semibold w-full m-auto my-2">Category</h1>
        <div className="">
          {distinct_category.map((c, i) => {
            return (
              <Link
                to={`/?category=${c}`}
                key={i}
                className="flex items-center gap-2 mb-2 ">
                <span
                  style={{ backgroundColor: color() }}
                  className="w-[15px] h-[15px] rounded-full"></span>
                {c}
              </Link>
            );
          })}
        </div>
      </nav>
    </div>
    </>
    
  );
}

export default Nav;
