
import { applyMiddleware, compose, createStore } from 'redux';
import storage from 'redux-persist/lib/storage';
import { createBrowserHistory } from 'history';
import { persistStore, persistReducer } from 'redux-persist';
import createSagaMiddleware from 'redux-saga';
import { routerMiddleware } from 'connected-react-router';

import reactotron from '@config/reactotronConfig';
import rootSaga from './sagas/index';
import reducers from './ducks/index';

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['auth'],
};

const history = createBrowserHistory();

const routeMiddleware = routerMiddleware(history);
const sagaMiddleware = createSagaMiddleware();

const middlewares = [sagaMiddleware, routeMiddleware];
const persistedReducer = persistReducer(persistConfig, reducers(history));

// Reactotron
const createCompose = process.env.NODE_ENV === 'production'
  ? compose(applyMiddleware(...middlewares))
  : compose(
    applyMiddleware(...middlewares),
    reactotron.createEnhancer(),
  );

export default function configureStore() {
  const store = createStore(persistedReducer, createCompose);
  const persistor = persistStore(store);
  sagaMiddleware.run(rootSaga);
  return { store, persistor };
}
export { history };
