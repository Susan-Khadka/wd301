import React, { FormEvent, useEffect, useRef, useState } from "react";
import Formfield from "./Formfield";
import {
  FormData,
  FormField,
  allFieldTypes,
  otherFieldTypes,
  textFieldTypes,
} from "../types/formTypes";
import { Link, navigate } from "raviger";
import { getLocalForms, saveLocalForms } from "../utils/storageUtils";
import Otherfields from "./Otherfields";
import Textarea from "./Textarea";

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

const previewSection = (fields: FormData) => (
  <div className="flex items-center gap-2">
    <input
      onChange={(event) => {}}
      value={`http://localhost:3000/preview/${fields.id}`}
      className="border border-gray-200 bg-gray-50 rounded-lg p-2 mt-2 mb-4 flex-1"
      type={"text"}
    />
    <Link
      type="button"
      href={`/preview/${fields.id}`}
      className="px-2 py-2 border flex mb-2 justify-center rounded-md bg-blue-500 text-white"
      target="_blank"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth="1.5"
        stroke="currentColor"
        className="w-6 h-6"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M13.5 6H5.25A2.25 2.25 0 003 8.25v10.5A2.25 2.25 0 005.25 21h10.5A2.25 2.25 0 0018 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25"
        />
      </svg>
    </Link>
  </div>
);

function Form(props: { selectedFormID: number }) {
  const initialState: () => FormData = () => {
    const localForms = getLocalForms();
    return findSelectedForm(props.selectedFormID) || localForms[0];
  };

  const [fields, setFields] = useState(() => initialState());

  const [newField, setNewField] = useState("");
  const [fieldType, setFieldType] = useState<allFieldTypes>("text");
  const titleRef = useRef<HTMLInputElement>(null);
  const textFields: textFieldTypes[] = [
    "text",
    "email",
    "number",
    "date",
    "tel",
    "password",
  ];
  const otherFields: otherFieldTypes[] = [
    "radio",
    "dropdown",
    "checkbox",
    "textarea",
    "multiselectdropdown",
  ];
  const allFields: allFieldTypes[] = [...textFields, ...otherFields];

  useEffect(() => {
    const oldTitle = document.title;
    document.title = "Form App";
    titleRef.current?.focus();
    return () => {
      document.title = oldTitle;
    };
  }, []);

  // To check if the selected form is present in local storage
  useEffect(() => {
    if (props.selectedFormID !== fields.id) {
      navigate("/");
    }
  }, [props.selectedFormID, fields.id]);

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
  const onChangeCB = (id: number, label: string) => {
    setFields({
      ...fields,
      formFields: fields.formFields.map((field: FormField) => {
        if (field.id === id) {
          return {
            ...field,
            label,
          };
        }
        return field;
      }),
    });
  };

  const addOptionsCB = (id: number, options: string[]) => {
    setFields({
      ...fields,
      formFields: fields.formFields.map((field: FormField) => {
        if (field.id === id) {
          return {
            ...field,
            options,
          };
        }
        return field;
      }),
    });
  };

  // Change options value for dropdown field
  const optionChangeCB = (id: number, options: string[]) => {
    setFields({
      ...fields,
      formFields: fields.formFields.map((field: FormField) => {
        if (field.id === id) {
          return {
            ...field,
            options,
          };
        }
        return field;
      }),
    });
  };

  // Delete the option value for dropdown field
  const deleteOptionCB = (id: number, options: string[]) => {
    setFields({
      ...fields,
      formFields: fields.formFields.map((field: FormField) => {
        if (field.id === id) {
          return {
            ...field,
            options,
          };
        }
        return field;
      }),
    });
  };

  // To add the new field
  const addField = (event: FormEvent) => {
    event.preventDefault();
    if (
      fieldType === "dropdown" ||
      fieldType === "radio" ||
      fieldType === "checkbox"
    ) {
      setFields({
        ...fields,
        formFields: [
          ...fields.formFields,
          {
            kind: fieldType,
            id: Number(new Date()),
            label: newField,
            value: "",
            options: [],
          },
        ],
      });
    } else if (fieldType === "textarea") {
      setFields({
        ...fields,
        formFields: [
          ...fields.formFields,
          {
            kind: fieldType,
            id: Number(new Date()),
            label: newField,
            value: "",
          },
        ],
      });
    } else if (fieldType === "multiselectdropdown") {
      setFields({
        ...fields,
        formFields: [
          ...fields.formFields,
          {
            kind: fieldType,
            id: Number(new Date()),
            label: newField,
            options: [],
            value: [],
          },
        ],
      });
    } else {
      setFields({
        ...fields,
        formFields: [
          ...fields.formFields,
          {
            kind: "text",
            id: Number(new Date()),
            label: newField,
            type: fieldType,
            value: "",
          },
        ],
      });
    }
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
            if (fields.kind === "text") {
              return (
                <Formfield
                  key={fields.id}
                  onChangeCB={onChangeCB}
                  removeFieldCB={removeField}
                  fields={fields}
                />
              );
            } else if (fields.kind === "textarea") {
              return (
                <Textarea
                  removeFieldCB={removeField}
                  onChangeCB={onChangeCB}
                  fields={fields}
                />
              );
            } else {
              return (
                <Otherfields
                  key={fields.id}
                  onChangeCB={onChangeCB}
                  removeFieldCB={removeField}
                  fields={fields}
                  optionChangeCB={optionChangeCB}
                  deleteOptionCB={deleteOptionCB}
                  addOptionCB={addOptionsCB}
                />
              );
            }
          })}
        </form>
      </div>
      <div className="flex-col gap-2 items-baseline px-2 ">
        <div className="border p-2 rounded-lg bg-zinc-50 my-2">
          <label className="text-gray-700 font-normal">Add Field</label>
          <input
            value={newField}
            onChange={(event) => setNewField(event.target.value)}
            className="border w-full border-gray-200 rounded-lg p-2 mt-2 mb-4 flex-1"
            type="text"
          />
          <div className="flex gap-2 mb-2">
            <select
              value={fieldType}
              onChange={(event) => {
                const value = event.target.value as allFieldTypes;
                setFieldType(value);
              }}
              className="p-2 border rounded-md w-11/12"
              name="type"
              id="type"
            >
              {allFields.map((field) => {
                return (
                  <option key={field} value={field}>
                    {field.charAt(0).toUpperCase() + field.slice(1)}
                  </option>
                );
              })}
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
      </div>
      <div className="flex ">
        <button
          onClick={(event) => {
            saveFormData(fields);
          }}
          className="bg-blue-500 text-white rounded-lg px-4 py-2 m-2 text-lg"
        >
          Save
        </button>
        <button
          className="bg-blue-500 text-white rounded-lg px-4 py-2 m-2 text-lg"
          onClick={() => {
            navigate("/");
          }}
        >
          Close Form
        </button>
      </div>
      {previewSection(fields)}
    </div>
  );
}

export default Form;
