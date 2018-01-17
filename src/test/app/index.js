import React, { Component, Fragment } from "react";

import "./index.css";
import AsyncComponentTest from "./async-component";
import InjectReducerTest from "./inject-reducer";
import InjectSagaTest from "./inject-saga";

export default class TestApp extends Component {
  state = { view: "none" };

  show = view => this.setState({ view });

  render() {
    const { view } = this.state;
    return (
      <Fragment>
        <div
          id="buttons-bar"
          style={{ display: "flex", alignItems: "center", flexWrap: "wrap" }}
        >
          <button
            id="test-async-component"
            onClick={() => this.show("async")}
            disabled={view === "async"}
          >
            Test async component
          </button>
          <button
            id="test-inject-reducer"
            onClick={() => this.show("injectReducer")}
            disabled={view === "injectReducer"}
          >
            Test inject reducer
          </button>
          <button
            id="test-inject-saga"
            onClick={() => this.show("injectSaga")}
            disabled={view === "injectSaga"}
          >
            Test inject saga
          </button>
          <button
            id="reset-views"
            onClick={() => this.show("none")}
            disabled={view === "none"}
          >
            Reset
          </button>
        </div>
        {view === "async" && <AsyncComponentTest />}
        {view === "injectReducer" && <InjectReducerTest />}
        {view === "injectSaga" && <InjectSagaTest />}
      </Fragment>
    );
  }
}
