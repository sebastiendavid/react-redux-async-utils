import React, { Component } from "react";
import makeAsyncComponent from "../../../react";

const AsyncComponent = makeAsyncComponent(async () => {
  const module = await import("./loaded.js");
  return module.default;
});

export default class AsyncComponentTest extends Component {
  state = {};

  onClick = () => {
    if (this.state.show) return;
    this.setState({ show: true });
  };

  render() {
    const { show } = this.state;
    return (
      <div className="AsyncComponentTest">
        <h1>AsyncComponentTest</h1>
        <button id="load-async-component" onClick={this.onClick}>
          Load async component
        </button>
        {show && <AsyncComponent />}
      </div>
    );
  }
}
