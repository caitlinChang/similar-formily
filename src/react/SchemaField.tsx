//schemaField最终还是转化为FieldComponent
import { createContext, ReactChild, ReactChildren } from "react";
import { FieldComponent } from ".";
import { Field } from "../core/field";
type ISchema = {
  title?: string;
  name: string;
  type: "object" | "string" | "number" | "array" | "void";
  properties?: ISchema;
  "x-component"?: string;
  "x-component-props"?: any;
  "x-decorator"?: string;
  "x-decorator-props"?: any;
};

const SchemaContext = createContext<ISchema | undefined>(undefined);
const SchemaScopeContext = createContext<any>(null);
const SchemaOptionsContext = createContext<{
  components?: ReactChildren[];
}>({});
const SchemaField = (props?: {
  components?: ReactChildren[];
  children?: any;
  schema?: ISchema;
  scope: any;
}) => {
  return (
    <SchemaContext.Provider value={props?.schema}>
      <SchemaScopeContext.Provider value={props?.scope}>
        {props?.children}
      </SchemaScopeContext.Provider>
    </SchemaContext.Provider>
  );
  return props?.children;
};

SchemaField.String = (props: ISchema) => {
  return <FieldComponent {...props} type="string" />;
};

SchemaField.Number = (props: ISchema) => {
  return <FieldComponent {...props} type="number" />;
};
SchemaField.Object = (props: ISchema) => {
  return <FieldComponent {...props} type="object" />;
};
SchemaField.Array = (props: ISchema) => {
  return <FieldComponent {...props} type="array" />;
};
// SchemaField.Void = (props:ISchema) => {
//     return <FieldComponent {...props} type="void" />
// };

function createSchemaField(props?: { components?: ReactChildren[] }) {
  // 这里的Components就是让所有的SchemaField都可以取到
  return SchemaField;
}

export default createSchemaField;
