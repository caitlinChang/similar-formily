import React, { useState } from "react";
import "./App.css";
import "antd/dist/antd.css";
import Demo from "./Demo";
import MarkUpSchemaDemo from "./markupSchemaDemo";

const App = () => {
  return (
    <div>
      <h3>JSX写法</h3>
      <Demo />
      <h3>MarkUp Schema 写法</h3>
      <MarkUpSchemaDemo />
      <h3>Json Schema 写法</h3>
    </div>
  );
};

export default App;
