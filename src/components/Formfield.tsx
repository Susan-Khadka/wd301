import React from "react";

function Formfield(props : {
    type: string,
    id: number,
    labelText: string,
    removeFieldCB: any
}) {
  return (
    <React.Fragment key={props.id}>
      <label className="" htmlFor="">
        {props.labelText}
      </label>
      <div className="flex gap-2 items-baseline">
        <input
          className="border border-gray-200 rounded-lg p-2 mt-2 mb-4 flex-1"
          type={props.type}
        />
        <button
          onClick={() => props.removeFieldCB(props.id)}
          className="px-2 py-2 border rounded-md"
        >
          Delete
        </button>
      </div>
    </React.Fragment>
  );
}

export default Formfield;
