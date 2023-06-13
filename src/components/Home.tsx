import React, { useEffect, useState } from "react";
import FormCard from "./FormCard";
import { Form, FormData, FormField } from "../types/formTypes";
import { navigate, useQueryParams } from "raviger";
import { getLocalForms, saveLocalForms } from "../utils/storageUtils";
import { v4 as uuidv4 } from "uuid";
import Modal from "../common/Modal";
import CreateForm from "../CreateForm";
import { listForms } from "../utils/apiUtils";
import { Pagination } from "../types/common";

const fetchForms = async (setFormDataCB: (value: Form[]) => void) => {
  try {
    const data: Pagination<Form> = await listForms({ offset: 0, limit: 3 });
    setFormDataCB(data.results);
  } catch (error) {
    console.log(error);
  }
};

function Home() {
  const [formData, setFormData] = useState<Form[]>([]);
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
            .map((form: Form) => {
              return form.id !== undefined ? (
                <FormCard key={form.id} id={form.id} title={form.title} />
              ) : null;
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
