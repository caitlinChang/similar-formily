import React, { useState } from "react";
import { FieldComponent } from "./react/index";
import { Form as FormInstance } from "./core/form";
import { FormContext } from "./react/context";
import { Input, Form, Button, Select } from "antd";
import { cloneDeep } from "lodash";

const form = new FormInstance();

const options = [
  {
    label: "18 ~ 25",
    value: "teenager",
  },
  {
    label: "25 ~ 60",
    value: "middle-aged",
  },
  {
    label: "60 以上",
    value: "elder",
  },
];

export default function Demo() {
  return (
    <div style={{ width: "600px", margin: "20px" }}>
      <FormContext.Provider value={form}>
        <FieldComponent
          title="名称"
          name="name"
          component={[
            Input,
            {
              width: "200px",
            },
          ]}
          decorator={[
            Form.Item,
            {
              label: "名称",
            },
          ]}
        />
        <FieldComponent
          title="年龄"
          name="age"
          component={[
            Select,
            {
              width: "200px",
              options,
            },
          ]}
          decorator={[
            Form.Item,
            {
              label: "年龄",
            },
          ]}
        ></FieldComponent>
        <FieldComponent name="object">
          <FieldComponent
            name="address"
            component={[
              Input,
              {
                width: "200px",
              },
            ]}
            decorator={[
              Form.Item,
              {
                label: "住址",
              },
            ]}
          />
        </FieldComponent>
        <FieldComponent name="array">
          <FieldComponent
            name="advice"
            component={[
              Input,
              {
                width: "200px",
              },
            ]}
            decorator={[
              Form.Item,
              {
                label: "建议1",
              },
            ]}
          />
          <Button>add</Button>
        </FieldComponent>
        <Button
          type="primary"
          onClick={() => console.log(cloneDeep(form.values))}
        >
          提交
        </Button>
      </FormContext.Provider>
    </div>
  );
}
