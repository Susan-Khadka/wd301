import React, { useEffect, useReducer, useRef, useState } from "react";

import Formfield from "./Formfield";
import {
  FormData,
  FormField,
  allFieldTypes,
  fieldKind,
} from "../types/formTypes";

import { Link, navigate } from "raviger";

import { getLocalForms, saveLocalForms } from "../utils/storageUtils";
import Singleselectfields from "./Singleselectfields";
import MultiselectComp from "./MultiselectComp";
import { Option } from "../types/formTypes";
import { allFields, getNewField, updateKind } from "../utils/FromUtils";

// To save the form data in local storage
const saveFormData = (currentData: FormData) => {
  const localForms = getLocalForms();
  const updatedLocalForms = localForms.map((form: FormData) =>
    form.id === currentData.id ? currentData : form
  );
  saveLocalForms(updatedLocalForms);
};

// To find the selected form
const findSelectedForm = (id: string) => {
  const localForms = getLocalForms();
  return localForms.find((form: FormData) => form.id === id);
};

type AddAction = {
  type: "ADD_FIELD";
  kind: fieldKind;
  label: string;
};

type RemoveAction = {
  type: "REMOVE_FIELD";
  id: string;
};

type UpdateTitleAction = {
  type: "UPDATE_TITLE";
  id: string;
  title: string;
};

type UpdateLabelAction = {
  type: "UPDATE_LABEL";
  id: string;
  label: string;
};

type UpdateOptionsAction = {
  type: "UPDATE_OPTIONS";
  id: string;
  options: string[];
};

type MultiSelectUpdate = {
  type: "MULTI_OPT_UPDATE";
  id: string;
  options: Option[];
};

type FormAction =
  | UpdateTitleAction
  | AddAction
  | RemoveAction
  | UpdateLabelAction
  | UpdateOptionsAction
  | MultiSelectUpdate;

const reducer = (state: FormData, action: FormAction) => {
  switch (action.type) {
    case "ADD_FIELD":
      const newField = getNewField(action.kind, action.label);
      if (newField.label.length > 0) {
        return {
          ...state,
          formFields: [...state.formFields, newField],
        };
      }
      return state;
    case "REMOVE_FIELD":
      return {
        ...state,
        formFields: state.formFields.filter((field) => field.id !== action.id),
      };
    case "UPDATE_TITLE":
      return {
        ...state,
        title: action.title,
      };

    case "UPDATE_LABEL":
      return {
        ...state,
        formFields: state.formFields.map((field: FormField) => {
          if (field.id === action.id) {
            return {
              ...field,
              label: action.label,
            };
          }
          return field;
        }),
      };
    case "UPDATE_OPTIONS":
      return {
        ...state,
        formFields: state.formFields.map((field: FormField) => {
          if (field.id === action.id) {
            return {
              ...field,
              options: action.options,
            } as FormField;
          }
          return field;
        }),
      };
    case "MULTI_OPT_UPDATE":
      return {
        ...state,
        formFields: state.formFields.map((field: FormField) => {
          if (field.id === action.id) {
            return {
              ...field,
              options: action.options,
            } as FormField;
          }
          return field;
        }),
      };
  }
};

function Form(props: { selectedFormID: string }) {
  const initialState: () => FormData = () => {
    const localForms = getLocalForms();
    return findSelectedForm(props.selectedFormID) || localForms[0];
  };

  const [state, dispatch] = useReducer(reducer, null, () => initialState());

  const [newField, setNewField] = useState("");
  const [kind, setKind] = useState<fieldKind>("text");
  const [fieldType, setFieldType] = useState<allFieldTypes>("text");
  const titleRef = useRef<HTMLInputElement>(null);

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
    if (props.selectedFormID !== state.id) {
      navigate("/");
    }
  }, [props.selectedFormID, state.id]);

  // Saves the form data in local storage after every 1 second of inactivity
  useEffect(() => {
    const timeout = setTimeout(() => {
      saveFormData(state);
    }, 1000);

    return () => {
      clearTimeout(timeout);
    };
  }, [state]);

  return (
    <div className="divide-y divide-dotted">
      <input
        value={state.title}
        onChange={(event) =>
          dispatch({
            type: "UPDATE_TITLE",
            id: state.id,
            title: event.target.value,
          })
        }
        className="border w-full border-gray-200 rounded-lg p-2 mt-2 mb-4 flex-1"
        type="text"
        ref={titleRef}
      />
      <div className="">
        <form className="px-2 mt-4">
          {state.formFields.map((fields: FormField) => {
            if (fields.kind === "text" || fields.kind === "textarea") {
              return (
                <Formfield
                  key={fields.id}
                  onChangeCB={(id, label) => {
                    dispatch({ type: "UPDATE_LABEL", id, label });
                  }}
                  removeFieldCB={(id) => dispatch({ type: "REMOVE_FIELD", id })}
                  fields={fields}
                />
              );
            } else if (
              fields.kind === "multiselectdrop" ||
              fields.kind === "checkbox"
            ) {
              return (
                <MultiselectComp
                  key={fields.id}
                  onChangeCB={(id, label) => {
                    dispatch({ type: "UPDATE_LABEL", id, label });
                  }}
                  removeFieldCB={(id) => dispatch({ type: "REMOVE_FIELD", id })}
                  fields={fields}
                  optionUpdateCB={(id, options) => {
                    dispatch({ type: "MULTI_OPT_UPDATE", id, options });
                  }}
                />
              );
            } else {
              return (
                <Singleselectfields
                  key={fields.id}
                  onChangeCB={(id, label) => {
                    dispatch({ type: "UPDATE_LABEL", id, label });
                  }}
                  removeFieldCB={(id) => dispatch({ type: "REMOVE_FIELD", id })}
                  fields={fields}
                  updateOptionCB={(id, options) => {
                    dispatch({ type: "UPDATE_OPTIONS", id, options });
                  }}
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
                setKind(updateKind(value));
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
              onClick={(_) => {
                dispatch({
                  type: "ADD_FIELD",
                  kind,
                  label: newField,
                });
                setNewField("");
              }}
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
            saveFormData(state);
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
      {previewSection(state)}
    </div>
  );
}

const previewSection = (fields: FormData) => (
  <div className="flex items-center gap-2">
    <input
      value={`http://localhost:3000/preview/${fields.id}`}
      className="border border-gray-200 bg-gray-50 rounded-lg p-2 mt-2 mb-4 flex-1"
      type={"text"}
      disabled
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

export default Form;
