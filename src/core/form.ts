import { Field } from "./field";
import { get, set } from "lodash";

import { observable, makeObservable } from "mobx";
export class Form {
  values: any;
  // @ts-ignore
  fields: {
    [x: string]: Field;
  };

  constructor() {
    this.values = {};

    makeObservable(this, {
      values: observable,
    });
  }

  setValues(values: any) {
    this.values = values;
  }

  setValuesIn(value: any, path: string) {
    set(this.values, path, value);
    // console.log("this.values = ", this.values);
  }

  getValuesIn(path: string) {
    get(this.values, path);
  }

  createField(props: any) {
    const field = new Field({
      ...props,
      form: this,
    });
    return field;
  }
}

export const createForm = () => {
  return new Form();
};
