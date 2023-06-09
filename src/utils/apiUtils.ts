import { Form } from "../types/formTypes";

type methodType = "GET" | "POST" | "PATCH" | "PUT" | "DELETE";

const base_url = "https://tsapi.coronasafe.live/api/";

export const request = async (endpoint: string, method: methodType = "GET", data: any = {}) => {
    let url: string;
    let payload: string;
    if (method === "GET") {
        const requestParams = data ? Object.keys(data).map((key) => `${key}=${data[key]}`).join("&") : "";
        url = `${base_url}${endpoint}${requestParams}`;
        payload = "";
    } else {
        url = `${base_url}${endpoint}`;
        payload = data ? JSON.stringify(data) : "";
    }
    const auth = "Basic " + window.btoa("abhinabhkhadka:7622070652@Ss");
    const response = await fetch(
        url, {
        method: "POST",
        mode: "cors",
        headers: {
            "Content-Type": "application/json",
            Authorization: auth,
        },
        body: payload,
    });
    if (response.ok) {
        const JSONResponse = await response.json();
        return JSONResponse;
    } else {
        const errorJSON = await response.json();
        throw Error(errorJSON);
    }
}

export const createForm = async (form: Form) => {
    const response = await request("form", "POST", form);
    return response;
}