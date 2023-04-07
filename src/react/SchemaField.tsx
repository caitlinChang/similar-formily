//schemaField最终还是转化为FieldComponent
import { AnySoaRecord } from "dns";
import { create } from "lodash";
import { PropTypes } from "mobx-react";
import { createContext, useContext } from "react";
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

const MarkupField = (props: Partial<ISchema>) => {
  // 在markupField层去处理schemaContext
  const schemaContext = useContext(SchemaContext);
  const { components, scope } = schemaContext;
  const decorator = components[props["x-decorator"] as string];
  const component = components[props["x-component"] as string]; // 容错处理放在FieldComponent
  // 递归处理
  if (props.type === "object" || props.type === "void") {
    // 如何处理这么多字段的映射？？
    return (
      <FieldComponent
        component={[component, props["x-component-props"]]}
        decorator={[decorator, props["x-decorator-props"]]}
        name={props.name}
        children={props?.children}
      />
    );
  } else if (props.type === "array") {
    
  }
  return <></>;
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
