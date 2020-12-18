export const Types = {
  GET_REQUEST: 'auth/GET_REQUEST',
  GET_SUCCESS: 'auth/GET_SUCCESS',
  GET_FAILURE: 'auth/GET_FAILURE',
  GET_UNAUTH_USER: 'auth/GET_UNAUTH_USER',

  // Type para refresh token
  GET_REFRESH_TOKEN_REQUEST: 'auth/GET_REFRESH_TOKEN_REQUEST',
  GET_REFRESH_TOKEN_SUCCESS: 'auth/GET_REFRESH_TOKEN_SUCCESS',
  GET_REFRESH_TOKEN_FAILURE: 'auth/GET_REFRESH_TOKEN_FAILURE',

  // Faz o Logout
  GET_LOGOUT_REQUEST: 'auth/GET_LOGOUT_REQUEST',
  GET_LOGOUT_SUCCESS: 'auth/GET_LOGOUT_SUCCESS',

  RESET_LOGIN: 'auth/RESET_LOGIN',
};

const initialState = {
  data: {
    expired_at: '',
    access_token: '',
    refresh_token: '',
  },
  isAuth: false,
  loading: false,
  error: null,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case Types.GET_REQUEST:
      return { ...state, loading: true, error: null };
    case Types.GET_SUCCESS:
      return {
        ...state,
        loading: false,
        data: action.payload,
        error: null,
        isAuth: true,
      };
    case Types.GET_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
        isAuth: false,
      }
    case Types.GET_UNAUTH_USER:
      return initialState;
    case Types.GET_REFRESH_TOKEN_SUCCESS:
      return {
        ...state,
        data: action.payload,
        isAuth: true,
        loading: false,
        error: null,
      };
    case Types.GET_REFRESH_TOKEN_FAILURE:
      return {
        ...state,
        isAuth: false,
        loading: false,
        error: action.payload,
      }
    case Types.GET_LOGOUT_SUCCESS:
      return {
        ...state,
        data: {
          expired_at: '',
          access_token: '',
          refresh_token: '',
        },
        isAuth: false,
        loading: false,
        error: null,
      };
    case Types.RESET_LOGIN:
      return {
        ...state,
        loading: false,
        error: null,
      }
    default:
      return state;
  }
}

export const Creators = {
  getAuthRequest: ({ username, password }) => ({
    type: Types.GET_REQUEST,
    payload: { username, password },
  }),
  getAuthSuccess: data => ({
    type: Types.GET_SUCCESS,
    payload: data,
  }),
  getAuthFailure: data => ({
    type: Types.GET_FAILURE,
    payload: data,
  }),
  getAuthUnauthUser: () => ({
    type: Types.GET_UNAUTH_USER,
  }),
  getLoginRefreshTokenRequest: () => ({
    type: Types.GET_REFRESH_TOKEN_REQUEST,
  }),
  getLoginRefreshTokenSuccess: data => ({
    type: Types.GET_REFRESH_TOKEN_SUCCESS,
    payload: data,
  }),
  getLoginRefreshTokenFailure: data => ({
    type: Types.GET_REFRESH_TOKEN_FAILURE,
    payload: data,
  }),
  // Faz o Logout
  getLogoutRequest: () => ({
    type: Types.GET_LOGOUT_REQUEST,
  }),
  getLogoutSuccess: () => ({
    type: Types.GET_LOGOUT_SUCCESS,
  }),
  resetLogin: () => ({
    type: Types.RESET_LOGIN,
  }),
};
