import React, { useEffect, useReducer } from "react";
import { Form, updatedFormFields } from "../types/formTypes";
import { loadForm, loadFormfields, updateValue } from "../utils/apiUtils";
import { Pagination } from "../types/common";
import Multiselect from "multiselect-react-dropdown";

type State = {
  form: Form;
  formFields: updatedFormFields[];
  currentField: updatedFormFields;
  currentPosition: number;
};

type InitializeState = {
  type: "INITIALIZE_STATE";
  data: State;
};

type NextHandler = {
  type: "NEXT_FIELD";
};

type PreviousHandler = {
  type: "PREVIOUS_FIELD";
};

type TextChangeHandler = {
  type: "TEXT_CHANGE";
  id: number;
  value: string;
};

type Action =
  | InitializeState
  | NextHandler
  | PreviousHandler
  | TextChangeHandler;

const reducer = (state: State, action: Action) => {
  switch (action.type) {
    case "INITIALIZE_STATE": {
      return action.data;
    }
    case "NEXT_FIELD": {
      return {
        ...state,
        currentField: state.formFields[state.currentPosition + 1],
        currentPosition: state.currentPosition + 1,
      };
    }
    case "PREVIOUS_FIELD": {
      return {
        ...state,
        currentField: state.formFields[state.currentPosition - 1],
        currentPosition: state.currentPosition - 1,
      };
    }
    case "TEXT_CHANGE": {
      return {
        ...state,
        formFields: state.formFields.map((field) => {
          if (Number(field.id) === action.id) {
            return {
              ...field,
              value: action.value,
            };
          }
          return field;
        }),
        currentField: {
          ...state.currentField,
          value: action.value,
        },
      };
    }
  }
  return state;
};

function UpdatedPreview(props: { formId: string }) {
  const initialState: State = {
    form: {} as Form,
    formFields: [] as updatedFormFields[],
    currentField: {} as updatedFormFields,
    currentPosition: 0,
  };
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    initializerState(Number(props.formId))
      .then((data) => {
        dispatch({ type: "INITIALIZE_STATE", data });
      })
      .catch((err) => {
        console.log(err);
      });
  }, [props.formId]);

  const initializerState = async (id: number) => {
    const form: Form = await loadForm(id);
    const formFields: Pagination<updatedFormFields> = await loadFormfields(id);
    return {
      form,
      formFields: formFields.results,
      currentField: formFields.results[0],
      currentPosition: 0,
    };
  };

  const nextHandlerCB = () => {
    dispatch({ type: "NEXT_FIELD" });
  };

  const previousHandlerCB = () => {
    dispatch({ type: "PREVIOUS_FIELD" });
  };

  const textChangeHandler = (id: number, value: string) => {
    dispatch({ type: "TEXT_CHANGE", id, value });
    updateValue(state.form.id!, id, value)
      .then((data) => {
        console.log(data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="divide-y divide-dotted">
      <p className="text-2xl text-center my-4">{state.form.title}</p>
      <div>
        {state.currentField.kind === "TEXT" && (
          <TextField
            textChangeHandler={textChangeHandler}
            field={state.currentField}
          />
        )}
        {state.currentField.kind === "DROPDOWN" && (
          <MultiDropDown
            textChangeHandler={textChangeHandler}
            currentField={state.currentField}
          />
        )}
      </div>
      <FooterButtons
        nextHandlerCB={nextHandlerCB}
        previousHandlerCB={previousHandlerCB}
        currentPosition={state.currentPosition}
        formFields={state.formFields}
      />
    </div>
  );
}

function TextField(props: {
  field: updatedFormFields;
  textChangeHandler: (id: number, value: string) => void;
}) {
  return (
    <div className="pt-3">
      <label className="block text-xl" htmlFor={props.field.label}>
        {props.field.label}
      </label>
      <input
        onChange={(e) => {
          props.textChangeHandler(Number(props.field.id!), e.target.value);
        }}
        name={props.field.label}
        className="border w-full border-gray-200 rounded-lg p-2 mt-2 mb-4 flex-1"
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
    <div className="text-lg mb-5">
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

function FooterButtons(props: {
  // currentField: updatedFormFields;
  nextHandlerCB: () => void;
  previousHandlerCB: () => void;
  currentPosition: number;
  formFields: updatedFormFields[];
}) {
  return (
    <div className="flex justify-between pt-2">
      <div className="w-full">
        {props.currentPosition !== 0 && (
          <button
            onClick={props.previousHandlerCB}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            Previous
          </button>
        )}
      </div>
      {props.formFields.length - 1 !== props.currentPosition && (
        <button
          onClick={props.nextHandlerCB}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Next
        </button>
      )}
      {props.formFields.length - 1 === props.currentPosition && (
        <button className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">
          Submit
        </button>
      )}
    </div>
  );
}
export default UpdatedPreview;