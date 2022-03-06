import { observable, makeObservable, autorun, computed } from "mobx";
import { Form } from "./form";

export type JSXComponent =
  | keyof JSX.IntrinsicElements
  | React.JSXElementConstructor<any>;

export class Field {
  title?: string;
  name?: string | number;
  type?: "array" | "object" | "string" | "number";
  component?: [JSXComponent] | [JSXComponent, any];
  decorator?: [JSXComponent] | [JSXComponent, any];
  defaultValue?: any;
  display: "visible" | "hidden";
  pattern: "editable" | "readonly" | "readPretty" | "disable";
  mounted?: boolean;
  unmounted?: boolean;
  parent?: Field;
  props?: Field;
  form: Form;
  path: string;
  children?: any;
  disposers: ((field: Field) => void)[];
  reactions?: Function;

  constructor(props: Field) {
    this.title = props.title;
    this.name = props.name;
    this.component = props.component;
    this.decorator = props.decorator;
    this.props = props;
    this.form = props.form;
    this.path = props.path;
    this.children = props.children;
    this.type = props.type || "string";
    this.defaultValue = props.defaultValue;
    this.disposers = [];

    if (this.defaultValue && !props.value) {
      this.onInput([this.defaultValue]);
    }

    // 初始化属性
    this.display = "visible";
    this.pattern = "editable";

    makeObservable(this, {
      title: observable,
      value: computed,
    });

    this.init();
    this.createReactions();
    this.form.fields[this.path] = this;
  }

  init() {
    // 初始化属性
    this.display = "visible";
    this.pattern = "editable";
  }

  set value(value: any) {
    this.form?.setValuesIn(value, this.path as string);
  }

  get value() {
    return this.form?.getValuesIn(this.path as string);
  }

  onInput(e: any[]) {
    const value = e[0]?.target?.value ? e[0].target.value : e[0];

    this.value = value;

    // 触发一些生命周期hooks
    this.notify("Input_value_change");
    this.notify("form_value_change");
  }

  notify(type: string) {
    // this.form?
  }

  push() {
    if (this.type === "array") {
      if (!Array.isArray(this.value)) {
        this.onInput([[null]]);
      } else {
        this.onInput([[...this.value, null]]);
      }
    }
  }

  createReactions() {
    const reactions = this.props?.reactions;
    if (reactions) {
      this.disposers.push(autorun(() => reactions(this)));
    }
  }
}
