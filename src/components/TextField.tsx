import React from "react";
import { updatedFormFields } from "../types/formTypes";
import Button from "../common/Button";

function TextField(props: {
  fields: updatedFormFields;
  updateLabelCB: (id: string, label: string) => void;
  removeFieldCB: (id: string) => void;
}) {
  return (
    <div className="mb-4 border p-2 rounded-lg bg-zinc-50">
      <label htmlFor={`${props.fields.type}-${props.fields.id}`}>
        {props.fields.kind}
      </label>
      <div className="flex gap-2 items-center">
        <input
          onChange={(event) => {
            props.updateLabelCB(props.fields.id!, event.target.value);
          }}
          id={`${props.fields.type}-${props.fields.id}`}
          name={`${props.fields.type}-${props.fields.id}`}
          value={props.fields.label}
          className="border border-gray-200 rounded-lg p-2 flex-1"
          type={"text"}
        />
        <Button
          name="delete"
          onClick={() => props.removeFieldCB(props.fields.id!)}
        />
      </div>
    </div>
  );
}

export default TextField;
