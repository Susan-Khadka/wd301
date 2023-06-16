import React, { useEffect, useReducer, useRef, useState } from "react";

import { Form, updatedFormFields, updatedFieldKind } from "../types/formTypes";

import { Link, navigate } from "raviger";

import { updatedKind } from "../utils/FromUtils";
import {
  createField,
  deleteField,
  loadForm,
  loadFormfields,
  updateDescription,
  updateLabel,
  updateOption,
  updateTitle,
} from "../utils/apiUtils";
import { Pagination } from "../types/common";
import TextField from "./TextField";
import MultiselectComp from "./MultiselectComp";

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

type UpdateDescriptionAction = {
  type: "UPDATE_DESC";
  description: string;
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

type updateFieldAction = {
  type: "UPDATE_FIELD";
  id: string;
  label: string;
};

type AddOptionAction = {
  type: "ADD_OPTION";
  id: string;
  option: string;
};

type DeleteOptionAction = {
  type: "DELETE_OPTION";
  value: string;
  id: string;
};

type EditOptionAction = {
  type: "EDIT_OPTION";
  id: string;
  newValue: string;
  oldValue: string;
};

type Action =
  | AddFieldAction
  | InitializeState
  | UpdateTitleAction
  | UpdateDescriptionAction
  | DeleteFieldAction
  | updateFieldAction
  | AddOptionAction
  | DeleteOptionAction
  | EditOptionAction;

const reducer = (state: State, action: Action) => {
  switch (action.type) {
    case "INITIALIZE_STATE": {
      return action.data;
    }
    case "UPDATE_TITLE": {
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
    case "UPDATE_DESC": {
      return {
        ...state,
        form: {
          ...state.form,
          description: action.description,
        },
      };
    }
    case "UPDATE_FIELD": {
      return {
        ...state,
        formFields: state.formFields.map((formFields: updatedFormFields) => {
          if (formFields.id === action.id) {
            return {
              ...formFields,
              label: action.label,
            };
          }
          return formFields;
        }),
      };
    }
    case "ADD_OPTION": {
      return {
        ...state,
        formFields: state.formFields.map((formFields: updatedFormFields) => {
          if (Number(formFields.id!) === Number(action.id)) {
            if (
              formFields.options === undefined ||
              formFields.options === null
            ) {
              return {
                ...formFields,
                options: [action.option],
              };
            } else {
              return {
                ...formFields,
                options: [...formFields.options, action.option],
              };
            }
          } else {
            return formFields;
          }
        }),
      };
    }
    case "DELETE_OPTION": {
      return {
        ...state,
        formFields: state.formFields.map((formFields: updatedFormFields) => {
          if (Number(formFields.id) === Number(action.id)) {
            return {
              ...formFields,
              options: formFields.options?.filter(
                (opt) => opt !== action.value
              ),
            };
          }
          return formFields;
        }),
      };
    }
    case "EDIT_OPTION": {
      return {
        ...state,
        formFields: state.formFields.map((formFields: updatedFormFields) => {
          if (Number(formFields.id) === Number(action.id)) {
            return {
              ...formFields,
              options: formFields.options?.map((opt) => {
                if (opt === action.oldValue) {
                  return action.newValue;
                }
                return opt;
              }),
            };
          }
          return formFields;
        }),
      };
    }
  }
  return state;
};

function FormBuilder(props: { formId: string }) {
  const initializerState: State = {
    form: {
      title: "",
      description: "",
    } as Form,
    formFields: [] as updatedFormFields[],
  };

  const [state, dispatch] = useReducer(reducer, initializerState);

  useEffect(() => {
    updatedInitialState(props.formId).then((data) => {
      dispatch({ type: "INITIALIZE_STATE", data });
    });
  }, [props.formId]);

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
  const titleRef = useRef<HTMLInputElement>(null);

  const createFieldCB = async (
    id: number,
    label: updatedFormFields["label"],
    kind: updatedFormFields["kind"]
  ) => {
    const field = await createField(state.form.id!, { label, kind });
    dispatch({ type: "ADD_FIELD", id: field.id, kind, label });
  };

  const updateTitleCB = async (id: Form["id"], title: Form["title"]) => {
    updateTitle(id!, title)
      .then((res) => console.log(res))
      .catch((err) => console.log(err));
    dispatch({ type: "UPDATE_TITLE", title });
  };

  const updateDescriptionCB = async (id: number, description: string) => {
    updateDescription(id, description)
      .then((res) => console.log(res))
      .catch((err) => console.log(err));
    dispatch({ type: "UPDATE_DESC", description });
  };

  const updateLabelCB = (id: string, label: string) => {
    updateLabel(state.form.id!, Number(id), label)
      .then((res) => console.log(res))
      .catch((err) => console.log(err));
    dispatch({ type: "UPDATE_FIELD", id, label });
  };

  const removeFieldCB = (id: string) => {
    deleteField(state.form.id!, Number(id))
      .then((data) => console.log(data))
      .catch((err) => console.log(err));
    dispatch({
      type: "DELETE_FIELD",
      formId: state.form.id!,
      fieldId: Number(id),
    });
  };

  const addOptionCB = async (id: string, option: string) => {
    dispatch({ type: "ADD_OPTION", id, option });

    const field = state.formFields.find(
      (field) => Number(field.id) === Number(id)
    );

    let options: string[];

    if (field?.options == null) {
      options = [option];
    } else {
      options = [...field!.options!, option];
    }

    updateOption(state.form.id!, Number(id), options)
      .then((res) => console.log(res))
      .catch((err) => console.log(err));
  };

  const editOptionCB = async (
    id: string,
    newValue: string,
    oldValue: string
  ) => {
    const field = state.formFields.find(
      (fields) => Number(fields.id) === Number(id)
    );
    let options: string[];
    if (field?.options == null) {
      options = [];
    } else {
      options = field?.options?.map((opt) => {
        if (opt === oldValue) {
          return newValue;
        }
        return opt;
      });
    }
    updateOption(state.form.id!, Number(id), options);
    dispatch({ type: "EDIT_OPTION", id, newValue, oldValue });
  };

  const deleteOptionCB = async (id: string, option: string) => {
    dispatch({ type: "DELETE_OPTION", id, value: option });

    const field = state.formFields.find(
      (fields) => Number(fields.id) === Number(id)
    );

    let options: string[];

    if (field?.options == null) {
      options = [];
    } else {
      options = field?.options?.filter((opt) => opt !== option);
    }

    updateOption(state.form.id!, Number(id), options)
      .then((res) => console.log(res))
      .catch((error) => console.log(error));
  };

  return (
    <div className="divide-y divide-dotted">
      <input
        value={state.form.title}
        onChange={(event) => {
          updateTitleCB(state.form.id!, event.target.value);
        }}
        className="border w-full border-gray-200 rounded-lg p-2 mt-2 mb-4 flex-1"
        type="text"
        placeholder="Title Here"
        ref={titleRef}
      />
      <div>
        <input
          value={state.form.description!}
          onChange={(e) => {
            updateDescriptionCB(state.form.id!, e.target.value);
          }}
          className="border w-full border-gray-200 rounded-lg p-2 mt-2 mb-4 flex-1"
          type="text"
          placeholder="Description"
          name="description"
          id="description"
        />
      </div>
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
                  <TextField
                    key={fields.id}
                    fields={fields}
                    updateLabelCB={updateLabelCB}
                    removeFieldCB={removeFieldCB}
                  />
                );
              } else {
                return (
                  <MultiselectComp
                    key={fields.id}
                    fields={fields}
                    addOptionCB={addOptionCB}
                    editOptionCB={editOptionCB}
                    deleteOptionCB={deleteOptionCB}
                    updateLabelCB={updateLabelCB}
                    removeFieldCB={removeFieldCB}
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
              value={kind}
              onChange={(event) => {
                const value = event.target.value as updatedFieldKind;
                setKind(value);
              }}
              className="p-2 border rounded-md w-11/12"
              name="type"
              id="type"
            >
              {updatedKind.map((field: updatedFieldKind) => {
                return (
                  <option id={field} key={field} value={field}>
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
      {previewSection(state.form)}
    </div>
  );
}

const previewSection = (form: Form) => (
  <div className="flex items-center gap-2">
    <input
      value={`http://localhost:3000/preview/${form.id!}`}
      className="border border-gray-200 bg-gray-50 rounded-lg p-2 mt-2 mb-4 flex-1"
      type={"text"}
      disabled
    />
    <Link
      type="button"
      href={`/preview/${form.id}`}
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
