// import logo from "./logo.svg";

import AppContainer from "../src/hoc/AppContainer";
import Header from "./Header";
import React, { FormEvent, useState } from "react";
import Home from "./components/Home";

function App() {
  const formFields = [
    { id: 1, label: "First Name", type: "text" },
    { id: 2, label: "Last Name", type: "text" },
    { id: 3, label: "Email", type: "email" },
    { id: 4, label: "Date of Birth", type: "date" },
    { id: 5, label: "Contact No", type: "tel" },
  ];

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    console.log("Form Submitted");
  };

  const [state, setState] = useState("HOME");

  const openForm = () => {
    setState("FORM");
  };

  const closeForm = () => {
    setState("HOME");
  }

  return (
    <AppContainer>
      <div className="w-1/3 p-4 mx-auto bg-white shadow-lg rounded-xl">
        <Header title="Welcome to #react-with-typescript and tailwind" />
        {state === "HOME" ? (
          <>
            <Home />
            <div className="flex justify-center items-center my-5">
              <button
                className="border w-full py-2 px-4 rounded-lg bg-blue-500 text-white"
                onClick={openForm}
              >
                Open Form
              </button>
            </div>
          </>
        ) : (
          <form
            className="px-2 mt-4"
            onSubmit={(event) => {
              handleSubmit(event);
            }}
          >
            {formFields.map((fields) => {
              return (
                <React.Fragment key={fields.id}>
                  <label className="" htmlFor="">
                    {fields.label}
                  </label>
                  <input
                    className="border border-gray-200 rounded-lg p-2 mt-2 mb-4 w-full"
                    type={fields.type}
                  />
                </React.Fragment>
              );
            })}
            <div className="flex gap-x-4">
              <button
                type="submit"
                className="bg-blue-500 text-white rounded-lg px-4 py-2 m-2 text-lg"
              >
                Submit
              </button>
              <button
                className="bg-blue-500 text-white rounded-lg px-4 py-2 m-2 text-lg"
                onClick={closeForm}
              >
                Close Form
              </button>
            </div>
          </form>
        )}
      </div>
    </AppContainer>
  );
}

export default App;
