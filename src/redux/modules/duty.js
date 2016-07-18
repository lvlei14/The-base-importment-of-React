const LOAD_DUTY = 'LOAD_DUTY';
const LOAD_DUTY_SUCCESS = 'LOAD_DUTY_SUCCESS';
const LOAD_DUTY_FAIL = 'LOAD_DUTY_FAIL';

const SECOND_CHANGE_DUTY_APPLY = 'SECOND_CHANGE_DUTY_APPLY';
const SECOND_CHANGE_DUTY_APPLY_SUCCESS = 'SECOND_CHANGE_DUTY_APPLY_SUCCESS';
const SECOND_CHANGE_DUTY_APPLY_FAIL = 'SECOND_CHANGE_DUTY_APPLY_FAIL';

const SELECT_MY_WANT_CHANGE_DUTY = 'SELECT_MY_WANT_CHANGE_DUTY';

const initState = {
  loading: false,
  tip: null,
  dutys: {},
  sendIsSuccessMeg: '',
  errorMeg: '',
  mySeletedDuty: {
    date: '',
    id: ''
  },
};


export function dutyReducer(state = initState, action = {}) {
  switch (action.type) {

    case LOAD_DUTY:
      return {
        ...state,
        loading: true
      };

    case LOAD_DUTY_SUCCESS:
      console.log('值班返回的结果');
      console.log(action);
      return {
        ...state,
        loading: false,
        dutys: action.result,
        tip: action.tip
      };

    case LOAD_DUTY_FAIL:
      return {
        ...state,
        loading: false,
        tip: action.tip
      };


    case SECOND_CHANGE_DUTY_APPLY:
      return {
        ...state,
        loading: true
      };

    case SECOND_CHANGE_DUTY_APPLY_SUCCESS:
      console.log('换班申请action');
      console.log(action);
      return {
        ...state,
        loading: false,
        sendIsSuccessMeg: action.result.success_msg,
        tip: action.tip
      };

    case SECOND_CHANGE_DUTY_APPLY_FAIL:
      return {
        ...state,
        loading: false,
        errorMeg: action.result,
        tip: action.tip
      };

    case SELECT_MY_WANT_CHANGE_DUTY:
      console.log(action.id);
      console.log(action.date);
      return {
        ...state,
        mySeletedDuty: {...state.mySeletedDuty, date: action.date, id: action.id},
      };

    default:
      return state;
  }
}


/**
 * action: load every month dutys by month and  year
 * @param uid, month, year, level(load common level doctor duty),
          scope(if load selfDuty scope="self"; if load appartmentDuty scope="appartment")
 * @returns {{types: *[], promise: promise}}
 */
export function loaddutys(uid, month, year, level, scope) {
  console.log('发请求地址');
  console.log('/user/' + uid + '/attendance?year=' + year + '&month=' + month + '&level=' + level + '&scope=' + scope);
  return {
    types: [LOAD_DUTY, LOAD_DUTY_SUCCESS, LOAD_DUTY_FAIL],
    promise: (client) => client.get('/user/' + uid + '/attendance?year=' + year + '&month=' + month + '&level=' + level + '&scope=' + scope)
  };
}

/**
 * action: send change duty APPLY send uid/eid/attendance
 * @param
 * @returns {{types: *[], promise: promise}}
 */
export function sendChangeDutyApply(uid, mySelChaDutyId, selChaDutyId, selChaDoctorId) {
  console.log(uid + ',' + mySelChaDutyId + ',' + selChaDutyId + ',' + selChaDoctorId);
  return {
    types: [SECOND_CHANGE_DUTY_APPLY, SECOND_CHANGE_DUTY_APPLY_SUCCESS, SECOND_CHANGE_DUTY_APPLY_FAIL],
    promise: (client) => client.post('/user/' + uid + '/exAttendance', {
      data: {
        fromAttendance: mySelChaDutyId,
        toAttendance: selChaDutyId,
        toDoctor: selChaDoctorId,
      }
    })
  };
}

/**
  * action: select i want change duty date/dutyid
  */
export function selectMyWantChangeDuty(date, id) {
  return {
    type: SELECT_MY_WANT_CHANGE_DUTY,
    date: date,
    id: id,
  };
}
