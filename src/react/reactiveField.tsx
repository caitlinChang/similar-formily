import React, { createElement } from "react";
import { Field } from "../core/field";
import { observer } from "mobx-react-lite";

// import { observer } from "mobx-react";

export type JSXComponent =
  | keyof JSX.IntrinsicElements
  | React.JSXElementConstructor<any>;

const ReactiveField = (props: { field: Field; children?: any }) => {
  const field = props.field;

  const renderDecorator = (children?: JSXComponent) => {
    const [decorator, decoratorProps] = field.decorator || [];
    if (decorator) {
      return createElement(decorator, decoratorProps, children);
    } else {
      return children;
    }
  };

  const renderComponent = () => {
    const [component, componentProps] = props.field.component || [];
    const children = componentProps?.children || props.children;
    if (!component) {
      return children;
    }

    const value = props.field.value;
    const onChange = (...args: any[]) => {
      field.onInput(args);
      componentProps?.onChange?.(...args);
    };
    return createElement(
      component,
      {
        ...componentProps,
        onChange,
        value,
      },
      children
    );
  };

  return renderDecorator(renderComponent() as any) as JSXComponent;
};

// export default ReactiveField;

export default observer(ReactiveField as any);
