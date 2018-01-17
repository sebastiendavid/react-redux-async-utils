"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.injectReducer = exports.connectReducers = exports.createReducers = undefined;

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _redux = require("redux");

var _types = require("./types");

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

var isReducerFunc = function isReducerFunc(obj) {
  return typeof reducer === "function";
};
var isReducerDict = function isReducerDict(obj) {
  return (typeof obj === "undefined" ? "undefined" : _typeof(obj)) === "object" && obj !== null && Object.keys(obj).length > 0;
};
var refs = {};

var createReducers = exports.createReducers = function createReducers() {
  for (var _len = arguments.length, reducers = Array(_len), _key = 0; _key < _len; _key++) {
    reducers[_key] = arguments[_key];
  }

  var _reducers$reduce = reducers.reduce(function (acc, reducer) {
    if (isReducerFunc(reducer)) {
      acc.funcs.push(reducer);
    } else if (isReducerDict(reducer)) {
      Object.assign(acc.dict, reducer);
    }
    return acc;
  }, { funcs: [], dict: {} }),
      funcs = _reducers$reduce.funcs,
      dict = _reducers$reduce.dict;

  if (Object.keys(dict).length > 0) {
    funcs.push((0, _redux.combineReducers)(dict));
  }
  if (funcs.length === 0) {
    funcs.push(function (state) {
      return state;
    });
  }
  if (funcs.length === 1) {
    return funcs[0];
  }
  return _redux.compose.apply(undefined, _toConsumableArray(funcs));
};

var connectReducers = exports.connectReducers = function connectReducers(store) {
  var reducers = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

  if (!store) {
    console.warn("[connectReducers(store, reducers)] Store is required");
  }
  refs = { store: store, reducers: reducers, asyncReducers: {} };
  return store;
};

var injectReducer = exports.injectReducer = function injectReducer(name, reducer) {
  var _refs = refs,
      store = _refs.store,
      reducers = _refs.reducers,
      asyncReducers = _refs.asyncReducers;

  if (name in asyncReducers) return;
  Object.assign(asyncReducers, _defineProperty({}, name, function (state, action) {
    var newState = state;
    if (action.type === _types.RESET_REDUCER && action.payload === name) {
      newState = undefined;
    }
    return reducer(newState, action);
  }));
  store.replaceReducer(createReducers(reducers, asyncReducers));
};