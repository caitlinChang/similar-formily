export const isStringExperssion = (expression: string) => {
  return expression.startsWith("{{") && expression.endsWith("}}");
};
export const executeStringExperssion = (expression: string) => {
  // 执行字符串表达式
  // console.log("executeStringExperssion = ", expression);
  const experssion = expression.replace("{{", "").replace("}}", "");
};
