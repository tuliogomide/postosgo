export const Types = {
    // Obtem postos
    GET_LIST_REQUEST: 'posto/GET_LIST_REQUEST',
    GET_LIST_SUCCESS: 'posto/GET_LIST_SUCCESS',
    GET_LIST_FAILURE: 'posto/GET_LIST_FAILURE',
    
  
  };
  
  export const initialState = {
    // Lista de postos
    postoList: [],
    postoListLoading: false,
    postoListError: null,
  };
  
  export default (state = initialState, action) => {
    switch (action.type) {
      // Lista de postos
      case Types.GET_LIST_REQUEST:
        return { ...state, postoListLoading: true };
      case Types.GET_LIST_SUCCESS:
        return {
          ...state,
          postoList: action.payload,
          postoListLoading: false,
          postoListError: null,
        };
      case Types.GET_LIST_FAILURE:
        return {
          ...state,
          postoListLoading: false,
          postoListError: action.payload,
        };
      default:
        return state;
    }
  };
  
  export const Creators = {
    // Busca lista de postos
    getPostoListRequest: ({ lat, lng, cidade }) => ({
      type: Types.GET_LIST_REQUEST,
      payload: { lat, lng, cidade },
    }),
    getPostoListSuccess: ({ postos }) => ({
      type: Types.GET_LIST_SUCCESS,
      payload: postos,
    }),
    getPostoListFailure: error => ({
      type: Types.GET_LIST_FAILURE,
      payload: error,
    }),
  
  };
  