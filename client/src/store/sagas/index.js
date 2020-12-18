import { all, fork } from 'redux-saga/effects';
import authSaga from './auth';
import postoListSaga from './postos/list/postosList';

export default function* rootSaga() {
  yield all([
    fork(authSaga),
    fork(postoListSaga),
  ]);
}
