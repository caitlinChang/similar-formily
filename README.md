#### 页面渲染器

1. 先实现一个静态的页面渲染器
   在初始化 form 实例的时候注册组件和变量
   实例内部 一旦注册进去，静态的，不会监听它们的变化
2. 现在要收集各个子组件的 value，通过 DFS 过程中 this.form.setValues 收集完成

3. 然后先丰富 schema 的能力，schema 允许配置字符串表达式，解析字符串表达式用 new Function 和 with

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

#### 处理表单内部逻辑
解析 schema 渲染页面，这时候渲染的只是静态页面，页面内部的逻辑怎么处理呢
```tsx
// 一个组件的哪些状态会受到外部或者内部影响而改变呢？
class Field {
  value, // 组件的值，(受控组件)
  visible, // 组件是否展示
  pattern, // 组件展示的模式，例如禁用、readonly 等等
  data:{ // 组件接收的数据
    componentProps,
    decoratorProps,
    dataSource
  }
}

// bad case: 通过这样一个含有组件各种状态的组件实例来控制组件的变化
export const ComponentWrapper = () => {
  // 如果把 field 维护在组件树内部肯定不行，因为遇到这种多个组件之间联动，要监听一个组件的状态变化
  // 然后去改变另外一个组件的状态，这种情况要么把组件状态提到父组件那个层级，要么就得用 ref 暴露出去
  const [status, setStatus] = useState(new Field());

  return <>
{field.visible && <Component {...field.componentProps} />}
</>
}

// good case: 所有组件树的状态维护在页面顶层，渲染器顶层
// field 改变的时候页面刷新
export const resolveSchema = () => {
  // 实例化一个field
  const field = new Field({...schema});
  // 这么多的组件树该怎么样挂载到父组件上面呢, 父组件一定有一个 form 实例，
  // 最简单的办法就是以路径去存，也比较好取
  form.fields[path] = field;

  // path 就是schema的配置路径
  return <>{ field.visible && <Component /> }</>
}

```

##### 状态管理
把整个表单所有的状态提升到顶层，那用什么方案来管理呢？
传统的react数据流、reducer
```tsx
// 其实业界的状态管理方案，就那么几种
// 1. react 的状态管理方案
const [form, setForm] = useState({});

// 2. redux，类react的吧，单向数据流，很繁琐

// 3. mobx

```

##### 配置逻辑的执行时机
其实一直以来我使用 formily 都会有一个疑问，就是 reactions 的执行时机.
按照表现，它应该是在初始化的时候就会去执行一次。
但是假如 reactions 中的逻辑有依赖某个状态，一种情况是依赖状态被赋上了默认值，那么 reactions 会执行两次吗,

可以知道，默认值是在初始化的时候被赋值的
初始化的工作仅仅是初始化 form 实例，各个field 实例，渲染整个结构；reactions 不会在初始化的时候执行吧，应该是在初始化完成之后执行，但是怎么做到在初始化完成之后执行呢？reactions 中定义的逻辑，是存在哪里了呢?

```tsx
// 假设我有一段这样的逻辑
const config = {
  type:'object',
  properties:{
    a:{
      visible: '{{$form.query(b).take()?.value === 1}}'
      reactions:[
        {
          dependencies:[],

        }
      ]
    },
    b:{
      reactions:(field) => {
        filed.dataSource = []
      }
    }
  }
}

// 上面这一段

```


