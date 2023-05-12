// import logo from "./logo.svg";

import AppContainer from "../src/hoc/AppContainer";
import Header from "./Header";
import React, { useState } from "react";
import Home from "./components/Home";
import Form from "./components/Form";

function App() {
  const [state, setState] = useState("HOME");

  const formFields = [
    { id: 1, label: "First Name", type: "text" },
    { id: 2, label: "Last Name", type: "text" },
    { id: 3, label: "Email", type: "email" },
    { id: 4, label: "Date of Birth", type: "date" },
    { id: 5, label: "Contact No", type: "tel" },
  ];

  const openForm = () => {
    setState("FORM");
  };

  const closeForm = () => {
    setState("HOME");
  };

  return (
    <AppContainer>
      <div className="w-1/3 p-4 mx-auto bg-white shadow-lg rounded-xl">
        <Header title="Welcome to #react-with-typescript and tailwind" />
        {state === "HOME" ? (
          <Home openForm={openForm} />
        ) : (
          <Form closeForm={closeForm} formFields={formFields} />
        )}
      </div>
    </AppContainer>
  );
}

export default App;
