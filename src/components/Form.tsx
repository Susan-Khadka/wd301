import React, { FormEvent, useState } from "react";
import Formfield from "./Formfield";

interface FormField {
  id: number;
  label: string;
  type: string;
  value: string;
}

const initialFormFields: FormField[] = [
  { id: 1, label: "First Name", type: "text", value: "" },
  { id: 2, label: "Last Name", type: "text", value: "" },
  { id: 3, label: "Email", type: "email", value: "" },
  { id: 4, label: "Date of Birth", type: "date", value: "" },
  { id: 5, label: "Contact No", type: "tel", value: "" },
];

const initialState = () => {
  const formFieldJSON = localStorage.getItem("formData");
  const persistedFormData = formFieldJSON
    ? JSON.parse(formFieldJSON)
    : initialFormFields;
  return persistedFormData;
};

function Form(props: { closeForm: () => void }) {
  const [fields, setFields] = useState(initialState);

  const [newField, setNewField] = useState("");
  const [fieldType, setFieldType] = useState("text");

  const saveFormData = (currentData: FormField[]) => {
    localStorage.setItem("formData", JSON.stringify(currentData));
  };

  const onChangeCB = (id: number, value: string) => {
    setFields(
      fields.map((field: FormField) => {
        if (field.id === id) {
          return {
            ...field,
            value,
          };
        }
        return field;
      })
    );
  };

  const clearFields = (event: FormEvent) => {
    setFields(
      fields.map((field: FormField) => {
        return { ...field, value: "" };
      })
    );
  };

  const addField = (event: FormEvent) => {
    setFields([
      ...fields,
      {
        id: Number(new Date()),
        label: newField,
        type: fieldType,
        value: "",
      },
    ]);
    setNewField("");
    setFieldType("text");
  };

  const removeField = (id: number) => {
    setFields(fields.filter((field: FormField) => field.id !== id));
  };

  return (
    <div className="divide-y divide-dotted">
      <div>
        <form className="px-2 mt-4">
          {fields.map((fields: FormField) => {
            return (
              <Formfield
                onChangeCB={onChangeCB}
                key={fields.id}
                removeFieldCB={removeField}
                id={fields.id}
                labelText={fields.label}
                type={fields.type}
                value={fields.value}
              />
            );
          })}
        </form>
      </div>
      <div className="flex-col gap-2 items-baseline px-2">
        <input
          value={newField}
          onChange={(event) => setNewField(event.target.value)}
          className="border w-full border-gray-200 rounded-lg p-2 mt-2 mb-4 flex-1"
          type="text"
        />
        <div className="flex gap-2 mb-2">
          <select
            value={fieldType}
            onChange={(event) => setFieldType(event.target.value)}
            className="p-2 border rounded-md w-11/12"
            name="type"
            id="type"
          >
            <option value="text">Text</option>
            <option value="email">Email</option>
            <option value="date">Date</option>
            <option value="tel">Phone</option>
            <option value="number">Number</option>
            <option value="password">Password</option>
            <option value="textarea">Textarea</option>
          </select>
          <button
            onClick={addField}
            className="px-2 py-2 border flex justify-center rounded-md flex-1 bg-blue-500 text-white"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 4.5v15m7.5-7.5h-15"
              />
            </svg>
          </button>
        </div>
      </div>
      <div className="flex gap-x-4">
        <button
          onClick={(event) => {
            saveFormData(fields);
          }}
          className="bg-blue-500 text-white rounded-lg px-4 py-2 m-2 text-lg"
        >
          Save
        </button>
        <button
          onClick={(event) => {
            clearFields(event);
          }}
          className="bg-blue-500 text-white rounded-lg px-4 py-2 m-2 text-lg"
        >
          Clear
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
