// Lista todas as Lojas
export const Types = {
    GET_INSERT_REQUEST: 'posto-insert/GET_INSERT_REQUEST',
    GET_INSERT_SUCCESS: 'posto-insert/GET_INSERT_SUCCESS',
    GET_INSERT_FAILURE: 'posto-insert/GET_INSERT_FAILURE',
  };
  
  export const initialState = {
  
    postoInsertLoading: false,
    postoInsertError: null,
  };
  
  export default (state = initialState, action) => {
    switch (action.type) {
      case Types.GET_INSERT_REQUEST:
        return {
          ...state,
          postoInsertError: null,
          postoInsertLoading: true,
        };
      case Types.GET_INSERT_SUCCESS:
        return {
          ...state,
          postoInsertLoading: false,
          postoInsertError: null,
        };
      case Types.GET_INSERT_FAILURE:
        return {
          ...state,
          postoInsertLoading: false,
          postoInsertError: action.payload,
        };
      default:
        return state;
    }
  };
  
  export const Creators = {
    getFavoriteInsertRequest: data => ({
      type: Types.GET_INSERT_REQUEST,
      payload: { data },
  
    }),
    getFavoriteInsertSuccess: ({ data, total }) => ({
      type: Types.GET_INSERT_SUCCESS,
      payload: { data, total },
    }),
    getFavoriteInsertFailure: error => ({
      type: Types.GET_INSERT_FAILURE,
      payload: error,
    }),
  };
  