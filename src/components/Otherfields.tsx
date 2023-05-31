import React, { ChangeEvent, useState } from "react";
import { DropdownField, MultiselectDropdown, checkboxField, radioField } from "../types/formTypes";

function Otherfields(props: {
  fields: DropdownField | radioField | checkboxField | MultiselectDropdown;
  onChangeCB: (id: number, value: string) => void;
  removeFieldCB: (id: number) => void;
  optionChangeCB: (id: number, options: string[]) => void;
  deleteOptionCB: (id: number, options: string[]) => void;
  addOptionCB: (id: number, options: string[]) => void;
}) {
  const [options, setOptions] = useState<string[]>(props.fields.options);
  const [newOption, setNewOption] = useState<string>("");

  const updatedOptionsList: (
    event: ChangeEvent<HTMLInputElement>,
    index: number
  ) => string[] = (event, index) => {
    const newOptions = props.fields.options.map((option, i) => {
      if (i === index) {
        return event.target.value;
      }
      return option;
    });
    return newOptions;
  };

  return (
    <div className="mb-4 border p-2 rounded-lg bg-zinc-50">
      <label className="" htmlFor={`${props.fields.kind}-${props.fields.id}`}>
        {props.fields.kind}
      </label>
      <div className="flex gap-2 items-center">
        <input
          onChange={(event) => {
            props.onChangeCB(props.fields.id, event.target.value);
          }}
          id={`${props.fields.kind}-${props.fields.id}`}
          name={`${props.fields.kind}-${props.fields.id}`}
          value={props.fields.label}
          className="border border-gray-200 rounded-lg p-2 flex-1"
          type={"text"}
        />
        <button
          onClick={() => props.removeFieldCB(props.fields.id)}
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
        {options.map((option, index) => {
          return (
            <div
              className="flex gap-2 items-center my-2"
              key={`${props.fields.kind}- ${index}`}
            >
              <input
                className="border border-gray-200 rounded-lg p-2 flex-1"
                type="text"
                name={`${props.fields.kind}- ${index}`}
                id={`${props.fields.kind}- ${index}`}
                value={option}
                onChange={(event) => {
                  const updatedOptions = updatedOptionsList(event, index);
                  setOptions(updatedOptions);
                  props.optionChangeCB(props.fields.id, updatedOptions);
                }}
              />
              <button
                onClick={(event) => {
                  event.preventDefault();
                  const newOptions = props.fields.options.filter(
                    (option, i) => {
                      return i !== index ? option : null;
                    }
                  );
                  setOptions(newOptions);
                  props.deleteOptionCB(props.fields.id, newOptions);
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
          onChange={(event) => {
            setNewOption(event.target.value);
          }}
        />
        <button
          onClick={(event) => {
            event.preventDefault();
            const updatedOptions = [...options, newOption];
            setOptions(updatedOptions);
            props.addOptionCB(props.fields.id, updatedOptions);
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

export default Otherfields;
