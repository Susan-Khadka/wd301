import React from "react";
import Header from "../Header";
import { User } from "../types/userTypes";

function AppContainer(props: { children: React.ReactNode; currentUser: User }) {
  return (
    <div className="flex py-5 items-center justify-center">
      <div className="md:w-1/2 w-fit p-4 mx-auto bg-white shadow-lg rounded-xl overflow-auto">
        <Header currentUser={props.currentUser} />
        {props.children}
      </div>
    </div>
  );
}

export default AppContainer;
