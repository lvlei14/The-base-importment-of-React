const ADD_SURGERY = 'ADD_SURGERY';
const ADD_SURGERY_SUCCESS = 'ADD_SURGERY_SUCCESS';
const ADD_SURGERY_FAIL = 'ADD_SURGERY_FAIL';

const LOAD_SURGERY_BY_ID = 'LOAD_SURGERY_BY_ID';
const LOAD_SURGERY_BY_ID_SUCCESS = 'LOAD_SURGERY_BY_ID_SUCCESS';
const LOAD_SURGERY_BY_ID_FAIL = 'LOAD_SURGERY_BY_ID_FAIL';

const MODIFY_SURGERY_BY_ID = 'MODIFY_SURGERY_BY_ID';
const MODIFY_SURGERY_BY_ID_SUCCESS = 'MODIFY_SURGERY_BY_ID_SUCCESS';
const MODIFY_SURGERY_BY_ID_FAIL = 'MODIFY_SURGERY_BY_ID_FAIL';

const DELETE_SURGERY_BY_ID = 'DELETE_SURGERY_BY_ID';
const DELETE_SURGERY_BY_ID_SUCCESS = 'DELETE_SURGERY_BY_ID_SUCCESS';
const DELETE_SURGERY_BY_ID_FAIL = 'DELETE_SURGERY_BY_ID_FAIL';

const LOAD_SURGERY_BY_DATE_FORMATED_BY_ROOM = 'LOAD_SURGERY_BY_DATE_FORMATED_BY_ROOM';
const LOAD_SURGERY_BY_DATE_FORMATED_BY_ROOM_SUCCESS = 'LOAD_SURGERY_BY_DATE_FORMATED_BY_ROOM_SUCCESS';
const LOAD_SURGERY_BY_DATE_FORMATED_BY_ROOM_FAIL = 'LOAD_SURGERY_BY_DATE_FORMATED_BY_ROOM_FAIL';

const LOAD_SURGERYS = 'LOAD_SURGERYS';
const LOAD_SURGERYS_SUCCESS = 'LOAD_SURGERYS_SUCCESS';
const LOAD_SURGERYS_FAIL = 'LOAD_SURGERYS_FAIL';

const SET_SURGERY_STATUS = 'SET_SURGERY_STATUS';
const SET_SURGERY_STATUS_SUCCESS = 'SET_SURGERY_STATUS_SUCCESS';
const SET_SURGERY_STATUS_FAIL = 'SET_SURGERY_STATUS_FAIL';

const CLEAR_SURGERYS_FAIL = 'CLEAR_SURGERYS_FAIL';

const initState = {
  addSurgerySuccess: false,
  modifySurgerySuccess: false,
  setSurgeryStatusSuccess: false,
  newCreateSurgeryId: '',
  deleteSurgerySuccess: false,
  loading: false,
  surgery: {},
  successMsg: '',
  surgeries: [],
  roomFormatedSurgeries: [],
  errorMsg: ''
};

