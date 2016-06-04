const LOAD_DUTY = 'LOAD_DUTY';
const LOAD_DUTY_SUCCESS = 'LOAD_DUTY_SUCCESS';
const LOAD_DUTY_FAIL = 'LOAD_DUTY_FAIL';

const dutys = [
  {
    id: '1',
    day: '14',
    month: '3',
    appartment: '妇产科',
    isSelf: false,
  },
  {
    id: '2',
    day: '15',
    month: '3',
    appartment: '妇产科',
    isSelf: false,
  },
  {
    id: '3',
    day: '16',
    month: '4',
    appartment: '妇产科',
    isSelf: false,
  }
];

const initState = {
  loading: false,
  tip: null,
  dutys: dutys || [],
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
