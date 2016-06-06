const MODIFY_PATIENT_INFOR = 'MODIFY_PATIENT_INFOR';
const MODIFY_PATIENT_INFOR_SUCCESS = 'MODIFY_PATIENT_INFOR_SUCCESS';
const MODIFY_PATIENT_INFOR_FAIL = 'MODIFY_PATIENT_INFOR_FAIL';

const LOAD_PATIENT_INFOR = 'LOAD_PATIENT_INFOR';
const LOAD_PATIENT_INFOR_SUCCESS = 'LOAD_PATIENT_INFOR_SUCCESS';
const LOAD_PATIENT_INFOR_FAIL = 'LOAD_PATIENT_INFOR_FAIL';

const patientInfor = {
  id: '02999',
  name: '张三',
  gender: 'female',
  age: '30',
  roomNum: 'F009',
};

const initState = {
  error: null,
  tip: null,
  patientInfor: patientInfor || {},
};

export function patientInforReducer(state = initState, action = {}) {
  switch (action.type) {
    case MODIFY_PATIENT_INFOR:
      return {
        ...state,
        error: null,
        tip: null
      };
    case MODIFY_PATIENT_INFOR_SUCCESS:
      return {
        ...state,
        tip: action.tip,
        error: null
      };
    case MODIFY_PATIENT_INFOR_FAIL:
      return {
        ...state,
        error: action.result,
        tip: null
      };


    case LOAD_PATIENT_INFOR:
      return {
        ...state,
        error: null,
        tip: null
      };
    case LOAD_PATIENT_INFOR_SUCCESS:
      console.log(action);
      return {
        ...state,
        tip: action.tip,
        patientInfor: action.result,
        error: null
      };
    case LOAD_PATIENT_INFOR_FAIL:
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
export function modifyPatientInfor(options) {
  return {
    types: [MODIFY_PATIENT_INFOR, MODIFY_PATIENT_INFOR_SUCCESS, MODIFY_PATIENT_INFOR_FAIL],
    promise: (client) => client.post('', {
      data: options
    })
  };
}

/**
 * action: modify patient information
 *
 */
export function loadPatientInformation() {
  return {
    types: [LOAD_PATIENT_INFOR, LOAD_PATIENT_INFOR_SUCCESS, LOAD_PATIENT_INFOR_FAIL],
    promise: (client) => client.post('')
  };
}
