import React from "react";
import Header from "../Header";


function AppContainer(props: { children: React.ReactNode }) {
  return (
    <div className="flex h-screen bg-gray-100 items-center justify-center">
      <div className="w-1/3 p-4 mx-auto bg-white shadow-lg rounded-xl">
        <Header />
        {props.children}
      </div>
    </div>
  );
}

export default AppContainer;
