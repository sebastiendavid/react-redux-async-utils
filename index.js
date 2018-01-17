console.warn(`
You should import what you need:

import makeAsync from 'react-redux-async/react';
import { createReducers, connectReducers, injectReducer } from 'react-redux-async/redux';
import { connectSaga, injectSaga } from 'react-redux-async/saga';

or ES5 version:

import makeAsync from 'react-redux-async/es5/react';
import { createReducers, connectReducers, injectReducer } from 'react-redux-async/es5/redux';
import { connectSaga, injectSaga } from 'react-redux-async/es5/saga';
`);
