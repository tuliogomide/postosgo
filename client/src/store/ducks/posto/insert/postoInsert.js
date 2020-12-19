// Lista todas as Lojas
export const Types = {
  GET_INSERT_REQUEST: 'posto-insert/GET_INSERT_REQUEST',
  GET_INSERT_SUCCESS: 'posto-insert/GET_INSERT_SUCCESS',
  GET_INSERT_FAILURE: 'posto-insert/GET_INSERT_FAILURE',

  GET_INSERT_FINISH: 'posto-insert/GET_INSERT_FINISH',
};

export const initialState = {
  count: 0,
  total: 0,
  postoInsertLoading: false,
  postoInsertError: null,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case Types.GET_INSERT_REQUEST:
      return {
        ...state,
        count: 0,
        total: 0,
        postoInsertError: null,
        postoInsertLoading: true,
      };
    case Types.GET_INSERT_SUCCESS:
      return {
        ...state,
        count: state.count+1,
        total: action.payload.total,
        postoInsertError: null,
      };
    case Types.GET_INSERT_FAILURE:
      return {
        ...state,
        count: 0,
        total: 0,
        postoInsertLoading: false,
        postoInsertError: action.payload,
      };
    case Types.GET_INSERT_FINISH:
      return {
        ...state,
        count: 0,
        total: 0,
        postoInsertLoading: false,
        postoInsertError: null,
      };
    default:
      return state;
  }
};

export const Creators = {
  getPostoInsertRequest: data => ({
    type: Types.GET_INSERT_REQUEST,
    payload: data,

  }),
  getPostoInsertSuccess: ({ total }) => ({
    type: Types.GET_INSERT_SUCCESS,
    payload: { total },
  }),
  getPostoInsertFailure: error => ({
    type: Types.GET_INSERT_FAILURE,
    payload: error,
  }),
  getPostoInsertFinish: () => ({
    type: Types.GET_INSERT_FINISH,
  }),
};
