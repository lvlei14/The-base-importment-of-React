const MODIFY_USERSURGERY_INFOR = 'MODIFY_USERSURGERY_INFOR';
const MODIFY_USERSURGERY_INFOR_SUCCESS = 'MODIFY_USERSURGERY_INFOR_SUCCESS';
const MODIFY_USERSURGERY_INFOR_FAIL = 'MODIFY_USERSURGERY_INFOR_FAIL';

const LOAD_USERSURGERY_INFOR = 'LOAD_USERSURGERY_INFOR';
const LOAD_USERSURGERY_INFOR_SUCCESS = 'LOAD_USERSURGERY_INFOR_SUCCESS';
const LOAD_USERSURGERY_INFOR_FAIL = 'LOAD_USERSURGERY_INFOR_FAIL';

const userSurgeryInfor = {
  patientId: '02',
  doctorId: '02',
  apartmentId: '10',
  date: '2018-09-09',
  seq: 2,
  name: '开刀手术',
  operatingRoomId: '02',
  mark: '出院做检查',
  surgeryStateId: '02',
};

const initState = {
  error: null,
  tip: null,
  userSurgeryInfor: userSurgeryInfor || {},
};

export function userSurgeryInforReducer(state = initState, action = {}) {
  switch (action.type) {
    case MODIFY_USERSURGERY_INFOR:
      return {
        ...state,
        error: null,
        tip: null
      };
    case MODIFY_USERSURGERY_INFOR_SUCCESS:
      return {
        ...state,
        tip: action.tip,
        error: null
      };
    case MODIFY_USERSURGERY_INFOR_FAIL:
      return {
        ...state,
        error: action.result,
        tip: null
      };


    case LOAD_USERSURGERY_INFOR:
      return {
        ...state,
        error: null,
        tip: null
      };
    case LOAD_USERSURGERY_INFOR_SUCCESS:
      console.log(action);
      return {
        ...state,
        tip: action.tip,
        userSurgeryInfor: action.result,
        error: null
      };
    case LOAD_USERSURGERY_INFOR_FAIL:
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
 * action: add USERSURGERY
 * @param options
 * @returns {{types: *[], promise: promise}}
 */
export function modifyUserSurgeryInfor(options) {
  return {
    types: [MODIFY_USERSURGERY_INFOR, MODIFY_USERSURGERY_INFOR_SUCCESS, MODIFY_USERSURGERY_INFOR_FAIL],
    promise: (client) => client.post('', {
      data: options
    })
  };
}

/**
 * action: modify USERSURGERY information
 *
 */
export function loadUserSurgeryInformation() {
  return {
    types: [LOAD_USERSURGERY_INFOR, LOAD_USERSURGERY_INFOR_SUCCESS, LOAD_USERSURGERY_INFOR_FAIL],
    promise: (client) => client.post('')
  };
}
