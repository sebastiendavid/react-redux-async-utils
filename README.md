# react-redux-async-utils

Load asynchronously your React module, then inject reducers and sagas.

## Install

```
npm install --save-dev react-redux-async-utils
```

## Setup

### Redux store

```javascript
import { createStore, compose, applyMiddleware } from "redux";
import createSagaMiddleware from "redux-saga";
import {
  createReducers,
  connectReducers,
} from "react-redux-async-utils/es5/redux";
import { connectSaga } from "react-redux-async-utils/es5/redux-saga";

export default function configureStore(initialState = {}) {
  const reducers = createReducers();
  const sagaMiddleware = createSagaMiddleware();
  const store = createStore(
    reducers,
    initialState,
    applyMiddleware(sagaMiddleware)
  );
  connectSaga(sagaMiddleware /*, function* optionalSaga() {}*/);
  return connectReducers(store, reducers);
}
```

### Async React component

```javascript
import React, { Component } from "react";
import makeAsyncComponent from "react-redux-async-utils/es5/react";
import { injectReducer } from "react-redux-async-utils/es5/redux";
import { injectSaga } from "react-redux-async-utils/es5/redux-saga";

const AsyncComponent = makeAsyncComponent(async () => {
  const {
    MainComponent,
    reducer,
    reducerKey,
    saga,
  } = await import("./loaded.js");
  injectReducer(reducerKey, reducer);
  injectSaga(saga /*, optionalSagaId */);
  return MainComponent;
});

export default class AsyncComponentTest extends Component {
  state = {};

  onClick = async () => {
    if (this.state.show) return;
    this.setState({ show: true });
  };

  render() {
    const { show } = this.state;
    return (
      <div>
        <button onClick={this.onClick}>Load async component</button>
        {show && <AsyncComponent />}
      </div>
    );
  }
}
```
