import React from "react";

function LabelledInput(props: {
  removeField: any;
  keyValue: number;
  label: string;
  type: string;
}) {
  return (
    <>
      <label className="" htmlFor="">
        {props.label}
      </label>
      <div className="flex gap-2 items-baseline">
        <input
          className="border border-gray-200 rounded-lg p-2 mt-2 mb-4 flex-1"
          type={props.type}
        />
        <button
          onClick={props.removeField(props.keyValue)}
          className="bg-blue-500 text-white rounded-lg px-4 py-3 text-md"
        >
          Delete
        </button>
      </div>
    </>
  );
}

export default LabelledInput;
