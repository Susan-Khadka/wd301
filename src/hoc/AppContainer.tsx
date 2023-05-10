import React from "react";

function AppContainer(props: { children: React.ReactNode }) {
  return (
    <div className="flex h-screen bg-gray-100 items-center justify-center">
      {props.children}
    </div>
  );
}

export default AppContainer;
