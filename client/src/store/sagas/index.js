import { all, fork } from 'redux-saga/effects';
import authSaga from './auth';
import postoListSaga from './posto/list/postosList';
import postoInsertSaga from './posto/insert/postoInsert';

export default function* rootSaga() {
  yield all([
    fork(authSaga),
    fork(postoListSaga),
    fork(postoInsertSaga),
  ]);
}
