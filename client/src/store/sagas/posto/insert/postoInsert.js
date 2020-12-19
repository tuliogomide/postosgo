import {
  call, takeLatest, all, put,
} from 'redux-saga/effects';
import api from '@services/api';
import { Types, Creators } from '@store/ducks/posto/insert/postoInsert';
import { callApi } from '@store/sagas/auth';

function* getPostoInsert({ payload }) {
  try {
    for (const posto of payload) {
      const request = call(api.post, '/postos/cadastrar', {
        ...posto,
      });

      const response = yield call(callApi, request);
      if (response.status === 401) throw response;
      yield put(Creators.getPostoInsertSuccess({ total: payload.length }));
    }
    yield put(Creators.getPostoInsertFinish());
  } catch (err) {
    yield put(Creators.getPostoInsertFailure('Erro ao tentar inserir na API'));
  }
}


export default function* postoInsertSaga() {
  yield all([
    takeLatest(Types.GET_INSERT_REQUEST, getPostoInsert),
  ]);
}