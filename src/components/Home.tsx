import React, { useEffect, useState } from "react";
import FormCard from "./FormCard";
import { FormData, FormField, updateFormData } from "../types/formTypes";
import { navigate, useQueryParams } from "raviger";
import { getLocalForms, saveLocalForms } from "../utils/storageUtils";
import { v4 as uuidv4 } from "uuid";
import Modal from "../common/Modal";
import CreateForm from "../CreateForm";
import { listForms } from "../utils/apiUtils";

// Initial form fields for a form
// const initialFormFields: FormField[] = [
//   { id: uuidv4(), label: "First Name", type: "text", value: "", kind: "text" },
//   { id: uuidv4(), label: "Last Name", type: "text", value: "", kind: "text" },
// ];

const fetchForms = async (setFormDataCB: (value: updateFormData[]) => void) => {
  const data = await listForms();
  setFormDataCB(data.results);
};

function Home() {
  const [formData, setFormData] = useState<updateFormData[]>([]);
  const [{ search }, setQuery] = useQueryParams();
  const [searchTerm, setSearchTerm] = useState("");
  const [newForm, setNewForm] = useState<boolean>(false);

  useEffect(() => {
    fetchForms(setFormData);
  }, []);

  // Add a new form
  // const addForms = () => {
  //   const localForms = getLocalForms();
  //   const newForm = {
  //     id: uuidv4(),
  //     title: "Untitled Form",
  //     formFields: initialFormFields,
  //   };

  //   setFormData([...localForms, newForm]);
  //   saveLocalForms([...localForms, newForm]);
  //   navigate(`/form/${newForm.id}`);
  // };

  // // Delete a form
  // const deleteForm = (id: string) => {
  //   const updatedLocalForms = formData.filter(
  //     (form: FormData) => form.id !== id
  //   );
  //   setFormData(updatedLocalForms);
  //   saveLocalForms(updatedLocalForms);
  // };

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
        {formData &&
          formData
            .filter((form) => {
              return form.title
                .toLowerCase()
                .includes(search?.toLowerCase() || "");
            })
            .map((form: updateFormData) => {
              return (
                <FormCard
                  key={form.id}
                  id={form.id}
                  title={form.title}
                  // formFields={form.formFields}
                  // deleteFormCB={deleteForm}
                />
              );
            })}
      </div>
      <div className="mt-4">
        <button
          onClick={() => {
            setNewForm(true);
          }}
          className="w-full p-3 text-center border border-slate-200 rounded-md shadow-xl"
        >
          Create New Form
        </button>
      </div>
      <Modal open={newForm} closeCB={() => setNewForm(false)}>
        <CreateForm />
      </Modal>
    </div>
  );
}

export default Home;
