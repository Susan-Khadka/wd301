import React, { useState } from "react";
import FormCard from "./FormCard";
import { FormData, FormField } from "../types/formTypes";
import { navigate, useQueryParams } from "raviger";
import { getLocalForms, saveLocalForms } from "../utils/storageUtils";

// Initial form fields for a form
const initialFormFields: FormField[] = [
  { id: 1, label: "First Name", type: "text", value: "", kind: "text" },
  { id: 2, label: "Last Name", type: "text", value: "", kind: "text" },
  {
    id: 3,
    label: "Priority",
    options: ["High", "Low", "Medium"],
    value: "",
    kind: "dropdown",
  },
  {
    id: 4,
    label: "Priority",
    options: ["High", "Low", "Medium"],
    value: "",
    kind: "radio",
  },
  {
    id: 5,
    label: "Priority",
    options: ["High", "Low", "Medium"],
    value: "",
    kind: "checkbox",
  },
];

function Home() {
  const [formData, setFormData] = useState<FormData[]>([...getLocalForms()]);
  const [{ search }, setQuery] = useQueryParams();
  const [searchTerm, setSearchTerm] = useState("");

  // Add a new form
  const addForms = () => {
    const localForms = getLocalForms();
    const newForm = {
      id: Number(new Date()),
      title: "Untitled Form",
      formFields: initialFormFields,
    };

    setFormData([...localForms, newForm]);
    saveLocalForms([...localForms, newForm]);
    navigate(`/form/${newForm.id}`);
  };

  // Delete a form
  const deleteForm = (id: number) => {
    const updatedLocalForms = formData.filter(
      (form: FormData) => form.id !== id
    );
    setFormData(updatedLocalForms);
    saveLocalForms(updatedLocalForms);
  };
  return (
    <div>
      <div className="flex-col my-3 gap-4">
        <div className="my-10">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              setQuery({ search: searchTerm });
            }}
            method="GET"
          >
            <label className="text-xl" htmlFor="search">
              Search
            </label>
            <input
              id="search"
              autoComplete="off"
              name="search"
              value={searchTerm}
              className="border p-2 block w-full rounded-lg"
              type="text"
              onChange={(e) => {
                setSearchTerm(e.target.value);
              }}
            />
          </form>
        </div>
        {formData
          .filter((form) => {
            return form.title
              .toLowerCase()
              .includes(search?.toLowerCase() || "");
          })
          .map((form: FormData) => {
            return (
              <FormCard
                key={form.id}
                id={form.id}
                title={form.title}
                formFields={form.formFields}
                deleteFormCB={deleteForm}
              />
            );
          })}
      </div>
      <div className="mt-4">
        <button
          onClick={addForms}
          className="w-full p-3 text-center border border-slate-200 rounded-md shadow-xl"
        >
          Create New Form
        </button>
      </div>
    </div>
  );
}

export default Home;
