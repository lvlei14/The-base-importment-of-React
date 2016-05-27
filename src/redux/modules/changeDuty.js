const LOAD_CHANGE_DUTY = 'LOAD_CHANGE_DUTY';
const LOAD_CHANGE_DUTY_SUCCESS = 'LOAD_CHANGE_DUTY_SUCCESS';
const LOAD_CHANGE_DUTY_FAIL = 'LOAD_CHANGE_DUTY_FAIL';

const changeDutys = [
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
    level: '4',
  },
  {
    id: '3',
    day: '16',
    month: '4',
    doctor: '刘平',
    isSelf: false,
    level: '4',
  }
];

const initState = {
  loading: false,
  tip: null,
  changeDutys: changeDutys || [],
};


export function changeDutyReducer(state = initState, action = {}) {
  switch (action.type) {

    case LOAD_CHANGE_DUTY:
      return {
        ...state,
        loading: true
      };

    case LOAD_CHANGE_DUTY_SUCCESS:
      return {
        ...state,
        loading: false,
        changeDutys: action.result,
        tip: action.tip
      };

    case LOAD_CHANGE_DUTY_FAIL:
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
 * action: load CHANGE_DUTYs
 * @param text String
 * @returns {{types: *[], promise: promise}}
 */
export function loadChangeDutys() {
  return {
    types: [LOAD_CHANGE_DUTY, LOAD_CHANGE_DUTY_SUCCESS, LOAD_CHANGE_DUTY_FAIL],
    promise: (client) => client.get('')
  };
}
