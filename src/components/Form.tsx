import React, { FormEvent } from "react";
import LabelledInput from "./LabelledInput";

function Form(props: {
  closeForm: () => void;
  formFields: { id: number; label: string; type: string }[];
}) {
  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    console.log("Form Submitted");
  };

  return (
    <>
      <form
        className="px-2 mt-4"
        onSubmit={(event) => {
          handleSubmit(event);
        }}
      >
        {props.formFields.map((fields) => {
          return (
            <LabelledInput
              key={fields.id}
              label={fields.label}
              type={fields.type}
            />
          );
        })}
        <div className="flex gap-x-4">
          <button
            type="submit"
            className="bg-blue-500 text-white rounded-lg px-4 py-2 m-2 text-lg"
          >
            Submit
          </button>
          <button
            className="bg-blue-500 text-white rounded-lg px-4 py-2 m-2 text-lg"
            onClick={props.closeForm}
          >
            Close Form
          </button>
        </div>
      </form>
    </>
  );
}

export default Form;
