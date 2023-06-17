import React from "react";
import { navigate } from "raviger";
import Button from "../common/Button";

function FormCard(props: {
  id: number;
  title: string;
  deleteFormCB: (id: string) => Promise<void>;
}) {
  return (
    <>
      <div className="flex justify-between items-center px-2 py-4 rounded-md border border-slate-200 my-5 shadow-lg">
        <div>{props.title}</div>
        <div className="flex gap-4">
          <Button
            name="edit"
            onClick={() => {
              navigate(`/form/${props.id}`);
            }}
          />
          <Button
            name="delete"
            onClick={() => {
              props.deleteFormCB(String(props.id));
            }}
          />
        </div>
      </div>
    </>
  );
}

export default FormCard;
