import React, { MouseEvent } from "react";
import Icon from "./Icon";

type Props = {
  name: string;
  onClick: (e?: MouseEvent<HTMLButtonElement>) => void;
};

function Button(props: Props) {
  return (
    <>
      <button
        className="bg-white p-2 rounded-lg border"
        onClick={(event) => {
          props.onClick(event);
        }}
      >
        <Icon name={props.name} />
      </button>
    </>
  );
}

export default Button;

/* <button
            onClick={(event) => {
              navigate(`/form/${props.id}`);
            }}
            className="bg-white p-2 rounded-lg border"
          >
            <Icon name="edit" />
          </button> */
