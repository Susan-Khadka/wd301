// import logo from "./logo.svg";

import AppContainer from "./AppContainer";
import Header from "./Header";
import React, { FormEvent } from "react";

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

  return (
    <AppContainer>
      <div className="w-1/4 p-4 mx-auto bg-white shadow-lg rounded-xl">
        <Header title="Welcome to #react-with-typescript and tailwind" />
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
          <div>
            <button
              type="submit"
              className="bg-blue-500 text-white rounded-lg px-4 py-2 m-2 text-lg"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </AppContainer>
  );
}

export default App;
