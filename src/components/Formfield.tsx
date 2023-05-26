import React from "react";

function Formfield(props: {
  // type: string;
  // id: number;
  // labelText: string;
  removeFieldCB: (id: number) => void;
  // value: string;
  onChangeCB: (id: number, value: string) => void;
  fields: {
    id: number;
    label: string;
    type: string;
    value: string;
  };
}) {
  return (
    <>
      <label className="" htmlFor="">
        {props.fields.type}
      </label>
      <div className="flex gap-2 items-center">
        <input
          onChange={(event) => {
            props.onChangeCB(props.fields.id, event.target.value);
          }}
          value={props.fields.label}
          className="border border-gray-200 rounded-lg p-2 mt-2 mb-4 flex-1"
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
    </>
  );
}

export default Formfield;
