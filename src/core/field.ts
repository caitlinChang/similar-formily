import { Form } from "./form";

export type JSXComponent =
  | keyof JSX.IntrinsicElements
  | React.JSXElementConstructor<any>;

export class Field {
  title?: string;
  name?: string;
  component?: [JSXComponent] | [JSXComponent, any];
  decorator?: [JSXComponent] | [JSXComponent, any];
  defaultValue?: any;
  mounted?: boolean;
  unmounted?: boolean;
  parent?: Field;
  props?: Field;
  form?: Form;
  path?: string;

  constructor(props: Field) {
    this.title = props.title;
    this.name = props.name;
    this.component = props.component;
    this.decorator = props.decorator;
    this.props = props;
    this.value = props.value;
    this.form = props.form;
    this.path = props.path;
  }

  set value(value: any) {
    this.form?.setValuesIn(value, this.path as string);
  }

  get value() {
    return this.form?.getValuesIn(this.path as string);
  }

  onInput(e: any[]) {
    const value = e[0].target.value;
    this.value = value;
    // 触发一些生命周期hooks
    this.notify("Input_value_change");
    this.notify("form_value_change");
  }

  notify(type: string) {
    // this.form?
  }

  // setValue() {}

  // setComponet() {}

  // setComponetProps() {}
}

// export const createField = () => {
//   return;
// };
