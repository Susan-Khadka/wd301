import React, { useState } from "react";
import { updatedFormFields } from "../types/formTypes";

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
        <button
          onClick={() => props.removeFieldCB(props.fields.id!)}
          className="px-2 py-2 border rounded-md "
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
            />
          </svg>
        </button>
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
                <button
                  onClick={(event) => {
                    event.preventDefault();
                    props.deleteOptionCB(String(props.fields.id!), option);
                  }}
                  className="px-2 py-2 border rounded-md "
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    className="w-6 h-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                    />
                  </svg>
                </button>
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
        <button
          onClick={(event) => {
            event.preventDefault();
            // Adding new option props here
            props.addOptionCB(String(props.fields.id!), newOption);
            setNewOption("");
          }}
          className="bg-blue-500 text-white px-2 py-2 border rounded-md"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 4.5v15m7.5-7.5h-15"
            />
          </svg>
        </button>
      </div>
    </div>
  );
}

export default MultiselectComp;
