export const isStringExperssion = (expression: string) => {
  return expression.startsWith("{{") && expression.endsWith("}}");
};
/**
 * 变量表达式中可以使用全局作用域中的 scope 和 $self、$form
 * 这是怎么做到的，scope 是挂在 window 上的吗， 怎么处理 $self 呢
 * 竟然是使用 with 语句，让字符串表达式在一个局部作用域执行
 */
export const executeStringExperssion = (expression: string) => {
  // 执行字符串表达式
  // console.log("executeStringExperssion = ", expression);
  const experssion = expression.replace("{{", "").replace("}}", "");
  return new Function('$self','$form',`
  return ${experssion}
  `)();
};

// 执行 experssion 就相当于 const fn = executeStringExperssion(str); fn(field,form)