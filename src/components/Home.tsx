import React from "react";
import logo from "../logo.svg";

function Home(props: { openForm: () => void }) {


  const formFields = [
    { id: 1, label: "First Name", type: "text" },
    { id: 2, label: "Last Name", type: "text" },
    { id: 3, label: "Email", type: "email" },
    { id: 4, label: "Date of Birth", type: "date" },
    { id: 5, label: "Contact No", type: "tel" },
  ];
  return (
    <>
      <div className="flex mt-5">
        <img className="h-48" src={logo} alt="logo" />
        <div className="h-48 flex justify-center items-center">
          <p className="text-2xl font-medium"> Welcome to the home page</p>
        </div>
      </div>
      <div className="flex justify-center items-center my-5">
        <button
          className="border w-full py-2 px-4 rounded-lg bg-blue-500 text-white"
          onClick={props.openForm}
        >
          Open Form
        </button>
      </div>
    </>
  );
}

export default Home;
