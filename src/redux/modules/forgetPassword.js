
const GET_CAPTCHA = 'GET_CAPTCHA';
const GET_CAPTCHA_SUCCESS = 'GET_CAPTCHA_SUCCESS';
const GET_CAPTCHA_FAIL = 'GET_CAPTCHA_FAIL';

const NEXT2RESETPASSWORD = 'NEXT2RESETPASSWORD';
const NEXT2RESETPASSWORD_SUCCESS = 'NEXT2RESETPASSWORD_SUCCESS';
const NEXT2RESETPASSWORD_FAIL = 'NEXT2RESETPASSWORD_FAIL';

const RESETPASSWORD = 'RESETPASSWORD';
const RESETPASSWORD_SUCCESS = 'RESETPASSWORD_SUCCESS';
const RESETPASSWORD_FAIL = 'RESETPASSWORD_FAIL';

const SETMOBILE = 'SETMOBILE';

const initialState = {
  loading: false,
  successMsg: '',
  errorMsg: '',
  createCaptchaSuccess: false,
  next2ResetPasswordSuccess: false,
  resetPasswordSuccess: false,
  mobile: ''
};

export default function reducer(state = initialState, action = {}) {
  state.successMsg = '';
  state.errorMsg = '';
  switch (action.type) {
    case GET_CAPTCHA:
      return {
        ...state,
        loading: true,
        createCaptchaSuccess: false
      };
    case GET_CAPTCHA_SUCCESS:
      return {
        ...state,
        loading: false,
        createCaptchaSuccess: true,
        successMsg: action.result.success_msg
      };
    case GET_CAPTCHA_FAIL:
      return {
        ...state,
        loading: false,
        createCaptchaSuccess: false,
        errMsg: action.error && action.error.error_msg
      };

    case NEXT2RESETPASSWORD:
      return {
        ...state,
        loading: true,
        next2ResetPasswordSuccess: false
      };
    case NEXT2RESETPASSWORD_SUCCESS:
      return {
        ...state,
        loading: false,
        next2ResetPasswordSuccess: true,
        successMsg: action.result.success_msg
      };
    case NEXT2RESETPASSWORD_FAIL:
      return {
        ...state,
        loading: false,
        next2ResetPasswordSuccess: false,
        errMsg: action.error && action.error.error_msg
      };

    case RESETPASSWORD:
      return {
        ...state,
        loading: true,
        resetPasswordSuccess: false
      };
    case RESETPASSWORD_SUCCESS:
      return {
        ...state,
        loading: false,
        resetPasswordSuccess: true,
        successMsg: action.result.success_msg
      };
    case RESETPASSWORD_FAIL:
      return {
        ...state,
        loading: false,
        resetPasswordSuccess: false,
        errMsg: action.error && action.error.error_msg
      };
    case SETMOBILE:
      return {
        loading: false,
        mobile: action.mobile
      };
    default:
      return state;
  }
}


export function getCaptcha(mobile) {
  return {
    types: [
      GET_CAPTCHA, GET_CAPTCHA_SUCCESS, GET_CAPTCHA_FAIL
    ],
    promise: (client) => client.post('/captcha/getMsgCode', {
      data: {
        mobile
      }
    })
  };
}

export function next2ResetPassword(mobile, captcha) {
  return {
    types: [
      NEXT2RESETPASSWORD, NEXT2RESETPASSWORD_SUCCESS, NEXT2RESETPASSWORD_FAIL
    ],
    promise: (client) => client.post('/captcha/checkRegisterMsg', {
      data: {
        mobile: mobile,
        captcha: captcha
      }
    })
  };
}

export function resetPassword(mobile, password) {
  return {
    types: [
      RESETPASSWORD, RESETPASSWORD_SUCCESS, RESETPASSWORD_FAIL
    ],
    promise: (client) => client.put('/user/' + mobile + '/newPassword', {
      data: {
        password: password
      }
    })
  };
}

export function setMobile(mobile) {
  return {type: SETMOBILE, mobile: mobile};
}

