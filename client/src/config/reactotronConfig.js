import Reactotron from 'reactotron-react-js';
import { reactotronRedux } from 'reactotron-redux';
import sagaPlugin from 'reactotron-redux-saga';

const tron = () => {
  if (process.env.NODE_ENV === 'production') {
    const noop = () => undefined;
    console.tron = {
      configure: noop,
      connect: noop,
      use: noop,
      useReactNative: noop,
      clear: noop,
      log: noop,
      logImportant: noop,
      display: noop,
      error: noop,
    };
    return null;
  }
  const connection = Reactotron.configure()
    .use(reactotronRedux())
    .use(sagaPlugin()) // <-- sweet
    .connect(); // let's connect!
  console.tron = connection;
  console.tron.clear();
  return connection;
};

export default tron();
