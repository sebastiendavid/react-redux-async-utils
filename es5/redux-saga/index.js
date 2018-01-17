"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.injectSaga = injectSaga;
var refs = {};

var connectSaga = exports.connectSaga = function connectSaga(sagaMiddleware, saga) {
  refs = {
    runSaga: sagaMiddleware.run.bind(sagaMiddleware),
    asyncSagas: []
  };
  if (saga) {
    sagaMiddleware.run(saga);
  }
  return sagaMiddleware;
};

function injectSaga(saga, id) {
  var _refs = refs,
      asyncSagas = _refs.asyncSagas,
      runSaga = _refs.runSaga;

  if (!saga) console.warn("[injectSaga(saga)] saga is required");
  if (asyncSagas.indexOf(id || saga) >= 0) return;
  asyncSagas.push(id || saga);
  runSaga(saga);
}