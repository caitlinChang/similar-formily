import createSchemaField from "./react/SchemaField";
import { FormContext } from "./react/context";
import { Form } from "./core/form";
import { Input } from "antd";

const SchemaField = createSchemaField({
  components: {
    Input,
  },
});

const form = new Form();

export default function MarkUpSchemaDemo() {
  return (
    <FormContext.Provider value={form}>
      <SchemaField>
        <SchemaField.String name="name" x-component="Input" />
        <SchemaField.String name="name" x-component="Input" />
        <SchemaField.String name="name" x-component="Input" />
      </SchemaField>
    </FormContext.Provider>
  );
}
