import React from "react";
import logo from "./logo.svg";
import { ActiveLink } from "raviger";

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
        <ActiveLink
          href="/"
          exactActiveClass="text-blue-800"
          className="text-center text-gray-700 text-xl font-medium flex-1"
        >
          Home
        </ActiveLink>
        <ActiveLink
          href="/about"
          exactActiveClass=" text-blue-800"
          className="text-center text-gray-700 text-xl font-medium flex-1"
        >
          About
        </ActiveLink>
      </div>
    </div>
  );
}

export default Header;
