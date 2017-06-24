import React from 'react';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import createSagaMiddleware from 'redux-saga';
import Pequod from './containers/Pequod';
import PequodApp from './reducers';

// create a store that has redux-thunk middleware enabled
const createStoreWithMiddleware = applyMiddleware(
  createSagaMiddleware()
)(createStore);

const store = createStoreWithMiddleware(PequodApp);

const Root = () => (
  <Provider store={store}>
    <Pequod />
  </Provider>
);

export default Root;
