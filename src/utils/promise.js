const buildError = () =>
  Object.assign(new Error("cancelled promise"), { isCancelled: true });

export function makeCancellable(promise) {
  let isCancelled = false;
  const wrappedPromise = new Promise((resolve, reject) => {
    promise
      .then(val => (isCancelled ? reject(buildError()) : resolve(val)))
      .catch(error => (isCancelled ? reject(buildError()) : reject(error)));
  });
  return {
    promise: wrappedPromise,
    cancel() {
      isCancelled = true;
    },
  };
}

export default makeCancellable;
