import React, { FormEvent, useEffect, useRef, useState } from "react";
import Formfield from "./Formfield";
import { FormData, FormField } from "../types/formTypes";

// Get the saved forms from local storage
const getLocalForms: () => FormData[] = () => {
  const savedFormData = localStorage.getItem("savedForms");
  return savedFormData ? JSON.parse(savedFormData) : [];
};

// Save all the forms in local storage
const saveLocalForms = (localForms: FormData[]) => {
  localStorage.setItem("savedForms", JSON.stringify(localForms));
};

// To save the form data in local storage
const saveFormData = (currentData: FormData) => {
  const localForms = getLocalForms();
  const updatedLocalForms = localForms.map((form: FormData) =>
    form.id === currentData.id ? currentData : form
  );
  saveLocalForms(updatedLocalForms);
};

// To find the selected form
const findSelectedForm = (id: number) => {
  const localForms = getLocalForms();
  return localForms.find((form: FormData) => form.id === id);
};

function Form(props: { closeForm: () => void; selectedFormID: number }) {
  const initialState: () => FormData = () => {
    const localForms = getLocalForms();
    return findSelectedForm(props.selectedFormID) || localForms[0];
  };

  const [fields, setFields] = useState(() => initialState());

  const [newField, setNewField] = useState("");
  const [fieldType, setFieldType] = useState("text");
  const titleRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const oldTitle = document.title;
    document.title = "Form App";
    titleRef.current?.focus();
    return () => {
      document.title = oldTitle;
    };
  }, []);

  // Saves the form data in local storage after every 1 second of inactivity
  useEffect(() => {
    const timeout = setTimeout(() => {
      saveFormData(fields);
    }, 1000);

    return () => {
      clearTimeout(timeout);
    };
  }, [fields]);

  // To update the value of any field
  const onChangeCB = (id: number, value: string) => {
    setFields({
      ...fields,
      formFields: fields.formFields.map((field: FormField) => {
        if (field.id === id) {
          return {
            ...field,
            value,
          };
        }
        return field;
      }),
    });
  };

  // To clear all the fields value
  const clearFields = (event: FormEvent) => {
    setFields({
      ...fields,
      formFields: fields.formFields.map((field: FormField) => {
        return { ...field, value: "" };
      }),
    });
  };

  // To add the new field
  const addField = (event: FormEvent) => {
    setFields({
      ...fields,
      formFields: [
        ...fields.formFields,
        {
          id: Number(new Date()),
          label: newField,
          type: fieldType,
          value: "",
        },
      ],
    });
    setNewField("");
    setFieldType("text");
  };

  // To remove any field
  const removeField = (id: number) => {
    setFields({
      ...fields,
      formFields: fields.formFields.filter(
        (field: FormField) => field.id !== id
      ),
    });
  };

  return (
    <div className="divide-y divide-dotted">
      <input
        value={fields.title}
        onChange={(event) =>
          setFields({
            ...fields,
            title: event.target.value,
          })
        }
        className="border w-full border-gray-200 rounded-lg p-2 mt-2 mb-4 flex-1"
        type="text"
        ref={titleRef}
      />
      <div className="">
        <form className="px-2 mt-4">
          {fields.formFields.map((fields: FormField) => {
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
