const ADD_PATIENT = 'ADD_PATIENT';
const ADD_PATIENT_SUCCESS = 'ADD_PATIENT_SUCCESS';
const ADD_PATIENT_FAIL = 'ADD_PATIENT_FAIL';

const LOAD_PATIENT_BY_ID = 'LOAD_PATIENT_BY_ID';
const LOAD_PATIENT_BY_ID_SUCCESS = 'LOAD_PATIENT_BY_ID_SUCCESS';
const LOAD_PATIENT_BY_ID_FAIL = 'LOAD_PATIENT_BY_ID_FAIL';

const LOAD_PATIENTS = 'LOAD_PATIENTS';
const LOAD_PATIENTS_SUCCESS = 'LOAD_PATIENTS_SUCCESS';
const LOAD_PATIENTS_FAIL = 'LOAD_PATIENTS_FAIL';


const initState = {
  addPatientSuccess: false,
  loading: false,
  patient: {},
  successMsg: '',
  patients: [],
  errorMsg: ''
};

export default function addPatientInforReducer(state = initState, action = {}) {
  state.successMsg = '';
  state.errorMsg = '';
  switch (action.type) {
    case ADD_PATIENT:
      return {
        ...state,
        loading: true,
        addPatientSuccess: false
      };
    case ADD_PATIENT_SUCCESS:
      return {
        ...state,
        loading: false,
        addPatientSuccess: true,
        successMsg: action.result.success_msg
      };
    case ADD_PATIENT_FAIL:
      return {
        ...state,
        loading: false,
        addPatientSuccess: false,
        error: action.error.error_msg
      };

    case LOAD_PATIENT_BY_ID:
      return {
        ...state,
        loading: true
      };
    case LOAD_PATIENT_BY_ID_SUCCESS:
      return {
        ...state,
        loading: false,
        patient: action.result
      };
    case LOAD_PATIENT_BY_ID_FAIL:
      return {
        ...state,
        loading: false,
        error: action.error.error_msg
      };

    case LOAD_PATIENTS:
      return {
        ...state,
        loading: true
      };
    case LOAD_PATIENTS_SUCCESS:
      return {
        ...state,
        loading: false,
        patients: action.result
      };
    case LOAD_PATIENTS_FAIL:
      return {
        ...state,
        loading: false,
        error: action.error.error_msg
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
export function createPatient(options) {
  return {
    types: [ADD_PATIENT, ADD_PATIENT_SUCCESS, ADD_PATIENT_FAIL],
    promise: (client) => client.post('/patient', {
      data: options
    })
  };
}

export function getPatientById(id) {
  return {
    types: [LOAD_PATIENT_BY_ID, LOAD_PATIENT_BY_ID_SUCCESS, LOAD_PATIENT_BY_ID_FAIL],
    promise: (client) => client.get('/patient/' + id)
  };
}

export function getPatients() {
  return {
    types: [LOAD_PATIENTS, LOAD_PATIENTS_SUCCESS, LOAD_PATIENTS_FAIL],
    promise: (client) => client.get('/patient')
  };
}
