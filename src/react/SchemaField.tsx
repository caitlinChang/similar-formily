//schemaField最终还是转化为FieldComponent
import { AnySoaRecord } from "dns";
import { create } from "lodash";
import { createContext } from "react";
import { FieldComponent } from ".";
import { Field } from "../core/field";
import { ISchema, Schema } from "./Schema";

const SchemaContext = createContext<any>(null);
const SchemaField = (props?: {
  schema?: ISchema;
  components?: any;
  scope?: any;
  children?: any;
}) => {
  const renderMarkUp = () => {
    if (props?.schema) {
      return null;
    }
    /** 用来渲染markup schema */
    return props?.children;
  };
  const renderChildren = () => {
    /**用来渲染json-schema */
    if (props?.schema) {
      const SchemaInstance = new Schema(props.schema);
      return;
    } else {
      return <></>;
    }
  };
  return (
    <SchemaContext.Provider value={props}>
      {renderMarkUp()}
      {renderChildren()}
    </SchemaContext.Provider>
  );
};

SchemaField.String = (props: Partial<ISchema>) => {
  return <FieldComponent {...props} type="string" />;
};

SchemaField.Number = (props: Partial<ISchema>) => {
  return <FieldComponent {...props} type="number" />;
};
SchemaField.Object = (props: Partial<ISchema>) => {
  return <FieldComponent {...props} type="object" />;
};
SchemaField.Array = (props: Partial<ISchema>) => {
  return <FieldComponent {...props} type="array" />;
};
// SchemaField.Void = (props:ISchema) => {
//     return <FieldComponent {...props} type="void" />
// };

function createSchemaField(props?: { components?: any }) {
  // 这里的Components就是让所有的SchemaField都可以取到
  return SchemaField;
}

export default createSchemaField;
