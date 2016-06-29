const LOAD_CHANGE_DUTY_RECORDS = 'LOAD_CHANGE_DUTY_RECORDS';
const LOAD_CHANGE_DUTY_RECORDS_SUCCESS = 'LOAD_CHANGE_DUTY_RECORDS_SUCCESS';
const LOAD_CHANGE_DUTY_RECORDS_FAIL = 'LOAD_CHANGE_DUTY_RECORDS_FAIL';

const CHANGE_DUTY_RECORD_ACCEPT = 'CHANGE_DUTY_RECORD_ACCEPT';
const CHANGE_DUTY_RECORD_ACCEPT_SUCCESS = 'CHANGE_DUTY_RECORD_ACCEPT_SUCCESS';
const CHANGE_DUTY_RECORD_ACCEPT_FAIL = 'CHANGE_DUTY_RECORD_ACCEPT_FAIL';

const CHANGE_DUTY_RECORD_DENY = 'CHANGE_DUTY_RECORD_DENY';
const CHANGE_DUTY_RECORD_DENY_SUCCESS = 'CHANGE_DUTY_RECORD_DENY_SUCCESS';
const CHANGE_DUTY_RECORD_DENY_FAIL = 'CHANGE_DUTY_RECORD_DENY_FAIL';

// const changeDutyRecords = [
//   {
//     month: '4',
//     handleState: 'handling',
//     date: '2016-04-19',
//     time: '13:59',
//     week: '星期三',
//     requestDate: '2016-04-01',
//     requestWeek: '星期三',
//     hanler: '何仙姑',
//     handered: '楚放',
//   },
//   {
//     month: '4',
//     handleState: 'handling',
//     date: '2016-04-16',
//     time: '13:56',
//     week: '星期三',
//     requestDate: '2016-04-06',
//     requestWeek: '星期三',
//     hanler: '何仙姑',
//     handered: '楚放',
//   },
//   {
//     month: '4',
//     handleState: 'success',
//     date: '2016-04-10',
//     time: '13:56',
//     week: '星期二',
//     requestDate: '2016-04-06',
//     requestWeek: '星期三',
//     hanler: '何仙姑',
//     handered: '楚放',
//   },
//   {
//     month: '4',
//     handleState: 'fail',
//     date: '2016-04-13',
//     time: '13:50',
//     week: '星期一',
//     requestDate: '2016-04-06',
//     requestWeek: '星期三',
//     hanler: '何仙姑',
//     handered: '楚放',
//   },
//   {
//     month: '5',
//     handleState: 'fail',
//     date: '2016-05-06',
//     time: '13:56',
//     week: '星期三',
//     requestDate: '2016-05-01',
//     requestWeek: '星期三',
//     hanler: '何仙姑',
//     handered: '楚放',
//   }
// ];

const initState = {
  loading: false,
  tip: null,
  cDutyRecords: [],
  cDutyAcceptSuccess: false,
  cDutyDenySuccess: false,
  successMsg: null,
  errorMsg: null,
};


export function changeDutyRecordsReducer(state = initState, action = {}) {
  state.successMsg = null;
  state.errorMsg = null;
  switch (action.type) {

    case LOAD_CHANGE_DUTY_RECORDS:
      return {
        ...state,
        loading: true
      };

    case LOAD_CHANGE_DUTY_RECORDS_SUCCESS:
      console.log('action返回的信息');
      console.log(action.result);
      return {
        ...state,
        loading: false,
        cDutyRecords: action.result,
        tip: action.tip
      };

    case LOAD_CHANGE_DUTY_RECORDS_FAIL:
      return {
        ...state,
        loading: false,
        tip: action.tip
      };


    case CHANGE_DUTY_RECORD_ACCEPT:
      return {
        ...state,
        loading: true,
        cDutyAcceptSuccess: false,
      };

    case CHANGE_DUTY_RECORD_ACCEPT_SUCCESS:
      return {
        ...state,
        loading: false,
        cDutyAcceptSuccess: true,
        successMsg: action.result && action.result.success_msg,
        tip: action.tip
      };

    case CHANGE_DUTY_RECORD_ACCEPT_FAIL:
      return {
        ...state,
        loading: false,
        cDutyAcceptSuccess: false,
        errorMsg: action.error && action.error.error_msg,
        tip: action.tip
      };


    case CHANGE_DUTY_RECORD_DENY:
      return {
        ...state,
        cDutyDenySuccess: false,
        loading: true
      };

    case CHANGE_DUTY_RECORD_DENY_SUCCESS:
      return {
        ...state,
        loading: false,
        cDutyDenySuccess: true,
        successMsg: action.result && action.result.success_msg,
        tip: action.tip
      };

    case CHANGE_DUTY_RECORD_DENY_FAIL:
      return {
        ...state,
        loading: false,
        cDutyDenySuccess: false,
        errorMsg: action.error && action.error.error_msg,
        tip: action.tip
      };

    default:
      return state;
  }
}

/**
 * action: load change duty records by send or receive
 * @param text String
 * @returns {{types: *[], promise: promise}}
 */
export function loadCDutyRecords(uid, tag) {
  console.log('请求列表地址');
  console.log('/' + uid + '/exAttendance?tag=' + tag);
  return {
    types: [LOAD_CHANGE_DUTY_RECORDS, LOAD_CHANGE_DUTY_RECORDS_SUCCESS, LOAD_CHANGE_DUTY_RECORDS_FAIL],
    // promise: (client) => client.get('')
    promise: (client) => client.get('/user/' + uid + '/exAttendance?tag=' + tag)
  };
}

/**
 * action: accept change duty by uid and dutyId
 * @param text String
 * @returns {{types: *[], promise: promise}}
 */
export function acceptCDuty(uid, eid) {
  console.log('请求同意地址');
  console.log('/user/' + uid + '/exAttendance/' + eid + '/accept');
  return {
    types: [CHANGE_DUTY_RECORD_ACCEPT, CHANGE_DUTY_RECORD_ACCEPT_SUCCESS, CHANGE_DUTY_RECORD_ACCEPT_FAIL],
    promise: (client) => client.put('/user/' + uid + '/exAttendance/' + eid + '/accept')
  };
}

/**
 * action: RENY change duty by uid and dutyId
 * @param text String
 * @returns {{types: *[], promise: promise}}
 */
export function denyCDuty(uid, eid) {
  console.log('请求拒绝地址');
  console.log('/user/' + uid + '/exAttendance/' + eid + '/deny');
  return {
    types: [CHANGE_DUTY_RECORD_DENY, CHANGE_DUTY_RECORD_DENY_SUCCESS, CHANGE_DUTY_RECORD_DENY_FAIL],
    promise: (client) => client.put('/user/' + uid + '/exAttendance/' + eid + '/deny')
  };
}

