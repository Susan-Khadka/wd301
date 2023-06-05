import React, { useState, MouseEvent, useEffect } from "react";
import { FormData, FormField } from "../types/formTypes";
import { navigate } from "raviger";

import { getLocalForms, saveLocalForms } from "../utils/storageUtils";
import Multiselect from "multiselect-react-dropdown";

import { Option } from "../types/formTypes";

const currentForm: (id: number) => FormData = (id: number) => {
  const allLocalForms = getLocalForms();
  const selectedForm: FormData | undefined = allLocalForms.find(
    (form: FormData) => form.id === id
  );
  if (selectedForm === undefined) {
    navigate("/error");
    return allLocalForms[0];
  }
  return selectedForm;
};

const savetoLocalForms = (localForms: FormData[]) => {
  const allLocalForms: FormData[] = getLocalForms();
  const updatedLocalForms = allLocalForms.map((form) => {
    return form.id === localForms[0].id ? localForms[0] : form;
  });
  saveLocalForms(updatedLocalForms);
};

function Preview(props: { formId: number }) {
  //   currentForm(props.formId);
  const [form, setForm] = useState<FormData>(currentForm(props.formId));
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [currentField, setCurrentField] = useState(
    form.formFields[currentIndex]
  );
  const [submitStatus, setSubmitStatus] = useState(false);

  useEffect(() => {
    const timeout = setTimeout(() => {
      savetoLocalForms([form]);
    }, 1000);
    return () => {
      clearTimeout(timeout);
    };
  }, [form]);

  const handlePrevious: (e: MouseEvent) => void = (e: MouseEvent) => {
    e.preventDefault();
    setCurrentField(form.formFields?.[currentIndex - 1]);
    setCurrentIndex(currentIndex - 1);
  };

  const handleNext: (e: MouseEvent) => void = (e: MouseEvent) => {
    e.preventDefault();
    setCurrentField(form.formFields?.[currentIndex + 1]);
    setCurrentIndex(currentIndex + 1);
  };

  const updateHandleChanges = (id: number, value: string) => {
    if (
      currentField.kind !== "multiselectdrop" &&
      currentField.kind !== "checkbox"
    ) {
      setCurrentField({ ...currentField, value });
      const updatedFormFields = form.formFields.map((field) => {
        return id === field.id ? { ...field, value } : field;
      });
      setForm({ ...form, formFields: updatedFormFields as FormField[] });
    }
  };

  const multiSelectUpdate = (selectedList: Option[]) => {
    const updatedFormFields = form.formFields.map((field) => {
      return field.id === currentField.id
        ? { ...field, value: selectedList }
        : field;
    });
    setForm({ ...form, formFields: updatedFormFields as FormField[] });
  };

  const checkBoxUpdate = (updatedValues: Option[]) => {
    const updatedFormFields = form.formFields.map((field) => {
      return field.id === currentField.id
        ? { ...field, value: updatedValues }
        : field;
    });
    setForm({ ...form, formFields: updatedFormFields as FormField[] });
  };

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
    savetoLocalForms([form]);
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
          <p className="text-2xl text-center my-4">{form.title}</p>
          <label className="block text-xl" htmlFor={currentField.label}>
            {currentField.label}
          </label>
          {/* For text */}
          {currentField.kind === "text" && (
            <input
              onChange={(e) => {
                updateHandleChanges(currentField.id, e.target.value);
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
                onSelect={multiSelectUpdate}
                onRemove={multiSelectUpdate}
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
                  updateHandleChanges(currentField.id, e.target.value);
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
                        updateHandleChanges(currentField.id, e.target.value);
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
                          console.log(e.target.checked);
                          const updatedValues = [...currentField.value, option];
                          checkBoxUpdate(updatedValues);
                          setCurrentField({
                            ...currentField,
                            value: updatedValues,
                          });
                          console.log(updatedValues);
                        } else {
                          console.log(e.target.checked);
                          const updatedValues = currentField.value.filter(
                            (val) => val.id !== option.id
                          );
                          checkBoxUpdate(updatedValues);

                          console.log(updatedValues);
                          setCurrentField({
                            ...currentField,
                            value: updatedValues,
                          });
                          console.log(updatedValues);
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
                  updateHandleChanges(currentField.id, e.target.value);
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
                    handlePrevious(e);
                  }}
                  className="p-2 border bg-blue-500 text-white rounded-lg"
                >
                  Previous
                </button>
              )}
            </div>
            {currentIndex < form.formFields.length - 1 && (
              <button
                onClick={(e) => {
                  handleNext(e);
                }}
                className="p-2 border bg-blue-500 text-white rounded-lg"
              >
                Next
              </button>
            )}
            {currentIndex === form.formFields.length - 1 && (
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
