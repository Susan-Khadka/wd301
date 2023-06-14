// import { v4 as uuidv4 } from "uuid";
import { Errors, Form, updatedFieldKind } from "../types/formTypes";


export const updatedKind: updatedFieldKind[] = ["TEXT", "DROPDOWN", "RADIO"];

export const validateForm: (form: Form) => Errors<Form> = (form: Form) => {
    const errors: Errors<Form> = {};
    if (form.title.length < 1) {
        errors.title = "Title is required";
    }
    if (form.title.length > 100) {
        errors.title = "Title must be less than 100 characters";
    }
    return errors;
}