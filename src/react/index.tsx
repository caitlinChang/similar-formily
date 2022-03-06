import React, { useContext, createContext, Children } from "react";
import { Field } from "../core/field";
import { Form } from "../core/form";

import ReactiveField from "./reactiveField";

import { FormContext, FieldContext } from "./context";
// 提供Field组件定义表单元素
// useForm, useField
export const FieldComponent = (props: Partial<Field> & { children?: any }) => {
  const form = useContext(FormContext);
  const parent = useContext(FieldContext) || {
    path: "",
  };
  const field = new Field({
    ...props,
    form: form as Form,
    path: parent.path ? `${parent.path}.${props?.name}` : props.name,
  } as Field);

  return (
    <FieldContext.Provider value={field}>
      {/** @ts-ignore */}
      <ReactiveField field={field}>{props.children}</ReactiveField>
    </FieldContext.Provider>
  );
};
