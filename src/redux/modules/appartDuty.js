const LOAD_APPART_DUTY = 'LOAD_APPART_DUTY';
const LOAD_APPART_DUTY_SUCCESS = 'LOAD_APPART_DUTY_SUCCESS';
const LOAD_APPART_DUTY_FAIL = 'LOAD_APPART_DUTY_FAIL';

const appartDutys = [
  {
    id: '1',
    day: '14',
    month: '3',
    doctor: '李兰',
    isSelf: false,
    level: '4',
  },
  {
    id: '2',
    day: '15',
    month: '3',
    doctor: '李柳',
    isSelf: false,
    level: '3',
  },
  {
    id: '3',
    day: '16',
    month: '4',
    doctor: '刘平',
    isSelf: false,
    level: '1',
  }
];

const initState = {
  loading: false,
  tip: null,
  appartDutys: appartDutys || [],
};


export function appartDutyReducer(state = initState, action = {}) {
  switch (action.type) {

    case LOAD_APPART_DUTY:
      return {
        ...state,
        loading: true
      };

    case LOAD_APPART_DUTY_SUCCESS:
      return {
        ...state,
        loading: false,
        appartDutys: action.result,
        tip: action.tip
      };

    case LOAD_APPART_DUTY_FAIL:
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
 * action: load APPART_DUTYs
 * @param text String
 * @returns {{types: *[], promise: promise}}
 */
export function loadAppartDutys() {
  return {
    types: [LOAD_APPART_DUTY, LOAD_APPART_DUTY_SUCCESS, LOAD_APPART_DUTY_FAIL],
    promise: (client) => client.get('')
  };
}
