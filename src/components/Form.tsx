import React, { useEffect, useReducer, useRef, useState } from "react";

import Formfield from "./Formfield";
import {
  FormData,
  FormField,
  allFieldTypes,
  fieldKind,
  Form,
  updatedFormFields,
  updatedFieldKind,
} from "../types/formTypes";

import { Link, navigate } from "raviger";

import Singleselectfields from "./Singleselectfields";
import MultiselectComp from "./MultiselectComp";
import { Option } from "../types/formTypes";
import {
  allFields,
  getNewField,
  updateKind,
  updatedKind,
} from "../utils/FromUtils";
import {
  createField,
  deleteField,
  loadForm,
  loadFormfields,
  updateForm,
} from "../utils/apiUtils";
import { Pagination } from "../types/common";

type State = {
  form: Form;
  formFields: updatedFormFields[];
};

type InitializeState = {
  type: "INITIALIZE_STATE";
  data: State;
};

type UpdateTitleAction = {
  type: "UPDATE_TITLE";
  title: string;
};

type AddFieldAction = {
  type: "ADD_FIELD";
  id: number;
  kind: updatedFieldKind;
  label: string;
};

type DeleteFieldAction = {
  type: "DELETE_FIELD";
  formId: number;
  fieldId: number;
};

type Action =
  | AddFieldAction
  | InitializeState
  | UpdateTitleAction
  | DeleteFieldAction;

const reducer = (state: State, action: Action) => {
  switch (action.type) {
    case "INITIALIZE_STATE": {
      return action.data;
    }
    case "UPDATE_TITLE": {
      // Updating the state
      return {
        ...state,
        form: {
          ...state.form,
          title: action.title,
        },
      };
    }
    case "ADD_FIELD": {
      const newField: updatedFormFields = {
        id: String(action.id),
        label: action.label,
        kind: action.kind,
        options: [],
        type: action.kind,
      };
      return {
        ...state,
        formFields: [...state.formFields, newField],
      };
    }
    case "DELETE_FIELD": {
      return {
        ...state,
        formFields: state.formFields.filter((formFields: updatedFormFields) => {
          return Number(formFields.id!) !== action.fieldId;
        }),
      };
    }
  }
  return state;
};

const updateFromData = async (state: State, title: string) => {
  await updateForm(state.form.id!, {
    ...state.form,
    title,
  });
};

function FormBuilder(props: { selectedFormID: string }) {
  const initializerState: State = {
    form: {} as Form,
    formFields: [] as updatedFormFields[],
  };

  const [state, dispatch] = useReducer(reducer, initializerState);

  useEffect(() => {
    updatedInitialState(props.selectedFormID).then((data) => {
      dispatch({ type: "INITIALIZE_STATE", data });
    });
  }, [props.selectedFormID]);

  const updatedInitialState = async (id: string) => {
    const form = await loadForm(Number(id));
    const formFields: Pagination<updatedFormFields> = await loadFormfields(
      Number(id)
    );
    return {
      form,
      formFields: formFields.results,
    };
  };

  const [newField, setNewField] = useState("");
  const [kind, setKind] = useState<updatedFieldKind>("TEXT");
  const [fieldType, setFieldType] = useState<allFieldTypes>("text");
  const titleRef = useRef<HTMLInputElement>(null);

  const createFieldCB = async (
    id: number,
    label: string,
    kind: updatedFieldKind
  ) => {
    const field = await createField(state.form.id!, { label, kind });
    dispatch({ type: "ADD_FIELD", id: field.id, kind, label });
  };

  const removeFieldCB = (id: string) => {
    deleteField(state.form.id!, Number(id))
      .then((data) => {
        console.log(data);
      })
      .catch((err) => {
        console.log(err);
      });
    dispatch({
      type: "DELETE_FIELD",
      formId: state.form.id!,
      fieldId: Number(id),
    });
  };

  return (
    <div className="divide-y divide-dotted">
      <input
        value={state.form.title === undefined ? "" : state.form.title}
        onChange={(event) => {
          dispatch({ type: "UPDATE_TITLE", title: event.target.value });
          updateFromData(state, event.target.value);
        }}
        className="border w-full border-gray-200 rounded-lg p-2 mt-2 mb-4 flex-1"
        type="text"
        ref={titleRef}
      />
      <div className="">
        <form className="px-2 mt-4">
          {state.formFields.length === 0 && (
            <div className="flex justify-center items-center h-64">
              <h1 className="text-2xl font-bold">No Fields Added</h1>
            </div>
          )}
          {state.formFields.length > 0 &&
            state.formFields.map((fields: updatedFormFields) => {
              if (fields.kind === "TEXT") {
                return (
                  <Formfield
                    key={fields.id}
                    onChangeCB={(id, label) => {
                      // dispatch({ type: "UPDATE_LABEL", id, label });
                    }}
                    removeFieldCB={(id) => {
                      removeFieldCB(id);
                    }}
                    fields={fields}
                  />
                );
              }
              // else if (
              //   fields.kind === "multiselectdrop" ||
              //   fields.kind === "checkbox"
              // ) {
              //   return (
              //     <MultiselectComp
              //       key={fields.id}
              //       onChangeCB={(id, label) => {
              //         // dispatch({ type: "UPDATE_LABEL", id, label });
              //       }}
              //       removeFieldCB={(id) => {
              //         // dispatch({ type: "REMOVE_FIELD", id })
              //       }}
              //       fields={fields}
              //       optionUpdateCB={(id, options) => {
              //         // dispatch({ type: "MULTI_OPT_UPDATE", id, options });
              //       }}
              //     />
              //   );
              // }
              else {
                return (
                  <Singleselectfields
                    key={fields.id}
                    onChangeCB={(id, label) => {
                      // dispatch({ type: "UPDATE_LABEL", id, label });
                    }}
                    removeFieldCB={(id) => {
                      // dispatch({ type: "REMOVE_FIELD", id })
                    }}
                    fields={fields}
                    updateOptionCB={(id, options) => {
                      // dispatch({ type: "UPDATE_OPTIONS", id, options });
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
                // setKind(updateKind(value));
              }}
              className="p-2 border rounded-md w-11/12"
              name="type"
              id="type"
            >
              {updatedKind.map((field) => {
                return (
                  <option key={field} value={field}>
                    {field.charAt(0).toUpperCase() +
                      field.slice(1).toLowerCase()}
                  </option>
                );
              })}
            </select>
            <button
              onClick={(e) => {
                e.preventDefault();
                createFieldCB(state.form.id!, newField, kind);
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
            // saveFormData(state);
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
      {/* {previewSection(state)} */}
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

export default FormBuilder;
