const LOAD_CHANGE_DUTY = 'LOAD_CHANGE_DUTY';
const LOAD_CHANGE_DUTY_SUCCESS = 'LOAD_CHANGE_DUTY_SUCCESS';
const LOAD_CHANGE_DUTY_FAIL = 'LOAD_CHANGE_DUTY_FAIL';

const SECOND_CHANGE_DUTY_REQUEST = 'SECOND_CHANGE_DUTY_REQUEST';
const SECOND_CHANGE_DUTY_REQUEST_SUCCESS = 'SECOND_CHANGE_DUTY_REQUEST_SUCCESS';
const SECOND_CHANGE_DUTY_REQUEST_FAIL = 'SECOND_CHANGE_DUTY_REQUEST_FAIL';


const changeDutys = [
  {
    id: '2',
    day: '15',
    month: '3',
    doctor: '李柳',
    isSelf: false,
    level: '4',
  },
  {
    id: '5',
    day: '16',
    month: '3',
    doctor: '李湘子',
    isSelf: false,
    level: '4',
  },
  {
    id: '6',
    day: '17',
    month: '3',
    doctor: '何仙姑',
    isSelf: false,
    level: '4',
  },
  {
    id: '7',
    day: '18',
    month: '3',
    doctor: '刘备',
    isSelf: false,
    level: '4',
  },
  {
    id: '8',
    day: '19',
    month: '3',
    doctor: '白灰灰',
    isSelf: false,
    level: '4',
  },
  {
    id: '9',
    day: '20',
    month: '3',
    doctor: '刘备',
    isSelf: false,
    level: '4',
  },
  {
    id: '10',
    day: '21',
    month: '3',
    doctor: '白灰灰',
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


    case SECOND_CHANGE_DUTY_REQUEST:
      return {
        ...state,
        loading: true
      };

    case SECOND_CHANGE_DUTY_REQUEST_SUCCESS:
      return {
        ...state,
        loading: false,
        changeDutys: action.result,
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

/**
 * action: send change duty request
 * @param
 * @returns {{types: *[], promise: promise}}
 */
export function sendChangeDutyRequest() {
  return {
    types: [SECOND_CHANGE_DUTY_REQUEST, SECOND_CHANGE_DUTY_REQUEST_SUCCESS, SECOND_CHANGE_DUTY_REQUEST_FAIL],
    promise: (client) => client.get('')
  };
}
