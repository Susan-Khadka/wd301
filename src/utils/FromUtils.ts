import { v4 as uuidv4 } from "uuid";
import { FormField, allFieldTypes, fieldKind, otherFieldTypes, textFieldTypes } from "../types/formTypes";

const textFields: textFieldTypes[] = [
    "text",
    "email",
    "number",
    "date",
    "tel",
    "password",
];
const otherFields: otherFieldTypes[] = [
    "radio",
    "dropdown",
    "checkbox",
    "textarea",
    "multiselectdrop",
];

export const allFields: allFieldTypes[] = [...textFields, ...otherFields];

export const getNewField = (kind: fieldKind, label: string) => {
    switch (kind) {
        case "text":
            return {
                kind,
                id: uuidv4(),
                label,
                type: "text",
                value: "",
            } as FormField;
        case "textarea":
            return {
                kind,
                id: uuidv4(),
                label,
                value: "",
                type: "textarea",
            } as FormField;
        case "checkbox":
            return {
                kind,
                id: uuidv4(),
                label,
                options: [
                    { id: uuidv4(), value: "High" },
                    { id: uuidv4(), value: "Low" },
                    { id: uuidv4(), value: "Medium" },
                ],
                value: [],
            } as FormField;
        case "multiselectdrop":
            return {
                kind,
                id: uuidv4(),
                label,
                options: [
                    { id: uuidv4(), value: "High" },
                    { id: uuidv4(), value: "Low" },
                    { id: uuidv4(), value: "Medium" },
                ],
                value: [],
            } as FormField;
        case "radio":
            return {
                kind,
                id: uuidv4(),
                label,
                options: ["Option 1", "Option 2", "Option 3"],
                value: "",
            } as FormField;
        case "dropdown":
            return {
                kind,
                id: uuidv4(),
                label,
                options: ["Option 1", "Option 2", "Option 3"],
                value: "",
            } as FormField;
    }
};

export const updateKind: (type: allFieldTypes) => fieldKind = (
    type: allFieldTypes
) => {
    switch (type) {
        case "text":
            return "text";
        case "email":
            return "text";
        case "number":
            return "text";
        case "date":
            return "text";
        case "tel":
            return "text";
        case "password":
            return "text";
        case "radio":
            return "radio";
        case "dropdown":
            return "dropdown";
        case "checkbox":
            return "checkbox";
        case "textarea":
            return "textarea";
        case "multiselectdrop":
            return "multiselectdrop";
    }
};