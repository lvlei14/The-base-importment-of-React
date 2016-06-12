const ADD_PATIENT_INFOR = 'ADD_PATIENT_INFOR';
const ADD_PATIENT_INFOR_SUCCESS = 'ADD_PATIENT_INFOR_SUCCESS';
const ADD_PATIENT_INFOR_FAIL = 'ADD_PATIENT_INFOR_FAIL';

const initState = {
  error: null,
  tip: null,
};

export function addPatientInforReducer(state = initState, action = {}) {
  switch (action.type) {
    case ADD_PATIENT_INFOR:
      return {
        ...state,
        error: null,
        tip: null
      };
    case ADD_PATIENT_INFOR_SUCCESS:
      return {
        ...state,
        tip: action.tip,
        error: null
      };
    case ADD_PATIENT_INFOR_FAIL:
      return {
        ...state,
        error: action.result,
        tip: null
      };

    default:
      return state;
  }
}


/**
 * action: add patient
 * @param options
 * @returns {{types: *[], promise: promise}}
 */
export function addPatientInfor(options) {
  return {
    types: [ADD_PATIENT_INFOR, ADD_PATIENT_INFOR_SUCCESS, ADD_PATIENT_INFOR_FAIL],
    promise: (client) => client.post('', {
      data: options
    })
  };
}
