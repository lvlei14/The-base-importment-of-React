const SHOW_DIAGLOG = 'SHOW_DIAGLOG';
const HIDE_DIAGLOG = 'HIDE_DIAGLOG';

const initState = {
  show: false,
  text: '',
  redirectUrl: ''
};

export function diaglogReducer(state = initState, action) {
  switch (action.type) {
    case SHOW_DIAGLOG:
      return {
        ...state,
        show: true,
        text: action.text,
        redirectUrl: action.redirectUrl
      };
    case HIDE_DIAGLOG:
      return {
        ...state,
        show: false,
        text: '',
        redirectUrl: ''
      };
    default:
      return state;
  }
}

export function showDiaglog(text, url) {
  return {
    type: SHOW_DIAGLOG,
    text: text,
    redirectUrl: url
  };
}

export function hideDiaglog() {
  return {
    type: HIDE_DIAGLOG,
    text: '',
    redirectUrl: ''
  };
}
