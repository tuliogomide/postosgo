export const Types = {
  GET_UPDATE_PAGE: 'app/GET_UPDATE_PAGE',
  CLOSE_NOTIFICATION: 'app/CLOSE_NOTIFICATION',
  OPEN_NOTIFICATION: 'app/OPEN_NOTIFICATION',

};

const initialState = {
  page: 0,

  //notificações
  openNotification: false,
  messageNotification: '',
  typeNotification: 'success',

};

export default function (state = initialState, action) {
  switch (action.type) {
    case Types.GET_UPDATE_PAGE:
      return { ...state, page: action.payload };
    case Types.CLOSE_NOTIFICATION:
      return { ...state, openNotification: false };
    case Types.OPEN_NOTIFICATION:
      return {
        ...state,
        openNotification: true,
        messageNotification: action.payload.message,
        typeNotification: action.payload.type,
      };
    default:
      return state;
  }
}

export const Creators = {
  getUpdatePage: (page) => ({
    type: Types.GET_UPDATE_PAGE,
    payload: page,
  }),
  closeNotification: () => ({
    type: Types.CLOSE_NOTIFICATION,
  }),
  openNotification: data => ({
    type: Types.OPEN_NOTIFICATION,
    payload: data,
  }),

};
