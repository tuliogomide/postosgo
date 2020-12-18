import React from 'react';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { ConnectedRouter } from 'connected-react-router/immutable';
import App from './components/App';

import configureStore, { history } from './store/index';

const { persistor, store } = configureStore();

function ReactApp() {
  return (
    <div>
      <Provider store={store}>
        <PersistGate persistor={persistor}>
          <ConnectedRouter history={history}>
            <App />
          </ConnectedRouter>
        </PersistGate>
      </Provider>
    </div>
  );
}

export default ReactApp;