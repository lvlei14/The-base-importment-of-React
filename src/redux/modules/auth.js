import cookie from 'js-cookie';

const LOGIN = 'LOGIN';
const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
const LOGIN_FAIL = 'LOGIN_FAIL';

const LOGOUT = 'LOGOUT';
const LOGOUT_SUCCESS = 'LOGOUT_SUCCESS';
const LOGOUT_FAIL = 'LOGOUT_FAIL';

const LOAD = 'LOAD';
const LOAD_SUCCESS = 'LOAD_SUCCESS';
const LOAD_FAIL = 'LOAD_FAIL';

const REGISTER = 'REGISTER';
const REGISTER_SUCCESS = 'REGISTER_SUCCESS';
const REGISTER_FAIL = 'REGISTER_FAIL';

const GET_MSG_CODE = 'GET_MSG_CODE';
const GET_MSG_CODE_SUCCESS = 'GET_MSG_CODE_SUCCESS';
const GET_MSG_CODE_FAIL = 'GET_MSG_CODE_FAIL';

const SELECT_TAB = 'SELECT_TAB';

const initialState = {
  defaultLoginUser: '',
  loading: false,
  user: null,
  loaded: false,
  newUserId: '',       // judge register result
  msgCode: '',         // register msg code
  selectedTabName: 1,  // default login tab
  msg: '',
  errMsg: ''
};

export default function reducer(state = initialState, action = {}) {
  state.msg = '';
  state.errMsg = '';
  switch (action.type) {
    case LOGIN:
      return {
        ...state,
        loading: true
      };
    case LOGIN_SUCCESS:
      cookie.set('__token', action.result.token, {expires: 7});
      console.log('登陆成功');
      console.log(action);
      return {
        ...state,
        loading: false,
        user: Object.assign({}, action.result && action.result.user, {token: action.result && action.result.token}),
        msg: action.result && action.result.success_msg
      };
    case LOGIN_FAIL:
      console.log('====登录异常====');
      console.log(action);
      return {
        ...state,
        loading: false,
        user: null,
        errMsg: action.error && action.error.error_msg
      };
    case LOAD:
      return {
        ...state,
        loading: true
      };
    case LOAD_SUCCESS:
      return {
        ...state,
        loading: false,
        loaded: true,
        user: {token: action.result.token, ...action.result.user},
        msg: action.result && action.result.success_msg
      };
    case LOAD_FAIL:
      return {
        ...state,
        loading: false,
        loaded: false,
        user: null,
        errMsg: action.error && action.error.error_msg
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
    case GET_MSG_CODE:
      return {
        ...state,
        loading: true,
        msgCode: ''
      };
    case GET_MSG_CODE_SUCCESS:
      return {
        ...state,
        loading: false,
        msgCode: action.result,
        msg: action.msg
      };
    case GET_MSG_CODE_FAIL:
      return {
        ...state,
        loading: false,
        msgCode: ''
      };
    case REGISTER:
      return {
        ...state,
        newUserId: '',
        loading: true,
        defaultLoginUser: ''
      };
    case REGISTER_SUCCESS:
      console.log(action);
      return {
        ...state,
        loading: false,
        newUserId: action.result && action.result._id,
        defaultLoginUser: action.result.mobile,
        msg: action.result && action.result.success_msg
      };
    case REGISTER_FAIL:
      console.log(action);
      return {
        ...state,
        newUserId: '',
        loading: false,
        errMsg: action.error && action.error.error_msg
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

export function load() {
  return {
    types: [LOAD, LOAD_SUCCESS, LOAD_FAIL],
    promise: (client) => client.get('/auth/local')
  };
}

export function register(options) {
  options.reg_from = 'wechat';
  console.log('=====click 注册=====:');
  console.log(options);
  return {
    types: [REGISTER, REGISTER_SUCCESS, REGISTER_FAIL],
    promise: (client) => client.post('/user', {
      data: options
    })
  };
}


export function login(name, password) {
  return {
    types: [LOGIN, LOGIN_SUCCESS, LOGIN_FAIL],
    promise: (client) => client.post('/auth/local', {
      data: {
        loginId: name,
        password: password
      }
    })
  };
}


export function getMsgCode(phone) {
  return {
    types: [GET_MSG_CODE, GET_MSG_CODE_SUCCESS, GET_MSG_CODE_FAIL],
    promise: (client) => client.post('/msg-code/register', {
      data: {
        phone: phone
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
  return {
    type: SELECT_TAB,
    selectedTabName: tabName
  };
}


const LOAD_PW = 'LOAD_PW';
const LOAD_PW_SUCCESS = 'LOAD_PW_SUCCESS';
const LOAD_PW_FAIL = 'LOAD_PW_FAIL';
export function getPassword(id) {
  return {
    types: [LOAD_PW, LOAD_PW_SUCCESS, LOAD_PW_FAIL],
    promise: (client) => client.get(`/user/${id}/password`)
  };
}
