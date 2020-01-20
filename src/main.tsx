import * as React from "react";
import { Component } from "react";
import { render } from "react-dom";
import "./main.css";
import jsUtils from "jsutils-100";
import { funcA } from "./util.js";

class App extends Component {
  constructor(props) {
    super(props);
    funcA();
  }
  render() {
    // if (process.env.NODE_ENV === "production") {
    //   console.log("你正在线上环境");
    // } else {
    //   console.log("你正在使用开发环境");
    // }
    return (
      <div style={{ color: "#ededed" }}>
        <h1>Hello, Webpack</h1>
        {jsUtils.isEmpty(0) && <p>显示0</p>}
      </div>
    );
  }
}
render(<App />, window.document.getElementById("app"));
