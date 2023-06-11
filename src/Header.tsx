import React from "react";
import logo from "./logo.svg";
import { ActiveLink } from "raviger";
import { User } from "./types/userTypes";

function Header(props: { currentUser: User }) {
  console.log(props.currentUser);
  return (
    <div className="flex items-center justify-start">
      <div>
        <img
          src={logo}
          style={{ animation: "spin 2s linear infinite" }}
          className="w-16 h-16"
          alt="logo"
        />
      </div>
      <div className="flex gap-5 pl-5">
        {[
          { url: "/", text: "HOME" },
          { url: "/about", text: "ABOUT" },
          props.currentUser?.username?.length > 0
            ? {
                onClick: () => {
                  localStorage.removeItem("token");
                  window.location.reload();
                },
                text: "LOGOUT",
              }
            : { url: "/login", text: "LOGIN" },
        ].map((link) => {
          return link.url ? (
            <ActiveLink
              key={link.url}
              href={link.url}
              exactActiveClass="text-blue-800"
              className="text-center text-gray-400 text-xl "
            >
              {link.text}
            </ActiveLink>
          ) : (
            <button
              key={link.text}
              className="text-gray-400 text-xl"
              onClick={link.onClick}
            >
              {link.text}
            </button>
          );
        })}
      </div>
    </div>
  );
}

export default Header;
