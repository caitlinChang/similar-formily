import React, { useContext, createContext } from "react";
import { Field } from "../core/field";
import { Form } from "../core/form";

import ReactiveField from "./reactiveField";

import { FormContext, FieldContext } from "./context";

export const FieldComponent = (props: Partial<Field>) => {
  const form = useContext(FormContext);
  const parent = useContext(FieldContext) || {
    path: "",
  };
  const field = new Field({
    ...props,
    form: form as Form,
    path: parent.path + (props?.name || ""),
  } as Field);

  return (
    <FieldContext.Provider value={field}>
      {/** @ts-ignore */}
      <ReactiveField field={field}></ReactiveField>
    </FieldContext.Provider>
  );
};
