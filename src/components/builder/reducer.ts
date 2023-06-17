import { Form, updatedFormFields, updatedFieldKind } from "../../types/formTypes";


export type State = {
    form: Form;
    formFields: updatedFormFields[];
};

type InitializeState = {
    type: "INITIALIZE_STATE";
    data: State;
};

type UpdateTitleAction = {
    type: "UPDATE_TITLE";
    title: string;
};

type UpdateDescriptionAction = {
    type: "UPDATE_DESC";
    description: string;
};

type AddFieldAction = {
    type: "ADD_FIELD";
    id: number;
    kind: updatedFieldKind;
    label: string;
};

type DeleteFieldAction = {
    type: "DELETE_FIELD";
    formId: number;
    fieldId: number;
};

type updateFieldAction = {
    type: "UPDATE_FIELD";
    id: string;
    label: string;
};

type AddOptionAction = {
    type: "ADD_OPTION";
    id: string;
    option: string;
};

type DeleteOptionAction = {
    type: "DELETE_OPTION";
    value: string;
    id: string;
};

type EditOptionAction = {
    type: "EDIT_OPTION";
    id: string;
    newValue: string;
    oldValue: string;
};

type Action =
    | AddFieldAction
    | InitializeState
    | UpdateTitleAction
    | UpdateDescriptionAction
    | DeleteFieldAction
    | updateFieldAction
    | AddOptionAction
    | DeleteOptionAction
    | EditOptionAction;

export const reducer = (state: State, action: Action) => {
    switch (action.type) {
        case "INITIALIZE_STATE": {
            return action.data;
        }
        case "UPDATE_TITLE": {
            return {
                ...state,
                form: {
                    ...state.form,
                    title: action.title,
                },
            };
        }
        case "ADD_FIELD": {
            const newField: updatedFormFields = {
                id: String(action.id),
                label: action.label,
                kind: action.kind,
                options: [],
                type: action.kind,
            };
            return {
                ...state,
                formFields: [...state.formFields, newField],
            };
        }
        case "DELETE_FIELD": {
            return {
                ...state,
                formFields: state.formFields.filter((formFields: updatedFormFields) => {
                    return Number(formFields.id!) !== action.fieldId;
                }),
            };
        }
        case "UPDATE_DESC": {
            return {
                ...state,
                form: {
                    ...state.form,
                    description: action.description,
                },
            };
        }
        case "UPDATE_FIELD": {
            return {
                ...state,
                formFields: state.formFields.map((formFields: updatedFormFields) => {
                    if (formFields.id === action.id) {
                        return {
                            ...formFields,
                            label: action.label,
                        };
                    }
                    return formFields;
                }),
            };
        }
        case "ADD_OPTION": {
            return {
                ...state,
                formFields: state.formFields.map((formFields: updatedFormFields) => {
                    if (Number(formFields.id!) === Number(action.id)) {
                        if (
                            formFields.options === undefined ||
                            formFields.options === null
                        ) {
                            return {
                                ...formFields,
                                options: [action.option],
                            };
                        } else {
                            return {
                                ...formFields,
                                options: [...formFields.options, action.option],
                            };
                        }
                    } else {
                        return formFields;
                    }
                }),
            };
        }
        case "DELETE_OPTION": {
            return {
                ...state,
                formFields: state.formFields.map((formFields: updatedFormFields) => {
                    if (Number(formFields.id) === Number(action.id)) {
                        return {
                            ...formFields,
                            options: formFields.options?.filter(
                                (opt) => opt !== action.value
                            ),
                        };
                    }
                    return formFields;
                }),
            };
        }
        case "EDIT_OPTION": {
            return {
                ...state,
                formFields: state.formFields.map((formFields: updatedFormFields) => {
                    if (Number(formFields.id) === Number(action.id)) {
                        return {
                            ...formFields,
                            options: formFields.options?.map((opt) => {
                                if (opt === action.oldValue) {
                                    return action.newValue;
                                }
                                return opt;
                            }),
                        };
                    }
                    return formFields;
                }),
            };
        }
    }
    return state;
};