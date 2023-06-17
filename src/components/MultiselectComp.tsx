import React, { useState } from "react";
import { updatedFormFields } from "../types/formTypes";
import Button from "../common/Button";

type Props = {
  fields: updatedFormFields;
  updateLabelCB: (id: string, label: string) => void;
  addOptionCB: (id: string, option: string) => void;
  editOptionCB: (id: string, oldValue: string, newValue: string) => void;
  deleteOptionCB: (id: string, option: string) => void;
  // optionUpdateCB: (id: string, options: Option[]) => void;
  removeFieldCB: (id: string) => void;
};

function MultiselectComp(props: Props) {
  const [newOption, setNewOption] = useState<string>("");
  // const [options, setOptions] = useState
  return (
    <div className="mb-4 border p-2 rounded-lg bg-zinc-50">
      <label htmlFor={`${props.fields.kind}-${props.fields.id}`}>
        {props.fields.kind}
      </label>
      <div className="flex gap-2 items-center">
        <input
          onChange={(event) => {
            props.updateLabelCB(props.fields.id!, event.target.value);
          }}
          id={`${props.fields.kind}-${props.fields.id}`}
          name={`${props.fields.kind}-${props.fields.id}`}
          value={props.fields.label}
          className="border border-gray-200 rounded-lg p-2 flex-1"
          type={"text"}
        />
        <Button
          name="delete"
          onClick={() => props.removeFieldCB(props.fields.id!)}
        />
      </div>
      <div className="mt-3 ml-4">
        <p>Options</p>
        {props.fields.options &&
          props.fields.options.map((option, index) => {
            return (
              <div key={`${index}`} className="flex gap-2 items-center my-2">
                <input
                  className="border border-gray-200 rounded-lg p-2 flex-1"
                  type="text"
                  name={`${props.fields.kind}- ${index}`}
                  id={`${props.fields.kind}- ${index}`}
                  value={option}
                  onChange={(event) => {
                    props.editOptionCB(
                      String(props.fields.id!),
                      event.target.value,
                      option
                    );
                  }}
                />
                <Button
                  name="delete"
                  onClick={() =>
                    props.deleteOptionCB(String(props.fields.id!), option)
                  }
                />
              </div>
            );
          })}
      </div>
      <div className="mt-2 flex gap-2 ml-4">
        <input
          className="w-11/12 border border-gray-200 rounded-lg p-2 flex-1"
          value={newOption}
          type="text"
          placeholder="Add new option"
          onChange={(event) => setNewOption(event.target.value)}
        />
        <Button
          name="add"
          onClick={(e) => {
            e?.preventDefault();
            props.addOptionCB(String(props.fields.id!), newOption);
            setNewOption("");
          }}
        />
      </div>
    </div>
  );
}

export default MultiselectComp;
