import { PaginationParams } from "../types/common";
import { Form, updatedFormFields } from "../types/formTypes";

type methodType = "GET" | "POST" | "PATCH" | "PUT" | "DELETE";

const base_url = "https://tsapi.coronasafe.live/api/";

export const request = async (endpoint: string, method: methodType = "GET", data: any = {}) => {
    let url: string;
    if (method === "GET") {
        const requestParams = data ? "?" + Object.keys(data).map((key) => `${key}=${data[key]}`).join("&") : "";
        url = `${base_url}${endpoint}${requestParams}`;
    } else {
        url = `${base_url}${endpoint}`;
    }
    // Token Authentication
    const token = localStorage.getItem("token");
    const auth = token ? `Token ${token}` : "";

    const response = await fetch(
        url, {
        method,
        headers: {
            "Content-Type": "application/json",
            Authorization: auth,
        },
        body: method !== "GET" ? JSON.stringify(data) : undefined,
    });
    if (response.ok) {
        return await response.json();
    }

    throw new Error(response.statusText);
}

export const createForm = async (form: Form) => {
    const response = await request("forms/", "POST", form);
    return response;
}

export const login = async (credentials: object) => {
    const response = await request("auth-token/", "POST", credentials);
    return response;
}

export const register = async (credentials: object) => {
    const response = await request("auth/registration/", "POST", credentials);
    return response;
}

export const me = async () => {
    const response = await request("users/me/");
    return response;
}

export const listForms = async (params: PaginationParams) => {
    const response = await request("forms/", "GET", params);
    return response;
}

export const loadForm: (id: number) => Promise<Form> = async (id) => {
    const form: Form = await request(`forms/${id}/`);
    return form;
}

export const loadFormfields = async (id: number) => {
    const formfields = await request(`forms/${id}/fields/`);
    return formfields;
}

export const updateForm = async (id: number, form: Form) => {
    const response = await request(`forms/${id}/`, "PATCH", form);
    return response;
}
export const updateTitle = async (id: number, title: Form["title"]) => {
    const response = await request(`forms/${id}/`, "PATCH", { title });
    return response;
}

export const updateDescription = async (id: number, description: Form["description"]) => {
    const response = await request(`forms/${id}/`, "PATCH", { description });
    return response;
}

export const createField = async (id: number, field: updatedFormFields) => {
    const response = await request(`forms/${id}/fields/`, "POST", field);
    console.log(response);
    return response;
}

export const deleteField = async (formid: number, id: number) => {
    const response = await request(`forms/${formid}/fields/${id}/`, "DELETE");
    return response;
}

export const deleteForm = async (id: number) => {
    const response = await request(`forms/${id}/`, "DELETE");
    return response;
}


export const updateLabel = async (formid: number, id: number, label: updatedFormFields["label"]) => {
    const response = await request(`forms/${formid}/fields/${id}/`, "PATCH", { label });
    return response;
}

export const updateOption = async (formid: number, id: number, options: string[]) => {
    const response = await request(`forms/${formid}/fields/${id}/`, "PATCH", {options});
    return response;
}
