import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import { injectReducer } from "../../../redux";
import { RESET_REDUCER } from "../../../redux/types";

const reducerName = "injectReducerTest";
const mapStateToProps = ({ injectReducerTest = {} }) => ({
  text: injectReducerTest.text,
  color: injectReducerTest.color,
  injected: injectReducerTest.injected,
  updated: injectReducerTest.updated,
});
const mapDispatchToProps = {
  resetInjectedState: () => ({ type: RESET_REDUCER, payload: reducerName }),
  updateInjectedState: () => ({ type: "UPDATE_INJECTED_REDUCER" }),
};

class InjectReducerTest extends Component {
  static propTypes = {
    text: PropTypes.string,
    color: PropTypes.string,
    injected: PropTypes.bool,
    updated: PropTypes.bool,
    resetInjectedState: PropTypes.func,
    updateInjectedState: PropTypes.func,
  };

  static defaultProps = {
    text: "Not injected",
    color: "tomato",
  };

  inject = () => {
    injectReducer(
      reducerName,
      (
        state = {
          text: "Injected",
          color: "gold",
          injected: true,
          updated: false,
        },
        action
      ) => {
        switch (action.type) {
          case "UPDATE_INJECTED_REDUCER":
            return {
              ...state,
              text: "Updated",
              color: "lightgreen",
              updated: true,
            };
          default:
            return state;
        }
      }
    );
  };

  update = () => {
    const { injected, updateInjectedState } = this.props;
    if (injected) {
      updateInjectedState();
    }
  };

  reset = () => {
    this.props.resetInjectedState();
  };

  render() {
    const { text, color } = this.props;
    return (
      <div>
        <h1>InjectReducerTest</h1>
        <button id="inject-reducer" onClick={this.inject}>
          Inject reducer
        </button>
        <button id="update-reducer" onClick={this.update}>
          Update reducer
        </button>
        <button id="reset-reducer" onClick={this.reset}>
          Reset reducer
        </button>
        <h2 style={{ color }}>{text}</h2>
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(InjectReducerTest);
