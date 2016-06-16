const LOAD_DUTY = 'LOAD_DUTY';
const LOAD_DUTY_SUCCESS = 'LOAD_DUTY_SUCCESS';
const LOAD_DUTY_FAIL = 'LOAD_DUTY_FAIL';


const SECOND_CHANGE_DUTY_REQUEST = 'SECOND_CHANGE_DUTY_REQUEST';
const SECOND_CHANGE_DUTY_REQUEST_SUCCESS = 'SECOND_CHANGE_DUTY_REQUEST_SUCCESS';
const SECOND_CHANGE_DUTY_REQUEST_FAIL = 'SECOND_CHANGE_DUTY_REQUEST_FAIL';
// const dutys = {
//   3: [
//     {
//       _id: '30984',
//       appartment: {
//         id: '394',
//         name: '儿科',
//       },
//       doctor: {
//         _id: '33',
//         name: '吕银蕾',
//       },
//       mark: '6.3'
//     },
//     {
//       _id: '30985',
//       appartment: {
//         id: '395',
//         name: '儿科',
//       },
//       doctor: {
//         _id: '34',
//         name: '吕银蕾',
//       },
//       mark: '6.3'
//     }]
// };

const initState = {
  loading: false,
  tip: null,
  dutys: {},
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


    case SECOND_CHANGE_DUTY_REQUEST:
      return {
        ...state,
        loading: true
      };

    case SECOND_CHANGE_DUTY_REQUEST_SUCCESS:
      return {
        ...state,
        loading: false,
        tip: action.tip
      };

    case SECOND_CHANGE_DUTY_REQUEST_FAIL:
      return {
        ...state,
        loading: false,
        tip: action.tip
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
 * action: send change duty request
 * @param
 * @returns {{types: *[], promise: promise}}
 */
export function sendChangeDutyRequest(uid) {
  return {
    types: [SECOND_CHANGE_DUTY_REQUEST, SECOND_CHANGE_DUTY_REQUEST_SUCCESS, SECOND_CHANGE_DUTY_REQUEST_FAIL],
    promise: (client) => client.get('/:' + uid + '/exAttendance')
  };
}

