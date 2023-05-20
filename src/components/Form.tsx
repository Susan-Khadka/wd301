import React, { FormEvent, useState } from "react";
import Formfield from "./Formfield";

function Form(props: { closeForm: () => void }) {
  const formFields = [
    { id: 1, label: "First Name", type: "text" },
    { id: 2, label: "Last Name", type: "text" },
    { id: 3, label: "Email", type: "email" },
    { id: 4, label: "Date of Birth", type: "date" },
    { id: 5, label: "Contact No", type: "tel" },
  ];

  const [fields, setFields] = useState([...formFields]);

  const [newField, setNewField] = useState("");
  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    console.log("Form Submitted");
  };

  const addField = (event: FormEvent) => {
    event.preventDefault();
    setFields([
      ...fields,
      {
        id: Number(new Date()),
        label: newField,
        type: "text",
      },
    ]);
  };

  const removeField = (id: number) => {
    setFields(fields.filter((field) => field.id !== id));
  };

  return (
    <div className="divide-y divide-dotted">
      <div>
        <form className="px-2 mt-4">
          {fields.map((fields) => {
            return (
              <Formfield
                removeFieldCB={removeField}
                id={fields.id}
                labelText={fields.label}
                type={fields.type}
              />
            );
          })}
        </form>
      </div>
      <div className="flex gap-2 items-baseline px-2">
        <input
          onChange={(event) => setNewField(event.target.value)}
          className="border border-gray-200 rounded-lg p-2 mt-2 mb-4 flex-1"
          type="text"
        />
        <button onClick={addField} className="px-2 py-2 border rounded-md">
          Add Field
        </button>
      </div>
      <div className="flex gap-x-4">
        <button
          onClick={(event) => {
            handleSubmit(event);
          }}
          className="bg-blue-500 text-white rounded-lg px-4 py-2 m-2 text-lg"
        >
          Submit
        </button>
        <button
          className="bg-blue-500 text-white rounded-lg px-4 py-2 m-2 text-lg"
          onClick={props.closeForm}
        >
          Close Form
        </button>
      </div>
    </div>
  );
}

export default Form;
