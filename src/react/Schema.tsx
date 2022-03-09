/**普通的json 数据类型，遵循Schema属性规范 */
export type ISchema = {
  type: "object" | "string" | "number" | "array" | "void";
  title?: string;
  name?: string;
  properties?: ISchema;
  items?: ISchema | ISchema[];
  "x-component"?: string;
  "x-component-props"?: any;
  "x-decorator"?: string;
  "x-decorator-props"?: any;
  "x-display"?: "visible" | "hidden";
  "x-read-pretty"?: boolean;
  "x-editable"?: boolean;
  "x-disabled"?: boolean;
  "x-read-only"?: boolean;
  "x-pattern"?: "editable" | "";
};

export class Schema {
  title?: string;
  type: "object" | "string" | "number" | "array" | "void";
  name?: string;
  properties?: ISchema;
  items?: ISchema | ISchema[];
  "x-component"?: string;
  "x-component-props"?: any;
  "x-decorator"?: string;
  "x-decorator-props"?: any;
  "x-display"?: "visible" | "hidden";
  "x-read-pretty"?: boolean;
  "x-editable"?: boolean;
  "x-disabled"?: boolean;
  "x-read-only"?: boolean;
  "x-pattern"?: "editable" | "";
  constructor(props: ISchema) {
    this.type = props.type;
    this.title = props?.title;
    this.name = props?.name;
    this["x-component"] = props["x-component"];
    this["x-component-props"] = props["x-component-props"];
    this["x-decorator"] = props["x-decorator"];
    this["x-decorator-props"] = props["x-decorator-props"];
    this["x-display"] = props["x-display"];
    this["x-read-pretty"] = props["x-read-pretty"];
    this["x-editable"] = props["x-editable"];
    this["x-disabled"] = props["x-disabled"];
    this["x-read-only"] = props["x-read-only"];
    this["x-pattern"] = props["x-pattern"];
    this.initProperties(props);
    this.initItems(props);
  }

  initProperties(props: ISchema) {
    if (["void", "array", "object"].includes(this.type) && props.properties) {
      this.properties = new Schema(props.properties);
    }
  }
  initItems(props: ISchema) {
    if (["array"].includes(this.type) && props.items) {
      if (Array.isArray(props.items)) {
        this.items = props.items.map((schema) => new Schema(schema));
      } else {
        this.items = new Schema(props.items);
      }
    }
  }

  addProperties() {}

  removeProperties() {}
}
