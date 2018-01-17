import React, { Component } from "react";
import regeneratorRuntime from "regenerator-runtime"; // eslint-disable-line
import { makeCancellable } from "../utils/promise";

export default function makeAsyncComponent(fetchComponent) {
  class AsyncComponent extends Component {
    state = {};

    async componentWillMount() {
      try {
        const { promise, cancel } = makeCancellable(fetchComponent());
        this.setState({ cancel });
        const Loaded = await promise;
        this.setState({
          Loaded,
          cancel: null,
        });
      } catch (error) {
        if (!error.isCancelled) {
          console.error(error);
        }
      }
    }

    componentWillUnmount() {
      if (typeof this.state.cancel === "function") {
        this.state.cancel();
      }
    }

    render() {
      const { Loaded } = this.state;
      return !!Loaded && <Loaded {...this.props} />;
    }
  }
  return AsyncComponent;
}
