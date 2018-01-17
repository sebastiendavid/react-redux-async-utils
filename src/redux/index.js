import { combineReducers, compose } from "redux";
import { RESET_REDUCER } from "./types";

const isReducerFunc = obj => typeof reducer === "function";
const isReducerDict = obj =>
  typeof obj === "object" && obj !== null && Object.keys(obj).length > 0;
let refs = {};

export const createReducers = (...reducers) => {
  const { funcs, dict } = reducers.reduce(
    (acc, reducer) => {
      if (isReducerFunc(reducer)) {
        acc.funcs.push(reducer);
      } else if (isReducerDict(reducer)) {
        Object.assign(acc.dict, reducer);
      }
      return acc;
    },
    { funcs: [], dict: {} }
  );
  if (Object.keys(dict).length > 0) {
    funcs.push(combineReducers(dict));
  }
  if (funcs.length === 0) {
    funcs.push(state => state);
  }
  if (funcs.length === 1) {
    return funcs[0];
  }
  return compose(...funcs);
};

export const connectReducers = (store, reducers = {}) => {
  if (!store) {
    console.warn("[connectReducers(store, reducers)] Store is required");
  }
  refs = { store, reducers, asyncReducers: {} };
  return store;
};

export const injectReducer = (name, reducer) => {
  const { store, reducers, asyncReducers } = refs;
  if (name in asyncReducers) return;
  Object.assign(asyncReducers, {
    [name]: (state, action) => {
      let newState = state;
      if (action.type === RESET_REDUCER && action.payload === name) {
        newState = undefined;
      }
      return reducer(newState, action);
    },
  });
  store.replaceReducer(createReducers(reducers, asyncReducers));
};
