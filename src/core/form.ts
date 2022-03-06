import { Field } from "./field";
import { cloneDeep, get, set } from "lodash";
import { makeObservable, makeAutoObservable } from "mobx";
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
    this.fields = {};
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

  query(path: string) {
    return this.fields[path];
  }

  getValuesIn(path: string) {
    return get(this.values, path);
  }
}

export const createForm = () => {
  return new Form();
};
