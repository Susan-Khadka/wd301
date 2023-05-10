// import logo from "./logo.svg";

import AppContainer from "./AppContainer";
import Header from "./Header";
import React from "react";

function App() {
  const formFields = [
    { id: 1, label: "First Name" },
    { id: 2, label: "Last Name" },
    { id: 3, label: "Email" },
  ];

  return (
    <AppContainer>
      <div className=" p-4 mx-auto bg-white shadow-lg rounded-xl">
        <Header title="Welcome to #react-with-typescript and tailwind" />
        {formFields.map((fields) => {
          return (
            <React.Fragment key={fields.id}>
              <label className="" htmlFor="">
                {fields.label}
              </label>
              <input
                className="border border-gray-200 rounded-lg p-2 m-2 w-full"
                type="text"
              />
            </React.Fragment>
          );
        })}
      </div>
    </AppContainer>
  );
}

export default App;
