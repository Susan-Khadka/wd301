import React, { useState, MouseEvent, useEffect, useReducer } from "react";
import { FormData, FormField } from "../types/formTypes";
import { navigate } from "raviger";

import { getLocalForms, saveLocalForms } from "../utils/storageUtils";
import Multiselect from "multiselect-react-dropdown";

import { Option } from "../types/formTypes";

type updatedFormData = {
  id: string;
  title: string;
  formFields: FormField[];
  currentField: FormField;
  currentIndex: number;
};

const currentForm: (id: string) => updatedFormData = (id) => {
  const allLocalForms = getLocalForms();
  const selectedForm: FormData | undefined = allLocalForms.find(
    (form: FormData) => form.id === id
  );
  if (selectedForm === undefined) {
    navigate("/error");
    return {
      ...allLocalForms[0],
      currentField: allLocalForms[0].formFields[0],
      currentIndex: 0,
    };
  }
  return {
    ...selectedForm,
    currentField: selectedForm.formFields[0],
    currentIndex: 0,
  };
};

const savetoLocalForms = (localForms: FormData[]) => {
  const allLocalForms: FormData[] = getLocalForms();
  const updatedLocalForms = allLocalForms.map((form) => {
    return form.id === localForms[0].id ? localForms[0] : form;
  });
  saveLocalForms(updatedLocalForms);
};

type SingleValueAction = {
  type: "SINGLE_SELECT";
  id: string;
  value: string;
  callback: () => void;
};

type MultiDropDown = {
  type: "MULTI_DROPDOWN";
  id: string;
  value: Option[];
};

type ChecboxValueAction = {
  type: "MULTI_CHECKBOX";
  id: string;
  value: Option[];
  callback: () => void;
};

type handleNextAction = {
  type: "NEXT";
  callback: () => void;
};

type handlePreviousAction = {
  type: "PREVIOUS";
  callback: () => void;
};

type valueUpdateAction = SingleValueAction | MultiDropDown | ChecboxValueAction;

type overallActions =
  | valueUpdateAction
  | handleNextAction
  | handlePreviousAction;

const reducer = (state: updatedFormData, action: overallActions) => {
  switch (action.type) {
    case "SINGLE_SELECT": {
      const updatedFormFields = state.formFields.map((field) => {
        return action.id === field.id
          ? { ...field, value: action.value }
          : field;
      });
      action.callback();
      return { ...state, formFields: updatedFormFields as FormField[] };
    }
    case "MULTI_DROPDOWN": {
      const updatedFormFields = state.formFields.map((field) => {
        return field.id === action.id
          ? { ...field, value: action.value }
          : field;
      });
      return { ...state, formFields: updatedFormFields as FormField[] };
    }
    case "MULTI_CHECKBOX": {
      const updatedFormFields = state.formFields.map((field) => {
        return field.id === action.id
          ? { ...field, value: action.value }
          : field;
      });
      action.callback();
      return { ...state, formFields: updatedFormFields as FormField[] };
    }
    case "NEXT": {
      action.callback();
      return {
        ...state,
        currentField: state.formFields[state.currentIndex + 1],
        currentIndex: state.currentIndex + 1,
      };
    }
    case "PREVIOUS": {
      action.callback();
      return {
        ...state,
        currentField: state.formFields[state.currentIndex - 1],
        currentIndex: state.currentIndex - 1,
      };
    }
  }
};

