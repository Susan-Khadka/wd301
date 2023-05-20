import React, { FormEvent, useState } from "react";
import LabelledInput from "./LabelledInput";
import Formfield from "./Formfield";

function Form(props: { closeForm: () => void }) {
  const formFields = [
    { id: 1, label: "First Name", type: "text" },
    { id: 2, label: "Last Name", type: "text" },
    { id: 3, label: "Email", type: "email" },
    { id: 4, label: "Date of Birth", type: "date" },
    { id: 5, label: "Contact No", type: "tel" },
  ];

  const [fields, setFields] = useState([...formFields]);

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    console.log("Form Submitted");
  };

  const addField = () => {
    setFields([
      ...fields,
      {
        id: Number(new Date()),
        label: "Address",
        type: "text",
      },
    ]);
  };

  const removeField = (id: number) => {
    setFields(fields.filter((field) => field.id !== id));
  };

  return (
    <>
      <form
        className="px-2 mt-4"
        onSubmit={(event) => {
          handleSubmit(event);
        }}
      >
        {fields.map((fields) => {
          return (
            <Formfield removeFieldCB={removeField} id={fields.id}  labelText={fields.label}  type={fields.type}  />
            // <React.Fragment key={fields.id}>
            //   <label className="" htmlFor="">
            //     {fields.label}
            //   </label>
            //   <div className="flex gap-2 items-baseline">
            //     <input
            //       className="border border-gray-200 rounded-lg p-2 mt-2 mb-4 flex-1"
            //       type={fields.type}
            //     />
            //     <button
            //       onClick={() => removeField(fields.id)}
            //       className="px-2 py-2 border rounded-md"
            //     >
            //       Delete
            //     </button>
            //   </div>
            // </React.Fragment>
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
          <button
            className="bg-blue-500 text-white rounded-lg px-4 py-2 m-2 text-lg"
            onClick={addField}
          >
            Add Field
          </button>
        </div>
      </form>
    </>
  );
}

export default Form;
