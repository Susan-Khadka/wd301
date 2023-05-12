import React from "react";

function LabelledInput(props: { key: number; label: string; type: string }) {
  return (
    <React.Fragment key={props.key}>
      <label className="" htmlFor="">
        {props.label}
      </label>
      <input
        className="border border-gray-200 rounded-lg p-2 mt-2 mb-4 w-full"
        type={props.type}
      />
    </React.Fragment>
  );
}

export default LabelledInput;
