import React, { useEffect, useReducer } from "react";
import { Form, updatedFormFields } from "../../types/formTypes";
import { loadForm, loadFormfields, updateValue } from "../../utils/apiUtils";
import { Pagination } from "../../types/common";
import { reducer, State } from "./reducer";
import Field from "./Field";

const initializerState = async (id: number) => {
  const form: Form = await loadForm(id);
  const formFields: Pagination<updatedFormFields> = await loadFormfields(id);
  return {
    form,
    formFields: formFields.results,
    currentField: formFields.results[0],
    currentPosition: 0,
    submissionStatus: false,
  };
};

function UpdatedPreview(props: { formId: string }) {
  const initialState: State = {
    form: {} as Form,
    formFields: [] as updatedFormFields[],
    currentField: {} as updatedFormFields,
    currentPosition: 0,
    submissionStatus: false,
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

  const submissionHandlerCB = () => {
    dispatch({ type: "SUBMISSION_HANDLER" });
  };

  return (
    <div className="divide-y divide-dotted">
      <p className="text-2xl text-center my-4">{state.form.title}</p>
      <p className="text-lg text-start py-4">{state.form.description}</p>
      <div>
        {
          <Field
            field={state.currentField}
            currentField={state.currentField}
            textChangeHandler={textChangeHandler}
          />
        }
      </div>
      <FooterButtons
        submissionHandlerCB={submissionHandlerCB}
        nextHandlerCB={nextHandlerCB}
        previousHandlerCB={previousHandlerCB}
        currentPosition={state.currentPosition}
        formFields={state.formFields}
      />
    </div>
  );
}

function FooterButtons(props: {
  currentPosition: number;
  formFields: updatedFormFields[];
  previousHandlerCB: () => void;
  nextHandlerCB: () => void;
  submissionHandlerCB: () => void;
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
