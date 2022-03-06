import React, { useContext, useEffect, useState } from "react";
import { FieldComponent } from "./react/index";
import { Form as FormInstance } from "./core/form";
import { FieldContext, FormContext } from "./react/context";
import { Input, Form, Button, Select } from "antd";
import { cloneDeep, get } from "lodash";

import { observer } from "mobx-react-lite";
import { Field } from "./core/field";

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

const ArrayAdvice = observer(() => {
  const arrayField = useContext(FieldContext);
  if (arrayField?.type !== "array") return <></>;
  const value = arrayField.value;

  return (
    <div>
      {value?.map?.((item: any, index: number) => {
        return (
          <FieldComponent
            key={index}
            name={index}
            component={[
              Input,
              {
                width: "200px",
              },
            ]}
            decorator={[
              Form.Item,
              {
                label: `建议${index + 1}`,
              },
            ]}
          />
        );
      })}
      <Button onClick={() => arrayField?.push()}> Add More </Button>
    </div>
  );
});
function Demo() {
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
          reactions={(field: Field) => {
            if (field.value === "teenager") {
              const nameField = field.form.query("name");
              nameField.value = "Lily";
            }
            console.log("reactions中的field = ", field.value);
          }}
        />
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
        <FieldComponent
          type="array"
          name="array"
          component={[ArrayAdvice, {}]}
        />
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

export default Demo;
