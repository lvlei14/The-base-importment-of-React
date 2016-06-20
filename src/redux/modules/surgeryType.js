const CREATE_SURGERY_TYPE = 'CREATE_SURGERY_TYPE';
const CREATE_SURGERY_TYPE_SUCCESS = 'CREATE_SURGERY_TYPE_SUCCESS';
const CREATE_SURGERY_TYPE_FAIL = 'CREATE_SURGERY_TYPE_FAIL';

const GET_SURGERY_TYPES = 'GET_SURGERY_TYPES';
const GET_SURGERY_TYPES_SUCCESS = 'GET_SURGERY_TYPES_SUCCESS';
const GET_SURGERY_TYPES_FAIL = 'GET_SURGERY_TYPES_FAIL';

const DELETE_SURGERY_TYPE = 'DELETE_SURGERY_TYPE';
const DELETE_SURGERY_TYPE_SUCCESS = 'DELETE_SURGERY_TYPE_SUCCESS';
const DELETE_SURGERY_TYPE_FAIL = 'DELETE_SURGERY_TYPE_FAIL';

const UPDATE_SURGERY_TYPE_BY_ID = 'UPDATE_SURGERY_TYPE_BY_ID';
const UPDATE_SURGERY_TYPE_BY_ID_SUCCESS = 'UPDATE_SURGERY_TYPE_BY_ID_SUCCESS';
const UPDATE_SURGERY_TYPE_BY_ID_FAIL = 'UPDATE_SURGERY_TYPE_BY_ID_FAIL';

const LOAD_SURGERY_TYPE_BY_ID = 'LOAD_SURGERY_TYPE_BY_ID';
const LOAD_SURGERY_TYPE_BY_ID_SUCCESS = 'LOAD_SURGERY_TYPE_BY_ID_SUCCESS';
const LOAD_SURGERY_TYPE_BY_ID_FAIL = 'LOAD_SURGERY_TYPE_BY_ID_FAIL';

const CLEAR_SURGERY_TYPE = 'CLEAR_SURGERY_TYPE';

const initialState = {
  createSurgeryTypeSuccess: false,
  updateSurgeryTypeSuccess: false,
  deleteSurgeryTypeSuccess: false,
  loading: false,
  successMsg: '',
  surgeryType: {},
  surgeryTypes: [],
  errorMsg: ''
};

export default function reducer(state = initialState, action = {}) {
  state.successMsg = '';
  state.errorMsg = '';
  switch (action.type) {
    case CLEAR_SURGERY_TYPE:
      return {
        ...state,
        surgeryType: {}
      };
    case CREATE_SURGERY_TYPE:
      return {
        ...state,
        loading: true,
        createSurgeryTypeSuccess: false
      };
    case CREATE_SURGERY_TYPE_SUCCESS:
      return {
        ...state,
        loading: false,
        createSurgeryTypeSuccess: true,
        successMsg: action.result.success_msg
      };
    case CREATE_SURGERY_TYPE_FAIL:
      return {
        ...state,
        loading: false,
        createSurgeryTypeSuccess: false,
        errMsg: action.error && action.error.error_msg
      };
    case UPDATE_SURGERY_TYPE_BY_ID:
      return {
        ...state,
        loading: true,
        updateSurgeryTypeSuccess: false
      };
    case UPDATE_SURGERY_TYPE_BY_ID_SUCCESS:
      return {
        ...state,
        loading: false,
        updateSurgeryTypeSuccess: true,
        successMsg: action.result.success_msg
      };
    case UPDATE_SURGERY_TYPE_BY_ID_FAIL:
      return {
        ...state,
        loading: false,
        updateSurgeryTypeSuccess: false,
        errMsg: action.error && action.error.error_msg
      };
    case LOAD_SURGERY_TYPE_BY_ID:
      return {
        ...state,
        loading: true,
      };
    case LOAD_SURGERY_TYPE_BY_ID_SUCCESS:
      return {
        ...state,
        loading: false,
        surgeryType: action.result
      };
    case LOAD_SURGERY_TYPE_BY_ID_FAIL:
      return {
        ...state,
        loading: false
      };
    case GET_SURGERY_TYPES:
      return {
        ...state,
        loading: true,
        surgeryTypes: [],
      };
    case GET_SURGERY_TYPES_SUCCESS:
      return {
        ...state,
        loading: false,
        surgeryTypes: action.result,
        successMsg: action.success_msg
      };
    case GET_SURGERY_TYPES_FAIL:
      return {
        ...state,
        loading: false,
        errMsg: action.error && action.error.error_msg
      };
    case DELETE_SURGERY_TYPE:
      return {
        ...state,
        loading: true,
        deleteSurgeryTypeSuccess: false
      };
    case DELETE_SURGERY_TYPE_SUCCESS:
      return {
        ...state,
        loading: false,
        deleteSurgeryTypeSuccess: true,
        successMsg: action.result.success_msg
      };
    case DELETE_SURGERY_TYPE_FAIL:
      return {
        ...state,
        loading: false,
        deleteSurgeryTypeSuccess: false,
        errMsg: action.error && action.error.error_msg
      };
    default:
      return state;
  }
}


export function createSurgeryType(hospitalId, type) {
  return {
    types: [
      CREATE_SURGERY_TYPE, CREATE_SURGERY_TYPE_SUCCESS, CREATE_SURGERY_TYPE_FAIL
    ],
    promise: (client) => client.post(`/hospital/${hospitalId}/surgeryType`, {
      data: type
    })
  };
}

export function getSurgeryTypes(hospitalId) {
  return {
    types: [
      GET_SURGERY_TYPES, GET_SURGERY_TYPES_SUCCESS, GET_SURGERY_TYPES_FAIL
    ],
    promise: (client) => client.get(`/hospital/${hospitalId}/surgeryTypes`)
  };
}

export function updateSurgeryTypeById(id, surgeryType) {
  return {
    types: [
      UPDATE_SURGERY_TYPE_BY_ID, UPDATE_SURGERY_TYPE_BY_ID_SUCCESS, UPDATE_SURGERY_TYPE_BY_ID_FAIL
    ],
    promise: (client) => client.put('/surgeryType/' + id, {
      data: surgeryType
    })
  };
}

export function loadSurgeryTypeById(hospitalId, roomId) {
  return {
    types: [
      LOAD_SURGERY_TYPE_BY_ID, LOAD_SURGERY_TYPE_BY_ID_SUCCESS, LOAD_SURGERY_TYPE_BY_ID_FAIL
    ],
    promise: (client) => client.get(`/hospital/${hospitalId}/surgeryType/${roomId}`)
  };
}

export function deleteSurgeryTypeById(id) {
  return {
    types: [
      DELETE_SURGERY_TYPE, DELETE_SURGERY_TYPE_SUCCESS, DELETE_SURGERY_TYPE_FAIL
    ],
    promise: (client) => client.del('/surgeryType/' + id)
  };
}

export function clearSurgeryType() {
  return {
    type: CLEAR_SURGERY_TYPE
  };
}
