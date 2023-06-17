import React from "react";
import { updatedFormFields } from "../../types/formTypes";
import Multiselect from "multiselect-react-dropdown";

type Props = {
  field: updatedFormFields;
  textChangeHandler: (id: number, value: string) => void;
  currentField: updatedFormFields;
};

function Field(props: Props) {
  switch (props.field.kind) {
    case "TEXT": {
      return <TextField {...props} />;
    }
    case "DROPDOWN": {
      return <MultiDropDown {...props} />;
    }
    case "RADIO": {
      return <RadioField {...props} />;
    }
  }
  return <></>;
}

function TextField(props: {
  field: updatedFormFields;
  textChangeHandler: (id: number, value: string) => void;
}) {
  return (
    <div className="text-lg my-4">
      <label className="block text-xl" htmlFor={props.field.label}>
        {props.field.label}
      </label>
      <input
        onChange={(e) => {
          props.textChangeHandler(Number(props.field.id!), e.target.value);
        }}
        name={props.field.label}
        className="border w-full border-gray-200 rounded-lg p-2 mt-2 flex-1"
        type={props.field.type}
        value={!props.field.value ? "" : props.field.value}
      />
    </div>
  );
}

function MultiDropDown(props: {
  currentField: updatedFormFields;
  textChangeHandler: (id: number, value: string) => void;
}) {
  type Option = {
    value: string;
  };

  const options = props.currentField.options?.map((option) => {
    return {
      value: option,
    };
  });

  const handleChange = (_: Option[], selectedOption: Option) => {
    console.log(selectedOption.value);
    props.textChangeHandler(
      Number(props.currentField.id!),
      selectedOption.value
    );
  };
  return (
    <div className="text-lg my-4">
      <label className="block text-xl mb-2" htmlFor={props.currentField.label}>
        {props.currentField.label}
      </label>
      <Multiselect
        options={options}
        displayValue="value"
        singleSelect={true}
        onSelect={handleChange}
        onRemove={handleChange}
      />
    </div>
  );
}

function RadioField(props: {
  currentField: updatedFormFields;
  textChangeHandler: (id: number, value: string) => void;
}) {
  return (
    <div className="mb-5">
      <label className="block text-xl mb-2" htmlFor={props.currentField.label}>
        {props.currentField.label}
      </label>
      {props.currentField.options?.map((option, index) => {
        return (
          <div
            className="flex gap-x-2"
            key={`${props.currentField.kind}-${index}`}
          >
            <input
              onChange={(e) => {
                props.textChangeHandler(
                  Number(props.currentField.id!),
                  e.target.value
                );
              }}
              type={props.currentField.kind.toLowerCase()}
              id={`${props.currentField.label}-${index}`}
              name={props.currentField.label}
              value={option}
              checked={props.currentField.value === option}
            />
            <label htmlFor={`${props.currentField.label}-${index}`}>
              {option}
            </label>
          </div>
        );
      })}
    </div>
  );
}

export default Field;
