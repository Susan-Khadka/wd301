import React from "react";
import logo from "./logo.svg";

function Header(props: {title: string}) {
  const spinStyle = {
    animation: "spin 2s linear infinite",
  };
  return (
    <div className="flex gap-2 justify-center items-center">
      <img src={logo} style={spinStyle} className=" w-16 h-16" alt="logo" />
      <h1 className="text-center text-xl flex-1">
        {props.title}
      </h1>
    </div>
  );
}

export default Header;
