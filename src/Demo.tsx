import React, { useState } from "react";
import { FieldComponent } from "./react/index";
import { Form as FormInstance } from "./core/form";
import { FormContext } from "./react/context";
import { Input, Form, Button } from "antd";

const form = new FormInstance();

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
        <Button type="primary"></Button>
      </FormContext.Provider>
    </div>
  );
}
