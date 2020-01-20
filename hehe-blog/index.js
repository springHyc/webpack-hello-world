import React from "react";
import ReactDOM from "react-dom";
import "./index.less";
import App from "./app";
// import * as serviceWorker from "./serviceWorker";
import { Provider } from "react-redux";
import store from "./src/store/configStore";
import zhCN from "antd/lib/locale-provider/zh_CN";
import moment from "moment";
import "moment/locale/zh-cn";
import { LocaleProvider } from "antd";
moment.locale("zh-cn");

ReactDOM.render(
  <Provider store={store}>
    <LocaleProvider locale={zhCN}>
      <App />
    </LocaleProvider>
  </Provider>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
// serviceWorker.unregister();
