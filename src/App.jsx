import React from "react";
import Home from "./components/Home";
import {Link, Route, Routes } from "react-router-dom";
import Details from "./components/Details";
import Create from "./components/Create";

function App() {
  return (
    <div className="w-screen h-screen flex">
      <Link to="/" className="absolute px-3 py-1 border border-black rounded-lg left-[20%] top-[2%]">HOME</Link>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/create" element={<Create />} />
        <Route path="/details/:id" element={<Details />} />
      </Routes>
    </div>
  );
}

export default App;