export default function surgeryReducer(state = initState, action = {}) {
  state.successMsg = '';
  state.errorMsg = '';
  switch (action.type) {
    case CLEAR_SURGERYS_FAIL:
      return {
        ...state,
        surgery: {}
      };
    case ADD_SURGERY:
      return {
        ...state,
        loading: true,
        addSurgerySuccess: false,
        newCreateSurgeryId: ''
      };
    case ADD_SURGERY_SUCCESS:
      return {
        ...state,
        loading: false,
        addSurgerySuccess: true,
        successMsg: action.result.success_msg,
        newCreateSurgeryId: action.result.id
      };
    case ADD_SURGERY_FAIL:
      return {
        ...state,
        loading: false,
        addSurgerySuccess: false,
        error: action.error.error_msg
      };

    case MODIFY_SURGERY_BY_ID:
      return {
        ...state,
        loading: true,
        modifySurgerySuccess: false
      };
    case MODIFY_SURGERY_BY_ID_SUCCESS:
      return {
        ...state,
        loading: false,
        modifySurgerySuccess: true,
        successMsg: action.result.success_msg
      };
    case MODIFY_SURGERY_BY_ID_FAIL:
      return {
        ...state,
        loading: false,
        modifySurgerySuccess: false,
        error: action.error.error_msg
      };

    case LOAD_SURGERY_BY_ID:
      return {
        ...state,
        loading: true
      };
    case LOAD_SURGERY_BY_ID_SUCCESS:
      return {
        ...state,
        loading: false,
        surgery: action.result
      };
    case LOAD_SURGERY_BY_ID_FAIL:
      return {
        ...state,
        loading: false,
        error: action.error.error_msg
      };

    case LOAD_SURGERYS:
      return {
        ...state,
        loading: true
      };
    case LOAD_SURGERYS_SUCCESS:
      return {
        ...state,
        loading: false,
        surgeries: action.result
      };
    case LOAD_SURGERYS_FAIL:
      return {
        ...state,
        loading: false,
        error: action.error.error_msg
      };
    case LOAD_SURGERY_BY_DATE_FORMATED_BY_ROOM:
      return {
        ...state,
        loading: true
      };
    case LOAD_SURGERY_BY_DATE_FORMATED_BY_ROOM_SUCCESS:
      return {
        ...state,
        loading: false,
        roomFormatedSurgeries: action.result
      };
    case LOAD_SURGERY_BY_DATE_FORMATED_BY_ROOM_FAIL:
      return {
        ...state,
        loading: false,
        error: action.error.error_msg
      };
    case SET_SURGERY_STATUS:
      return {
        ...state,
        setSurgeryStatusSuccess: false,
        loading: true
      };
    case SET_SURGERY_STATUS_SUCCESS:
      return {
        ...state,
        loading: false,
        setSurgeryStatusSuccess: true,
        surgeries: state.surgeries.map((surgery) =>
                                        surgery._id === action.id
                                        ? {...surgery, status: 'done'}
                                        : surgery
                                        ),
        successMsg: action.result.success_msg
      };
    case SET_SURGERY_STATUS_FAIL:
      return {
        ...state,
        loading: false,
        setSurgeryStatusSuccess: false,
        error: action.error.error_msg
      };
    default:
      return state;
  }
}


/**
 * @param options
 * @returns {{types: *[], promise: promise}}
 */
export function createSurgery(options) {
  return {
    types: [ADD_SURGERY, ADD_SURGERY_SUCCESS, ADD_SURGERY_FAIL],
    promise: (client) => client.post('/surgery', {
      data: options
    })
  };
}

export function getSurgeryById(id) {
  return {
    types: [LOAD_SURGERY_BY_ID, LOAD_SURGERY_BY_ID_SUCCESS, LOAD_SURGERY_BY_ID_FAIL],
    promise: (client) => client.get('/surgery/' + id)
  };
}

export function getSurgeryByIdWithoutPopulate(id) {
  return {
    types: [LOAD_SURGERY_BY_ID, LOAD_SURGERY_BY_ID_SUCCESS, LOAD_SURGERY_BY_ID_FAIL],
    promise: (client) => client.get('/surgery/' + id + '/withoutPopulate')
  };
}

export function modifySurgeryById(id, surgery) {
  return {
    types: [MODIFY_SURGERY_BY_ID, MODIFY_SURGERY_BY_ID_SUCCESS, MODIFY_SURGERY_BY_ID_FAIL],
    promise: (client) => client.put('/surgery/' + id, {
      data: surgery
    })
  };
}

export function deleteSurgeryById(id) {
  return {
    types: [DELETE_SURGERY_BY_ID, DELETE_SURGERY_BY_ID_SUCCESS, DELETE_SURGERY_BY_ID_FAIL],
    promise: (client) => client.del('/surgery/' + id)
  };
}

export function getSurgeries() {
  return {
    types: [LOAD_SURGERYS, LOAD_SURGERYS_SUCCESS, LOAD_SURGERYS_FAIL],
    promise: (client) => client.get('/surgery')
  };
}

export function setSurgeryStatus(id, status) {
  return {
    types: [SET_SURGERY_STATUS, SET_SURGERY_STATUS_SUCCESS, SET_SURGERY_STATUS_FAIL],
    id: id,
    promise: (client) => client.put(`/surgery/${id}/status`, {
      data: {status: status}
    })
  };
}

export function loadSurgeryByDateAndRoom(date) {
  return {
    types: [LOAD_SURGERY_BY_DATE_FORMATED_BY_ROOM, LOAD_SURGERY_BY_DATE_FORMATED_BY_ROOM_SUCCESS, LOAD_SURGERY_BY_DATE_FORMATED_BY_ROOM_FAIL],
    promise: (client) => client.get(`/surgery/date/${date}/roomFormat`)
  };
}


export function clearInitSurgery() {
  return {
    type: CLEAR_SURGERYS_FAIL
  };
}
