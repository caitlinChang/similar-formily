#### 页面渲染器

1. 先实现一个静态的页面渲染器
   在初始化 form 实例的时候注册组件和变量
   实例内部 一旦注册进去，静态的，不会监听它们的变化
2. 现在要收集各个子组件的 value，通过 DFS 过程中 this.form.setValues 收集完成

3. 然后先丰富 schema 的能力，schema 允许配置字符串表达式

```tsx
/**
 * FormEngine 是一个静态的渲染器
 */
class FormEngine {
  components: {};
  scopes:{},
  schema:{}
  constructor({
    components,
    scopes,
    schmea
    form,
  }) {
    this.components = components;
    this.scopes = scopes
    this.schema = schmea
    this.form = form;

    // this.resolveSchema(schema)
  }
    // 在这个过程中既要组装页面树结构，也要去组装 values，但是每个组件内部的生命周期是在什么时候执行呢，应该是在最后渲染的时候执行
  resolveSchema(schema){
    // DFS，组合成页面的组件树结构
    const { type, properties, component, componentProps, defaultValue } = schema;
    if(type === '基础类型'){
        const Component = this.components[component];
        // 初始化时设置默认值，默认值是直接设置的还是通过onChange事件触发的呢
        // 不能通过 onChange，因为onChange 是原生事件，应该是内部初始化直接赋值
        this.form.setValues(path, value);
        return <Component {...componentProps} value={} onChange={} defaultValue={} />
    }else if(type === 'object'){
        const children = Object.entries(properties);
        children.map(([child,key]) => {
            return this.resolveSchema(child)
        })
    }else if(type === 'array'){

    }
  }

  return <div>
    {this.resolveSchema(this.schema)}
  </div>

}


```

#### Form 实例

还需要一个实例对象用于获取 values

```tsx
class Form {
  constructor({ initialValuse }) {
    this.initialValues = initialValuse;
    this.values = initialValuse;
  }

  getValues() {
    return this.values;
  }

  setValues(path, value) {
    lodash.set(path, value, this.values);
  }
}
```

两个通过 context 结合起来，就是说直接的 FormEngine 也能用，但是 FormEngine 是一个黑盒的状态，如果需要在 Engine 外部控制表单内部操作，那就需要获取 form 实例

```tsx
const form = new Form({});
```

#### 使用方式

```tsx
const form = new Form({});
return (
  <FormEngine
    form={form}
    components={components}
    scopes={scopes}
    schema={schema}
  />
);
```
