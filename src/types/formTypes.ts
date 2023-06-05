export type FormData = {
    id: number;
    title: string;
    formFields: FormField[];
}

export type TextField = {
    kind: "text";
    id: number;
    label: string;
    type: textFieldTypes;
    value: string;
}

export type DropdownField = {
    kind: "dropdown";
    id: number;
    label: string;
    options: string[];
    value: string;
}

export type radioField = {
    kind: "radio";
    id: number;
    label: string;
    options: string[];
    value: string;
}

export type checkboxField = {
    kind: "checkbox";
    id: number;
    label: string;
    options: Option[];
    value: Option[];
}

export type TextArea = {
    kind: "textarea";
    type: "textarea";
    id: number;
    label: string;
    value: string;
}

export type Option = {
    id: string;
    value: string;
}

export type MultiSelectDrop = {
    kind: "multiselectdrop";
    id: number;
    label: string;
    options: Option[];
    value: Option[];
}

export type textFieldTypes = "text" | "email" | "password" | "number" | "tel" | "date";

export type otherFieldTypes = "dropdown" | "radio" | "checkbox" | "textarea" | "multiselectdrop";

export type allFieldTypes = textFieldTypes | otherFieldTypes;

export type FormField = TextField | DropdownField | radioField | checkboxField | TextArea | MultiSelectDrop;
