import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { takeEvery, call } from "redux-saga/effects";

import { injectSaga } from "../../../redux-saga";

const mapDispatchToProps = {
  sagaAction: () => ({ type: "SAGA_ACTION" }),
};

class InjectSagaTest extends Component {
  static propTypes = {
    sagaAction: PropTypes.func,
  };

  inject = () => {
    injectSaga(function* testSaga() {
      yield takeEvery("SAGA_ACTION", function*() {
        yield call(console.info, "saga has been executed");
      });
    }, "some-id");
  };

  dispatch = () => {
    this.props.sagaAction();
  };

  render() {
    return (
      <div>
        <h1>InjectSagaTest</h1>
        <button id="inject-saga" onClick={this.inject}>
          Inject saga
        </button>
        <button id="dispatch-action" onClick={this.dispatch}>
          Update reducer
        </button>
        <div>
          <i>cf. console output</i>
        </div>
      </div>
    );
  }
}

export default connect(null, mapDispatchToProps)(InjectSagaTest);
