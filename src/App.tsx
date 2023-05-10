// import logo from "./logo.svg";

import AppContainer from "../src/hoc/AppContainer";
import Header from "./Header";
import React from "react";

function App() {
  const formFields = [
    { id: 1, label: "First Name", type: "text" },
    { id: 2, label: "Last Name", type: "text" },
    { id: 3, label: "Email", type: "email" },
    { id: 4, label: "Date of Birth", type: "date" },
    { id: 5, label: "Phone", type: "tel" },
  ];

  const handleSubmit = (event:any) =>{
    event.preventDefault();
    console.log("Form Submitted");
  }

  return (
    <AppContainer>
      <div className="w-1/3 p-4 mx-auto bg-white shadow-lg rounded-xl">
        <Header title="Welcome to #react-with-typescript and tailwind" />
        <form onSubmit={(event)=>{handleSubmit(event)}}>
          {formFields.map((fields) => {
            return (
              <React.Fragment key={fields.id}>
                <label className="" htmlFor="">
                  {fields.label}
                </label>
                <input
                  className="border border-gray-200 rounded-lg p-2 mx-auto mt-2 mb-4 w-full"
                  type={fields.type}
                />
              </React.Fragment>
            );
          })}
          <input
            className="border m-2 px-4 hover:cursor-pointer py-2 rounded-md bg-blue-600 text-white font-semibold text-lg"
            type="submit"
            value="Submit"
          />
        </form>
      </div>
    </AppContainer>
  );
}

export default App;
