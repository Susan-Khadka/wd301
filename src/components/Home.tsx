import React from "react";
import FormCard from "./FormCard";
import { FormData } from "../types/formTypes";

function Home(props: {
  formData: FormData[];
  addFormsCB: () => void;
  getLocalFormsCB: () => FormData[];
  deleteFormCB: (id: number) => void;
  openFormCB: (id: number) => void;
  // saveLocalFormsCB: (localForms: FormData[]) => void;
}) {
  return (
    <>
      <div className="flex-col my-3 gap-4">
        {props.formData.map((form: FormData) => {
          return (
            <FormCard
              key={form.id}
              id={form.id}
              title={form.title}
              formFields={form.formFields}
              deleteFormCB={props.deleteFormCB}
              openFormCB={props.openFormCB}
            />
          );
        })}
      </div>
      <div className="mt-4">
        <button
          onClick={props.addFormsCB}
          className="w-full p-3 text-center border"
        >
          Create New Form
        </button>
      </div>
    </>
  );
}

export default Home;
