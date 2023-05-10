import React from "react";
import logo from "../logo.svg";

function Home() {
  return (
    <div className="flex mt-5">
      <img className="h-48" src={logo} alt="logo" />
      <div className="h-48 flex justify-center items-center">
        <p className="text-2xl font-medium"> Welcome to the home page</p>
      </div>
    </div>
  );
}

export default Home;
