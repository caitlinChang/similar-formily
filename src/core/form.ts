import { Field } from "./field";
import { cloneDeep, get, set } from "lodash";

import { observable, makeObservable, makeAutoObservable } from "mobx";
export class Form {
  values: any;
  // @ts-ignore
  fields: {
    [x: string]: Field;
  };
  count: number;

  constructor() {
    this.values = {};
    this.count = 0;
    makeAutoObservable(this);
  }

  update() {
    this.count++;
  }

  setValues(values: any) {
    this.values = values;
  }

  setValuesIn(value: any, path: string) {
    set(this.values, path, value);
    // console.log("setValuesIn = ", value, path, this.values);
  }

  getValuesIn(path: string) {
    return get(this.values, path);
  }
}

export const createForm = () => {
  return new Form();
};
