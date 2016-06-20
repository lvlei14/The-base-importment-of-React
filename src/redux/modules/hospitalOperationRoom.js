const CREATE_HOSPITAL_OPER_ROOM = 'CREATE_HOSPITAL_OPER_ROOM';
const CREATE_HOSPITAL_OPER_ROOM_SUCCESS = 'CREATE_HOSPITAL_OPER_ROOM_SUCCESS';
const CREATE_HOSPITAL_OPER_ROOM_FAIL = 'CREATE_HOSPITAL_OPER_ROOM_FAIL';

const GET_HOSPITAL_OPER_ROOMS = 'GET_HOSPITAL_OPER_ROOMS';
const GET_HOSPITAL_OPER_ROOMS_SUCCESS = 'GET_HOSPITAL_OPER_ROOMS_SUCCESS';
const GET_HOSPITAL_OPER_ROOMS_FAIL = 'GET_HOSPITAL_OPER_ROOMS_FAIL';

const DELETE_HOSPITAL_OPER_ROOM = 'DELETE_HOSPITAL_OPER_ROOM';
const DELETE_HOSPITAL_OPER_ROOM_SUCCESS = 'DELETE_HOSPITAL_OPER_ROOM_SUCCESS';
const DELETE_HOSPITAL_OPER_ROOM_FAIL = 'DELETE_HOSPITAL_OPER_ROOM_FAIL';

const UPDATE_HOSPITAL_OPER_ROOM_BY_ID = 'UPDATE_HOSPITAL_OPER_ROOM_BY_ID';
const UPDATE_HOSPITAL_OPER_ROOM_BY_ID_SUCCESS = 'UPDATE_HOSPITAL_OPER_ROOM_BY_ID_SUCCESS';
const UPDATE_HOSPITAL_OPER_ROOM_BY_ID_FAIL = 'UPDATE_HOSPITAL_OPER_ROOM_BY_ID_FAIL';

const LOAD_HOSPITAL_OPER_ROOM_BY_ID = 'LOAD_HOSPITAL_OPER_ROOM_BY_ID';
const LOAD_HOSPITAL_OPER_ROOM_BY_ID_SUCCESS = 'LOAD_HOSPITAL_OPER_ROOM_BY_ID_SUCCESS';
const LOAD_HOSPITAL_OPER_ROOM_BY_ID_FAIL = 'LOAD_HOSPITAL_OPER_ROOM_BY_ID_FAIL';

const CLEAR_HOSPITAL_OPER_ROOM = 'CLEAR_HOSPITAL_OPER_ROOM';

const initialState = {
  createHospitalOpeRoomSuccess: false,
  updateHospitalOpeRoomSuccess: false,
  deleteHospitalOpeRoomSuccess: false,
  loading: false,
  successMsg: '',
  operationRoom: {},
  operationRooms: [],
  errorMsg: ''
};

