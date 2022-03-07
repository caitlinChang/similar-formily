import SchemaField from "./react/SchemaField";

import { FormContext } from "./react/context";

export default () => {
  return (
    <FormContext.Provider>
      <SchemaField>
        <SchemaField.String></SchemaField.String>
      </SchemaField>
    </FormContext.Provider>
  );
};
