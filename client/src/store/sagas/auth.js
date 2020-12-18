import { call, put, all, takeLatest, select, take } from 'redux-saga/effects';
import { Creators as AuthCreators, Types as AuthTypes } from '@store/ducks/auth';
import { push } from 'connected-react-router';
import { REHYDRATE } from 'redux-persist';
import { Creators as NotificationCreators } from '@store/ducks/app';
import api from '@services/api';

function* getLogin({ payload: { username, password } }) {
  try {

    const response = yield call(api.post, '/usuario/login', {
      nome: username,
      senha: password,
    });
    if (response.status !== 200) {
      yield put(AuthCreators.getAuthFailure(response.data.mensagem));
      throw response;
    }
    yield call(
      api.setHeader,
      'Authorization',
      `Bearer ${response.data.access_token}`,
    );
    yield put(AuthCreators.getAuthSuccess(response.data));
    // yield put(LoginCreators.getLoginSuccess());

    yield put(push('/admin/criar'));
  } catch (err) {
    // yield put(LoginCreators.getLoginFailure(err.data.msg));
  }
}

function* getRefreshToken() {
  const {
    auth: {
      data: { refresh_token },
    },
  } = yield select();
  try {
    yield call(api.setHeader, 'Authorization', `Bearer ${refresh_token}`);
    const response = yield call(api.post, '/usuario/refresh-token');
    if (response.status !== 200) throw response;
    yield call(
      api.setHeader,
      'Authorization',
      `Bearer ${response.data.access_token}`,
    );
    yield call(api.setHeader, 'Authorization', `Bearer ${response.data.access_token}`);
    yield put(AuthCreators.getLoginRefreshTokenSuccess(response.data));
  } catch (e) {
    if (e.status === 401) {
      yield put(AuthCreators.getLoginRefreshTokenFailure(response.data.menssagem));
      yield put(push('/admin'));
    }
  }
}

function* getLogout() {
  yield put(AuthCreators.getLogoutSuccess());
  yield put(push('/admin'));
  yield put(
    NotificationCreators.openNotification({ message: 'Logout realizado com sucesso', type: 'success' })
  );
}

export function* setApiToken() {
  const { auth } = yield select();
  if (typeof auth.data) {
    yield call(
      api.setHeader,
      'Authorization',
      `Bearer ${auth.data.access_token}`,
    );
  }
}

export function* callApi(apiCall) {
  const response = yield apiCall;
  if (response.status === 201 || response.status === 200) {
    return response;
  }
  if (response.status === 401) {
    yield put(AuthCreators.getLoginRefreshTokenRequest());
    const action = yield take([
      AuthTypes.GET_REFRESH_TOKEN_SUCCESS,
      AuthTypes.GET_REFRESH_TOKEN_FAILURE,
    ]);
    if (action.type === AuthTypes.GET_REFRESH_TOKEN_FAILURE) {
      throw response;
    }
    const responseTakeTwo = yield apiCall;
    return responseTakeTwo;
  }
  if ( response.status === 500 ) {
    yield put(NotificationCreators.openNotification({ message: response.data.msg, type: 'error' }));
  }
  throw response;
}


export default function* AuthSagas() {
  yield takeLatest(REHYDRATE, setApiToken);
  yield all([
    takeLatest(AuthTypes.GET_REQUEST, getLogin),
    takeLatest(AuthTypes.GET_REFRESH_TOKEN_REQUEST, getRefreshToken),
    takeLatest(AuthTypes.GET_LOGOUT_REQUEST, getLogout),
  ]);
}
