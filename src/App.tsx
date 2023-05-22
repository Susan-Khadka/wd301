// import logo from "./logo.svg";

import AppContainer from "../src/hoc/AppContainer";
import Header from "./Header";
import React, { useState } from "react";
import Home from "./components/Home";
import Form from "./components/Form";
import { FormData, FormField } from "./types/formTypes";

const initialFormFields: FormField[] = [
  { id: 1, label: "First Name", type: "text", value: "" },
  { id: 2, label: "Last Name", type: "text", value: "" },
];

const getLocalForms: () => FormData[] = () => {
  const savedFormData = localStorage.getItem("savedForms");
  return savedFormData ? JSON.parse(savedFormData) : [];
};

const saveLocalForms = (localForms: FormData[]) => {
  localStorage.setItem("savedForms", JSON.stringify(localForms));
};

function App() {
  const [state, setState] = useState("HOME");
  const [formData, setFormData] = useState([...getLocalForms()]);

  const [selectedForm, setSelectedForm] = useState(0);

  const switchSelectedForm = (formId: number) => {
    setSelectedForm(formId);
  };

  const addForms = () => {
    const localForms = getLocalForms();
    const newForm = {
      id: Number(new Date()),
      title: "Untitled Form",
      formFields: initialFormFields,
    };

    setFormData([...localForms, newForm]);
    saveLocalForms([...localForms, newForm]);
  };

  const deleteForm = (id: number) => {
    const updatedLocalForms = formData.filter(
      (form: FormData) => form.id !== id
    );
    setFormData(updatedLocalForms);
    saveLocalForms(updatedLocalForms);
  };

  const openForm = (formId: number) => {
    setState("FORM");
    switchSelectedForm(formId);
  };

  const closeForm = () => {
    setState("HOME");
  };

  return (
    <AppContainer>
      <div className="w-1/3 p-4 mx-auto bg-white shadow-lg rounded-xl">
        <Header title="Welcome to #react-with-typescript and tailwind" />
        {state === "HOME" ? (
          <Home
            formData={formData}
            addFormsCB={addForms}
            getLocalFormsCB={getLocalForms}
            deleteFormCB={deleteForm}
            openFormCB={openForm}
          />
        ) : (
          <Form selectedFormID={selectedForm} closeForm={closeForm} />
        )}
      </div>
    </AppContainer>
  );
}

export default App;
