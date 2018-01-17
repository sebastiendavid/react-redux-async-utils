import React from "react";
import { render } from "react-dom";
import { Provider } from "react-redux";

import createStore from "./test/app/store";
import TestApp from "./test/app";

render(
  <Provider store={createStore()}>
    <TestApp />
  </Provider>,
  global.document.querySelector("#root")
);
