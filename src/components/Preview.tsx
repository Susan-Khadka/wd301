import React, { useState, MouseEvent } from "react";
import { FormData, FormField } from "../types/formTypes";

// Get the saved forms from local storage
const getLocalForms: () => FormData[] = () => {
  const savedFormData = localStorage.getItem("savedForms");
  return savedFormData ? JSON.parse(savedFormData) : [];
};

const findSelectedForm = (id: number) => {
  const localForms = getLocalForms();
  const selectedForm = localForms.find((form: FormData) => form.id === id);
  return selectedForm ? selectedForm : localForms[0];
};

const saveLocalForms = (form: FormData) => {
  // const localForms = getLocalForms();
  console.log(form);
  // localStorage.setItem("savedForms", JSON.stringify(localForms));
};

function Preview(props: { formId: number }) {
  const [form, setForm] = useState(findSelectedForm(props.formId));
  const formFields = form.formFields;
  const [currentFieldIndex, setCurrentFieldIndex] = useState<number>(0);
  const [currentField, setCurrentField] = useState(
    formFields?.[currentFieldIndex]
  );

  // console.log(formFields);

  const handlePrevious: (e: MouseEvent) => void = (e: MouseEvent) => {
    e.preventDefault();
    setCurrentField(formFields?.[currentFieldIndex - 1]);
    setCurrentFieldIndex(currentFieldIndex - 1);
  };

  const handleNext: (e: MouseEvent) => void = (e: MouseEvent) => {
    e.preventDefault();
    setCurrentField(formFields?.[currentFieldIndex + 1]);
    setCurrentFieldIndex(currentFieldIndex + 1);
  };

  const handleOnChange = (id: number, value: string) => {
    console.log("Before: " + formFields?.[currentFieldIndex]);
    setCurrentField({ ...currentField, value });
    setForm({
      ...form,
      formFields: formFields.map((field: FormField) => {
        return id === field.id ? { ...field, value } : field;
      }),
    });
    saveLocalForms(form);
  };

  // const onChangeCB = (id: number, label: string) => {
  //   setFields({
  //     ...fields,
  //     formFields: fields.formFields.map((field: FormField) => {
  //       if (field.id === id) {
  //         return {
  //           ...field,
  //           label,
  //         };
  //       }
  //       return field;
  //     }),
  //   });
  // };

  return (
    <div className="mx-2">
      <p className="text-2xl text-center my-4">{form.title}</p>
      <label className="block" htmlFor={currentField.label}>
        {currentField.label}
      </label>
      <input
        onChange={(e) => {
          handleOnChange(currentField.id, e.target.value);
        }}
        name={currentField.label}
        value={currentField.value}
        className="border w-full border-gray-200 rounded-lg p-2 mt-2 mb-4 flex-1"
        type={currentField?.type}
      />
      <div className="flex justify-between">
        <div className="w-full">
          {currentFieldIndex > 0 && (
            <button
              onClick={(e) => {
                handlePrevious(e);
              }}
              className="p-2 border rounded-lg"
            >
              Previous
            </button>
          )}
        </div>
        {currentFieldIndex < formFields.length - 1 && (
          <button
            onClick={(e) => {
              handleNext(e);
            }}
            className="p-2 border rounded-lg"
          >
            Next
          </button>
        )}
      </div>
    </div>
  );
}

export default Preview;
