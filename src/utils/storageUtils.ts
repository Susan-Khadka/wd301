import { FormData } from "../types/formTypes";

export const getLocalForms: () => FormData[] = () => {
    const savedFormData: string = localStorage.getItem("savedForms") || "";
    const parsedFormData: FormData[] = JSON.parse(savedFormData);
    return parsedFormData;
};

export const saveLocalForms = (localForms: FormData[]) => {
    localStorage.setItem("savedForms", JSON.stringify(localForms));
};