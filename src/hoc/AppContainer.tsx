import React from "react";
import Header from "../Header";
import { User } from "../types/userTypes";

function AppContainer(props: { children: React.ReactNode; currentUser: User }) {
  return (
    <div className="flex h-screen py-5 bg-gray-100 items-center justify-center">
      <div className="w-1/3 p-4 mx-auto bg-white shadow-lg rounded-xl overflow-auto">
        <Header currentUser={props.currentUser} />
        {props.children}
      </div>
    </div>
  );
}

export default AppContainer;
