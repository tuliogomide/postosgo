import { call, takeLatest, all, put} from 'redux-saga/effects';
import api from '@services/api';

import { Types, Creators } from '@store/ducks/posto/list/postosList';

function* getPostoList({ payload }) {
  try {
    const { lat, lng, cidade } = payload;
    const response = yield call(api.get, '/postos/listar/'+lat+'/'+lng+'/'+cidade+'/geolocal');
    if (response.status !== 200) throw response;
    yield put(Creators.getPostoListSuccess(response.data));
  } catch (err) {
    yield put(Creators.getPostoListFailure(err.data.mensagem));
  }
}


// Individual exports for testing
export default function* postoListSaga() {
  yield all([
    takeLatest(Types.GET_LIST_REQUEST, getPostoList),
  ]);
}
