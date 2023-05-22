import React from "react";
import logo from "./logo.svg";
import { Link } from "raviger";

function Header() {
  return (
    <div className="flex gap-2 justify-start items-center">
      <img
        src={logo}
        style={{ animation: "spin 2s linear infinite" }}
        className=" w-16 h-16"
        alt="logo"
      />
      <div className="flex w-full">
        <Link href="/" className="text-center text-xl font-medium flex-1">
          Home
        </Link>
        <Link href="/about" className="text-center text-xl font-medium flex-1">
          About
        </Link>
      </div>
    </div>
  );
}

export default Header;
