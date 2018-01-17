let refs = {};

export const connectSaga = (sagaMiddleware, saga) => {
  refs = {
    runSaga: sagaMiddleware.run.bind(sagaMiddleware),
    asyncSagas: [],
  };
  if (saga) {
    sagaMiddleware.run(saga);
  }
  return sagaMiddleware;
};

export function injectSaga(saga, id) {
  const { asyncSagas, runSaga } = refs;
  if (!saga) console.warn("[injectSaga(saga)] saga is required");
  if (asyncSagas.indexOf(id || saga) >= 0) return;
  asyncSagas.push(id || saga);
  runSaga(saga);
}
