import { Form, updatedFormFields } from "../../types/formTypes";

export type State = {
    form: Form;
    formFields: updatedFormFields[];
    currentField: updatedFormFields;
    currentPosition: number;
    submissionStatus: boolean;
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

type SubmissionHandler = {
    type: "SUBMISSION_HANDLER";
};

type Action =
    | InitializeState
    | NextHandler
    | PreviousHandler
    | TextChangeHandler
    | SubmissionHandler;

export const reducer = (state: State, action: Action) => {
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
        case "SUBMISSION_HANDLER": {
            return {
                ...state,
                submissionStatus: true,
            };
        }
    }
    return state;
};