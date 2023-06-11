import React, { FormEvent, useState } from "react";
import { Errors, Form } from "./types/formTypes";
import { validateForm } from "./utils/FromUtils";
import { navigate } from "raviger";
import { createForm } from "./utils/apiUtils";

export default function CreateForm() {
  const [form, setForm] = useState<Form>({
    title: "",
    description: "",
    is_public: true,
  });

  const [errors, setErrors] = useState<Errors<Form>>({});

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const validationErrors: Errors<Form> = validateForm(form);
    if (Object.keys(validationErrors).length === 0) {
      // Basic Auth Credentials
      try {
        const data = await createForm(form);
        navigate(`/forms/${data.id}`);
      } catch (error) {
        console.log("The error is from CreateForm.tsx Line 25");
        console.log(error);
      }
    }
  };

  return (
    <div className="w-full divide-y divide-gray-200">
      <h1 className="text-2xl text-gray-700 text-center my-2">Create Form</h1>
      <form className="py-4" onSubmit={handleSubmit}>
        <div className="mb-4 w-full">
          <label
            htmlFor="title"
            className={`${errors.title ? "text-red-500" : ""} text-xl`}
          >
            Title
          </label>
          <input
            className="w-full border-2 border-gray-200 rounded-lg p-2 my-2 flex-1"
            name="title"
            id="title"
            value={form.title}
            type="text"
            onChange={(e) => {
              setForm({ ...form, title: e.target.value });
            }}
          />
          {errors.title && <p className="text-red-500">{errors.title}</p>}
        </div>
        <div className="mb-4">
          <label
            className={`${errors.description ? "text-red-500" : ""} text-xl`}
            htmlFor="description"
          >
            Description
          </label>
          <input
            className="w-full border-2 border-gray-200 rounded-lg p-2 my-2 flex-1"
            type="text"
            name="description"
            id="description"
            value={form.description}
            onChange={(e) => {
              setForm({ ...form, description: e.target.value });
            }}
          />
          {errors.description && (
            <p className="text-red-500">{errors.description}</p>
          )}
        </div>
        <div className="flex gap-2 mb-4">
          <input
            className="w-4 "
            type="checkbox"
            name="is_public"
            id="is_public"
            value={form.is_public ? "true" : "false"}
          />
          <label className="text-xl" htmlFor="is_public">
            Public
          </label>
          {errors.is_public && (
            <p className="text-red-500">{errors.is_public}</p>
          )}
        </div>
        <div className=" flex my-2">
          <button
            className="px-4 text-xl bg-blue-500 text-white py-2 border rounded-md"
            type="submit"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
}
