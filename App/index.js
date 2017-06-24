import React from 'react';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import createSagaMiddleware from 'redux-saga';
import Pequod from './containers/Pequod';
import PequodApp from './reducers';
import rootSaga from './sagas';

// create a store that has redux-saga enabled
const sagaMiddleware = createSagaMiddleware();
const store = createStore(
  PequodApp,
  applyMiddleware(sagaMiddleware)
);
sagaMiddleware.run(rootSaga);

const Root = () => (
  <Provider store={store}>
    <Pequod />
  </Provider>
);

export default Root;
