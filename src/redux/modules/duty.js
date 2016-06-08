const LOAD_DUTY = 'LOAD_DUTY';
const LOAD_DUTY_SUCCESS = 'LOAD_DUTY_SUCCESS';
const LOAD_DUTY_FAIL = 'LOAD_DUTY_FAIL';

const dutys = {
  3: [
    {
      name: '关于值班的会议',
      type: {
        name: '会议',
        id: '113'
      },
      locale: 'in',  // 院内院外
      date: '2016-7-3',
      startTime: '08:00',
      endTime: '12:00',
      conflict: false  // 是否有冲突
    },
    {
      name: '查房2',
      type: {
        name: '查房',
        id: '111'
      },
      locale: 'in',  // 院内院外
      date: '2016-7-3',
      startTime: '09:00',
      endTime: '11:00',
      conflict: true  // 是否有冲突
    }]
};

const initState = {
  loading: false,
  tip: null,
  dutys: dutys || {},
};


export function dutyReducer(state = initState, action = {}) {
  switch (action.type) {

    case LOAD_DUTY:
      return {
        ...state,
        loading: true
      };

    case LOAD_DUTY_SUCCESS:
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

    default:
      return state;
  }
}

/**
 * action: load DUTYs
 * @param text String
 * @returns {{types: *[], promise: promise}}
 */
export function loaddutys() {
  return {
    types: [LOAD_DUTY, LOAD_DUTY_SUCCESS, LOAD_DUTY_FAIL],
    promise: (client) => client.get('')
  };
}
