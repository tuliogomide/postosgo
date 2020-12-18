import {
    call, takeLatest, all, put, 
  } from 'redux-saga/effects';
  import api from 'services/api';
  import { Types, Creators } from '@store/ducks/postos/insert/postoInsert';
  import { callApi } from 'store/sagas/auth';
  
  function* getFavoriteInsert({ payload }) {
    try {
      const {
        id,
      } = payload;
      const request = call(api.post, '/v1/client/favorites', {
        id,
      });
      const response = yield call(callApi, request);
      yield put(Creators.getFavoriteInsertSuccess(response.data));
    } catch (err) {
      yield put(Creators.getAddressInsertFailure('Erro ao tentar inserir na API'));
    }
  }
  
  
  export default function* favoritesListSaga() {
    yield all([
      takeLatest(Types.GET_INSERT_REQUEST, getFavoriteInsert),
    ]);
  }