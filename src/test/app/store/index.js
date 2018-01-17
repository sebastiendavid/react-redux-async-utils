import { createStore, compose, applyMiddleware } from "redux";
import createSagaMiddleware from "redux-saga";

import { createReducers, connectReducers } from "../../../redux";
import { connectSaga } from "../../../redux-saga";

const devTools = () =>
  (global.__REDUX_DEVTOOLS_EXTENSION__ || (() => compose)).call();

export default function configureStore(initialState = {}) {
  const reducers = createReducers();
  const sagaMiddleware = createSagaMiddleware();
  const store = createStore(
    reducers,
    initialState,
    compose(applyMiddleware(sagaMiddleware), devTools())
  );
  connectSaga(sagaMiddleware, function* optionalSaga() {});
  return connectReducers(store, reducers);
}
