const LOAD_DOCTOR = 'LOAD_DOCTOR';
const LOAD_DOCTOR_SUCCESS = 'LOAD_DOCTOR_SUCCESS';
const LOAD_DOCTOR_FAIL = 'LOAD_DOCTOR_FAIL';

const ADD_APPART_NEED = 'ADD_APPART_NEED';
const ADD_APPART_NEED_SUCCESS = 'ADD_APPART_NEED_SUCCESS';
const ADD_APPART_NEED_FAIL = 'ADD_APPART_NEED_FAIL';

const initState = {
  error: null,
  tip: null,
  doctors: [],
  addAppartNeedSuccess: false,
  successMsg: null,
  errorMsg: null,
};

export function needAppartInfoReducer(state = initState, action = {}) {
  state.successMsg = null;
  state.errorMsg = null;
  switch (action.type) {
    case LOAD_DOCTOR:
      return {
        ...state,
        loading: true
      };

    case LOAD_DOCTOR_SUCCESS:
      return {
        ...state,
        loading: false,
        doctors: action.result.result,
        tip: action.tip
      };

    case LOAD_DOCTOR_FAIL:
      return {
        ...state,
        loading: false,
        tip: action.tip
      };


    case ADD_APPART_NEED:
      return {
        ...state,
        loading: true,
        addAppartNeedSuccess: false
      };

    case ADD_APPART_NEED_SUCCESS:
      return {
        ...state,
        loading: false,
        addAppartNeedSuccess: true,
        successMsg: action.result && action.result.success_msg,
        tip: action.tip,
      };

    case ADD_APPART_NEED_FAIL:
      return {
        ...state,
        loading: false,
        addAppartNeedSuccess: false,
        errorMsg: action.error && action.error.error_msg,
        tip: action.tip
      };

    default:
      return state;
  }
}


/**
 * action: load template item by templateId
 * @param text String
 * @returns {{types: *[], promise: promise}}
 */
export function loadDoctors(id) {
  return {
    types: [LOAD_DOCTOR, LOAD_DOCTOR_SUCCESS, LOAD_DOCTOR_FAIL],
    promise: (client) => client.get('/template/' + id)
  };
}

/**
 * action: add APPART_NEED
 * @param text String
 * @returns {{types: *[], promise: promise}}
 */
export function addAppartNeed(tempObject) {
  return {
    types: [ADD_APPART_NEED, ADD_APPART_NEED_SUCCESS, ADD_APPART_NEED_FAIL],
    promise: (client) => client.post('/schedule/', {
      data: tempObject
    })
  };
}
