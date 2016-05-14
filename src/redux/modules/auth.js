const LOGIN = 'LOGIN';
const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
const LOGIN_FAIL = 'LOGIN_FAIL';

const LOGOUT = 'LOGOUT';
const LOGOUT_SUCCESS = 'LOGOUT_SUCCESS';
const LOGOUT_FAIL = 'LOGOUT_FAIL';

const REGISTER = 'REGISTER';
const REGISTER_SUCCESS = 'REGISTER_SUCCESS';
const REGISTER_FAIL = 'REGISTER_FAIL';

const SELECT_TAB = 'SELECT_TAB';


const initialState = {
  loading: false,
  user: null,
  registerInfo: {},
  selectedTabName: 1,  // default login tab
  msg: ''
};

export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case LOGIN:
      return {
        ...state,
        loading: true,
        msg: ''
      };
    case LOGIN_SUCCESS:
      return {
        ...state,
        loading: false,
        user: action.result,
        msg: action.msg
      };
    case LOGIN_FAIL:
      return {
        ...state,
        loading: false,
        user: null
      };
    case LOGOUT:
      return {
        ...state,
        loading: true
      };
    case LOGOUT_SUCCESS:
      return {
        ...state,
        loading: false,
        user: null,
        msg: action.msg
      };
    case LOGOUT_FAIL:
      return {
        ...state,
        loading: false
      };
    case REGISTER:
      return {
        ...state,
        loading: true
      };
    case REGISTER_SUCCESS:
      return {
        ...state,
        loading: false,
        msg: action.msg
      };
    case REGISTER_FAIL:
      return {
        ...state,
        loading: false,
        msg: action.msg
      };
    case SELECT_TAB:
      return {
        ...state,
        selectedTabName: action.selectedTabName
      };
    default:
      return state;
  }
}


export function isLoaded(globalState) {
  return globalState.auth && globalState.auth.loaded;
}


export function login(name, password) {
  return {
    types: [LOGIN, LOGIN_SUCCESS, LOGIN_FAIL],
    promise: (client) => client.post('/login', {
      data: {
        name: name,
        password: password
      }
    })
  };
}


export function logout() {
  return {
    types: [LOGOUT, LOGOUT_SUCCESS, LOGOUT_FAIL],
    promise: (client) => client.get('/logout')
  };
}


export function selectTab(tabName) {
  console.log(tabName);
  return {
    type: SELECT_TAB,
    selectedTabName: tabName
  };
}
