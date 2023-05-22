
export type FormData = {
    id: number;
    title: string;
    formFields: FormField[];
}

export type FormField = {
    id: number;
    label: string;
    type: string;
    value: string;
}