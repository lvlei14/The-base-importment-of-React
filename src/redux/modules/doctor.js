const LOAD_DOCTORS = 'LOAD_DOCTORS';
const LOAD_DOCTORS_SUCCESS = 'LOAD_DOCTORS_SUCCESS';
const LOAD_DOCTORS_FAIL = 'LOAD_DOCTORS_FAIL';

const initState = {
  loading: false,
  doctor: {},
  successMsg: '',
  doctors: [],
  errorMsg: ''
};

export default function surgeryReducer(state = initState, action = {}) {
  state.successMsg = '';
  state.errorMsg = '';
  switch (action.type) {
    case LOAD_DOCTORS:
      return {
        ...state,
        loading: true
      };
    case LOAD_DOCTORS_SUCCESS:
      return {
        ...state,
        loading: false,
        doctors: action.result
      };
    case LOAD_DOCTORS_FAIL:
      return {
        ...state,
        loading: false,
        error: action.error.error_msg
      };
    default:
      return state;
  }
}

export function loadDoctors() {
  return {
    types: [LOAD_DOCTORS, LOAD_DOCTORS_SUCCESS, LOAD_DOCTORS_FAIL],
    promise: (client) => client.get('/user/doctor')
  };
}
