import React, { createContext } from "react";
import { Form } from "../core/form";
import { Field } from "../core/field";

export const FormContext = createContext<Form | null>(null);
export const FieldContext = createContext<Field | null>(null);