export default function reducer(state = initialState, action = {}) {
  state.successMsg = '';
  state.errorMsg = '';
  switch (action.type) {
    case CLEAR_HOSPITAL_OPER_ROOM:
      return {
        ...state,
        operationRoom: {}
      };
    case CREATE_HOSPITAL_OPER_ROOM:
      return {
        ...state,
        loading: true,
        createHospitalOpeRoomSuccess: false
      };
    case CREATE_HOSPITAL_OPER_ROOM_SUCCESS:
      return {
        ...state,
        loading: false,
        createHospitalOpeRoomSuccess: true,
        successMsg: action.result.success_msg
      };
    case CREATE_HOSPITAL_OPER_ROOM_FAIL:
      return {
        ...state,
        loading: false,
        createHospitalOpeRoomSuccess: false,
        errMsg: action.error && action.error.error_msg
      };
    case UPDATE_HOSPITAL_OPER_ROOM_BY_ID:
      return {
        ...state,
        loading: true,
        updateHospitalOpeRoomSuccess: false
      };
    case UPDATE_HOSPITAL_OPER_ROOM_BY_ID_SUCCESS:
      return {
        ...state,
        loading: false,
        updateHospitalOpeRoomSuccess: true,
        successMsg: action.result.success_msg
      };
    case UPDATE_HOSPITAL_OPER_ROOM_BY_ID_FAIL:
      return {
        ...state,
        loading: false,
        updateHospitalOpeRoomSuccess: false,
        errMsg: action.error && action.error.error_msg
      };
    case LOAD_HOSPITAL_OPER_ROOM_BY_ID:
      return {
        ...state,
        loading: true,
      };
    case LOAD_HOSPITAL_OPER_ROOM_BY_ID_SUCCESS:
      return {
        ...state,
        loading: false,
        operationRoom: action.result
      };
    case LOAD_HOSPITAL_OPER_ROOM_BY_ID_FAIL:
      return {
        ...state,
        loading: false
      };
    case GET_HOSPITAL_OPER_ROOMS:
      return {
        ...state,
        loading: true,
        operationRooms: [],
      };
    case GET_HOSPITAL_OPER_ROOMS_SUCCESS:
      return {
        ...state,
        loading: false,
        operationRooms: action.result,
        successMsg: action.success_msg
      };
    case GET_HOSPITAL_OPER_ROOMS_FAIL:
      return {
        ...state,
        loading: false,
        errMsg: action.error && action.error.error_msg
      };
    case DELETE_HOSPITAL_OPER_ROOM:
      return {
        ...state,
        loading: true,
        deleteHospitalOpeRoomSuccess: false
      };
    case DELETE_HOSPITAL_OPER_ROOM_SUCCESS:
      return {
        ...state,
        loading: false,
        deleteHospitalOpeRoomSuccess: true,
        successMsg: action.result.success_msg
      };
    case DELETE_HOSPITAL_OPER_ROOM_FAIL:
      return {
        ...state,
        loading: false,
        deleteHospitalOpeRoomSuccess: false,
        errMsg: action.error && action.error.error_msg
      };
    default:
      return state;
  }
}


export function createHospitalOpeRoom(hospitalId, room) {
  return {
    types: [
      CREATE_HOSPITAL_OPER_ROOM, CREATE_HOSPITAL_OPER_ROOM_SUCCESS, CREATE_HOSPITAL_OPER_ROOM_FAIL
    ],
    promise: (client) => client.post(`/hospital/${hospitalId}/operatingRoom`, {
      data: room
    })
  };
}

export function getHospitalOpeRooms(hospitalId) {
  return {
    types: [
      GET_HOSPITAL_OPER_ROOMS, GET_HOSPITAL_OPER_ROOMS_SUCCESS, GET_HOSPITAL_OPER_ROOMS_FAIL
    ],
    promise: (client) => client.get(`/hospital/${hospitalId}/operatingRooms`)
  };
}

export function updateHospitalOpeRoomById(id, operationRoom) {
  return {
    types: [
      UPDATE_HOSPITAL_OPER_ROOM_BY_ID, UPDATE_HOSPITAL_OPER_ROOM_BY_ID_SUCCESS, UPDATE_HOSPITAL_OPER_ROOM_BY_ID_FAIL
    ],
    promise: (client) => client.put('/operationRoom/' + id, {
      data: operationRoom
    })
  };
}

export function loadHospitalOpeRoomById(hospitalId, roomId) {
  return {
    types: [
      LOAD_HOSPITAL_OPER_ROOM_BY_ID, LOAD_HOSPITAL_OPER_ROOM_BY_ID_SUCCESS, LOAD_HOSPITAL_OPER_ROOM_BY_ID_FAIL
    ],
    promise: (client) => client.get(`/hospital/${hospitalId}/operationRoom/${roomId}`)
  };
}

export function deleteHospitalOpeRoomById(id) {
  return {
    types: [
      DELETE_HOSPITAL_OPER_ROOM, DELETE_HOSPITAL_OPER_ROOM_SUCCESS, DELETE_HOSPITAL_OPER_ROOM_FAIL
    ],
    promise: (client) => client.del('/operationRoom/' + id)
  };
}

export function clearHospitalOpeRoom() {
  return {
    type: CLEAR_HOSPITAL_OPER_ROOM
  };
}