function Preview(props: { formId: string }) {
  const [state, dispatch] = useReducer(reducer, currentForm(props.formId));
  const [currentIndex, setCurrentIndex] = useState(0);
  const [currentField, setCurrentField] = useState(
    state.formFields?.[currentIndex]
  );

  const [submitStatus, setSubmitStatus] = useState(false);

  useEffect(() => {
    const timeout = setTimeout(() => {
      savetoLocalForms([state]);
    }, 1000);
    return () => {
      clearTimeout(timeout);
    };
  }, [state]);

  const handleChecked: (option: Option) => boolean = (option) => {
    while (typeof currentField.value !== "string") {
      for (let i = 0; i < currentField.value.length; i++) {
        if (currentField.value[i].id === option.id) {
          return true;
        }
      }
      return false;
    }
    return false;
  };

  const handleSubmit = (e: MouseEvent) => {
    e.preventDefault();
    savetoLocalForms([state]);
    setSubmitStatus(true);
  };

  return (
    <div className="mx-2">
      {submitStatus ? (
        <div className="h-20 w-full bg-slate-200 flex justify-center items-center rounded-lg">
          <p className="w-full text-center text-2xl font-medium">
            Form Submitted!!!
          </p>
        </div>
      ) : (
        <>
          <p className="text-2xl text-center my-4">{state.title}</p>
          <label className="block text-xl" htmlFor={currentField.label}>
            {currentField.label}
          </label>
          {/* For text */}
          {currentField.kind === "text" && (
            <input
              onChange={(e) => {
                dispatch({
                  type: "SINGLE_SELECT",
                  id: currentField.id,
                  value: e.target.value,
                  callback: () => {
                    setCurrentField({
                      ...currentField,
                      value: e.target.value,
                    });
                  },
                });
              }}
              name={currentField.label}
              value={currentField.value}
              className="border w-full border-gray-200 rounded-lg p-2 mt-2 mb-4 flex-1"
              type={currentField.type}
            />
          )}
          {/* For multiselect dropdown */}
          {currentField.kind === "multiselectdrop" && (
            <div className="text-lg mb-5">
              <Multiselect
                options={currentField.options}
                displayValue="value"
                onSelect={(selectedList) => {
                  dispatch({
                    type: "MULTI_DROPDOWN",
                    id: currentField.id,
                    value: selectedList,
                  });
                }}
                onRemove={(selectedList) => {
                  dispatch({
                    type: "MULTI_DROPDOWN",
                    id: currentField.id,
                    value: selectedList,
                  });
                }}
                selectedValues={currentField.value}
              />
            </div>
          )}
          {/* For dropdown */}
          {currentField.kind === "dropdown" && (
            <div className="mb-5">
              <select
                defaultValue={currentField.value}
                onChange={(e) => {
                  dispatch({
                    type: "SINGLE_SELECT",
                    id: currentField.id,
                    value: e.target.value,
                    callback: () => {
                      setCurrentField({
                        ...currentField,
                        value: e.target.value,
                      });
                    },
                  });
                }}
                className="border w-full border-gray-200 rounded-lg py-3 px-2 mt-2 mb-4 flex-1"
              >
                {currentField.options?.map((option, index) => {
                  return (
                    <option key={`${option}-${index}`} value={option}>
                      {option}
                    </option>
                  );
                })}
              </select>
            </div>
          )}
          {/* For radio */}
          {currentField.kind === "radio" && (
            <div className="mb-5">
              {currentField.options?.map((option, index) => {
                return (
                  <div
                    className="flex gap-x-2"
                    key={`${currentField.kind}-${index}`}
                  >
                    <input
                      onChange={(e) => {
                        dispatch({
                          type: "SINGLE_SELECT",
                          id: currentField.id,
                          value: e.target.value,
                          callback: () => {
                            setCurrentField({
                              ...currentField,
                              value: e.target.value,
                            });
                          },
                        });
                      }}
                      type={currentField.kind}
                      id={`${currentField.label}-${index}`}
                      name={currentField.label}
                      value={option}
                      checked={currentField.value.includes(option)}
                    />
                    <label htmlFor={`${currentField.label}-${index}`}>
                      {option}
                    </label>
                  </div>
                );
              })}
            </div>
          )}
          {/* For checkbox */}
          {currentField.kind === "checkbox" && (
            <div>
              {currentField.options?.map((option, index) => {
                return (
                  <div
                    className="flex gap-x-2"
                    key={`${currentField.kind}-${index}`}
                  >
                    <input
                      onChange={(e) => {
                        if (e.target.checked) {
                          const updatedValues = [...currentField.value, option];
                          dispatch({
                            type: "MULTI_CHECKBOX",
                            id: currentField.id,
                            value: updatedValues,
                            callback: () => {
                              setCurrentField({
                                ...currentField,
                                value: updatedValues,
                              });
                            },
                          });
                        } else {
                          const updatedValues = currentField.value.filter(
                            (val) => val.id !== option.id
                          );
                          dispatch({
                            type: "MULTI_CHECKBOX",
                            id: currentField.id,
                            value: updatedValues,
                            callback: () => {
                              setCurrentField({
                                ...currentField,
                                value: updatedValues,
                              });
                            },
                          });
                        }
                      }}
                      type={currentField.kind}
                      id={`${currentField.label}-${index}`}
                      name={currentField.label}
                      value={option.value}
                      checked={handleChecked(option)}
                    />
                    <label htmlFor={`${currentField.label}-${index}`}>
                      {option.value}
                    </label>
                  </div>
                );
              })}
            </div>
          )}
          {/* For textarea */}
          {currentField.kind === "textarea" && (
            <div className="mb-5">
              <textarea
                onChange={(e) => {
                  dispatch({
                    type: "SINGLE_SELECT",
                    id: currentField.id,
                    value: e.target.value,
                    callback: () => {
                      setCurrentField({
                        ...currentField,
                        value: e.target.value,
                      });
                    },
                  });
                }}
                className="border mt-2 p-2 rounded-md w-full resize-none"
                rows={5}
                value={currentField.value}
                name={`${currentField.kind}-${currentField.label}`}
              />
            </div>
          )}
          {/* Bottom section */}
          <div className="flex justify-between">
            <div className="w-full">
              {currentIndex > 0 && (
                <button
                  onClick={(e) => {
                    dispatch({
                      type: "PREVIOUS",
                      callback: () => {
                        setCurrentField(state.formFields?.[currentIndex - 1]);
                        setCurrentIndex(currentIndex - 1);
                      },
                    });
                  }}
                  className="p-2 border bg-blue-500 text-white rounded-lg"
                >
                  Previous
                </button>
              )}
            </div>
            {currentIndex < state.formFields.length - 1 && (
              <button
                onClick={(e) => {
                  dispatch({
                    type: "NEXT",
                    callback: () => {
                      setCurrentField(state.formFields[currentIndex + 1]);
                      setCurrentIndex(currentIndex + 1);
                    },
                  });
                  // handleNext(e);
                }}
                className="p-2 border bg-blue-500 text-white rounded-lg"
              >
                Next
              </button>
            )}
            {currentIndex === state.formFields.length - 1 && (
              <button
                onClick={(e) => {
                  handleSubmit(e);
                }}
                className="p-2 border text-white rounded-lg bg-red-600"
              >
                Submit
              </button>
            )}
          </div>
        </>
      )}
    </div>
  );
}

export default Preview;
