import React, { useState, MouseEvent, useEffect } from "react";
import { FormData, FormField } from "../types/formTypes";
import { navigate } from "raviger";

import { getLocalForms, saveLocalForms } from "../utils/storageUtils";

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

  // Need to split this function into two functions
  const handleChanges = (id: number, value: string) => {
    if (currentField.kind === "checkbox") {
      if (currentField.value.includes(value)) {
        // let updatedFormFields: FormField[];
        const valuesArray = currentField.value.split(" ");
        const updatedArray = valuesArray.filter(
          (currentValue) => currentValue !== value
        );
        setCurrentField({
          ...currentField,
          value: `${updatedArray.join(" ")}`,
        });
        let updatedFormFields = form.formFields.map((field) => {
          return id === field.id
            ? { ...field, value: `${updatedArray.join(" ")}` }
            : field;
        });
        setForm({ ...form, formFields: updatedFormFields as FormField[] });
      } else {
        if (currentField.value.length === 0) {
          setCurrentField({
            ...currentField,
            value,
          });
          const updatedFormFields = form.formFields.map(
            (field) => {
              return id === field.id ? { ...field, value } : field;
            }
          );
          setForm({ ...form, formFields: updatedFormFields as FormField[] });
        } else {
          setCurrentField({
            ...currentField,
            value: `${currentField.value} ${value}`,
          });
          const updatedFormFields= form.formFields.map(
            (field) => {
              return id === field.id
                ? { ...field, value: `${currentField.value} ${value}` }
                : field;
            }
          );
          setForm({ ...form, formFields: updatedFormFields as FormField[] });
        }
      }
      console.log(currentField);
    } else if(currentField.kind !== "multiselectdrop") {
      setCurrentField({ ...currentField, value });
      const updatedFormFields = form.formFields.map((field) => {
        return id === field.id ? { ...field, value } : field;
      });
      setForm({ ...form, formFields: updatedFormFields as FormField[] });
    }
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
          <label className="block" htmlFor={currentField.label}>
            {currentField.label}
          </label>
          {currentField.kind === "text" && (
            <input
              onChange={(e) => {
                handleChanges(currentField.id, e.target.value);
              }}
              name={currentField.label}
              value={currentField.value}
              className="border w-full border-gray-200 rounded-lg p-2 mt-2 mb-4 flex-1"
              type={currentField.type}
            />
          )}
          {currentField.kind === "dropdown" && (
            <div>
              {/* Need to add dropdown here  */}
              <select
                defaultValue={currentField.value}
                onChange={(e) => {
                  handleChanges(currentField.id, e.target.value);
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
          {(currentField.kind === "radio" || currentField.kind === "checkbox") && (
            <div className="mb-5">
              {currentField.options?.map((option, index) => {
                return (
                  <div
                    className="flex gap-x-2"
                    key={`${currentField.kind}-${index}`}
                  >
                    <input
                      onChange={(e) => {
                        handleChanges(currentField.id, e.target.value);
                      }}
                      type={currentField.kind}
                      id={`${currentField.label}-${index}`}
                      name={currentField.label}
                      value={option}
                      checked={currentField.value === option}
                    />
                    <label htmlFor={`${currentField.label}-${index}`}>
                      {option}
                    </label>
                  </div>
                );
              })}
            </div>
          )}
          {/* {currentField.kind === "checkbox" && (
            <div className="mb-5">
              {currentField.options?.map((option, index) => {
                return (
                  <div
                    className="flex gap-x-3"
                    key={`${currentField.kind}-${index}`}
                  >
                    <input
                      onChange={(e) => {
                        handleChanges(currentField.id, e.target.value);
                      }}
                      type="checkbox"
                      id={`${currentField.label}-${index}`}
                      name={`${currentField.label}-${index}`}
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
          )} */}
          {currentField.kind === "textarea" && (
            <div className="mb-5">
              <textarea
                onChange={(e) => {
                  handleChanges(currentField.id, e.target.value);
                }}
                className="border mt-2 p-2 rounded-md w-full resize-none"
                rows={5}
                value={currentField.value}
                name={`${currentField.kind}-${currentField.label}`}
              />
            </div>
          )}
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
