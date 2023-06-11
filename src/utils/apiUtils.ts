import { PaginationParams } from "../types/common";
import { Form } from "../types/formTypes";

type methodType = "GET" | "POST" | "PATCH" | "PUT" | "DELETE";

const base_url = "https://tsapi.coronasafe.live/api/";

export const request = async (endpoint: string, method: methodType = "GET", data: any = {}) => {
    let url: string;
    let payload: string | null;
    if (method === "GET") {
        const requestParams = data ? "?" + Object.keys(data).map((key) => `${key}=${data[key]}`).join("&") : "";
        url = `${base_url}${endpoint}${requestParams}`;
        payload = null;
    } else {
        url = `${base_url}${endpoint}`;
        payload = data ? JSON.stringify(data) : "";
    }

    // Token Authentication
    const token = localStorage.getItem("token");
    const auth = token ? "Token " + localStorage.getItem("token") : "";

    const response = await fetch(
        url, {
        method: method,
        mode: "cors",
        headers: {
            "Content-Type": "application/json",
            Authorization: auth,
        },
        body: payload,
    });
    // console.log(response);
    if (response.ok) {
        const JSONResponse = await response.json();
        return JSONResponse;
    } else {
        const errorJSON = await response.json();
        console.log(errorJSON);
    }
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