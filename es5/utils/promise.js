"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.makeCancellable = makeCancellable;
var buildError = function buildError() {
  return Object.assign(new Error("cancelled promise"), { isCancelled: true });
};

function makeCancellable(promise) {
  var isCancelled = false;
  var wrappedPromise = new Promise(function (resolve, reject) {
    promise.then(function (val) {
      return isCancelled ? reject(buildError()) : resolve(val);
    }).catch(function (error) {
      return isCancelled ? reject(buildError()) : reject(error);
    });
  });
  return {
    promise: wrappedPromise,
    cancel: function cancel() {
      isCancelled = true;
    }
  };
}

exports.default = makeCancellable;