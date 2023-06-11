export type FormData = {
    id: string;
    title: string;
    formFields: FormField[];
}

export type Form = {
    id?: number;
    title: string;
    description?: string;
    is_public?: boolean;
}

export type Errors<T> = Partial<Record<keyof T, string>>;

// export type updateFormData = {
//     id: number;
//     title: string;
// }

export type TextField = {
    kind: "text";
    id: string;
    label: string;
    type: textFieldTypes;
    value: string;
}

export type DropdownField = {
    kind: "dropdown";
    id: string;
    label: string;
    options: string[];
    value: string;
}

export type radioField = {
    kind: "radio";
    id: string;
    label: string;
    options: string[];
    value: string;
}

export type checkboxField = {
    kind: "checkbox";
    id: string;
    label: string;
    options: Option[];
    value: Option[];
}

export type TextArea = {
    kind: "textarea";
    type: "textarea";
    id: string;
    label: string;
    value: string;
}

export type Option = {
    id: string;
    value: string;
}

export type MultiSelectDrop = {
    kind: "multiselectdrop";
    id: string;
    label: string;
    options: Option[];
    value: Option[];
}

export type fieldKind = "text" | "dropdown" | "radio" | "checkbox" | "textarea" | "multiselectdrop";

export type textFieldTypes = "text" | "email" | "password" | "number" | "tel" | "date";

export type otherFieldTypes = "dropdown" | "radio" | "checkbox" | "textarea" | "multiselectdrop";

export type allFieldTypes = textFieldTypes | otherFieldTypes;

export type FormField = TextField | DropdownField | radioField | checkboxField | TextArea | MultiSelectDrop;
