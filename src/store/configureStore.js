import createLogger from 'redux-logger';
import createSagaMiddleware from 'redux-saga';
import {createStore, applyMiddleware} from 'redux';

import rootReducer from '../reducers';
import * as sagas from '../sagas';

const logger = createLogger({
  predicate: (_, action) => !action.type.includes('EFFECT_'),
  collapsed: () => true,
});

export const sagaMiddleware = createSagaMiddleware(
  ...Object.values(sagas),
);


export default function configureStore(initialState) {
  const store = createStore(rootReducer, initialState, applyMiddleware(sagaMiddleware, logger));

  if (module.hot) {
    module.hot.accept('../reducers', () => {
      const nextRootReducer = require('../reducers').default;
      console.info('[configureStore.js] ', 'nextRootReducer');
      store.replaceReducer(nextRootReducer);
    });
  }

  return store;
}
