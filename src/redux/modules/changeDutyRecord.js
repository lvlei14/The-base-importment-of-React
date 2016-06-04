const LOAD_CHANGE_DUTY_RECORD = 'LOAD_CHANGE_DUTY_RECORD';
const LOAD_CHANGE_DUTY_RECORD_SUCCESS = 'LOAD_CHANGE_DUTY_RECORD_SUCCESS';
const LOAD_CHANGE_DUTY_RECORD_FAIL = 'LOAD_CHANGE_DUTY_RECORD_FAIL';

const changeDutyRecords = [
  {
    month: '4',
    handleState: 'handling',
    date: '2016-04-19',
    time: '13:59',
    week: '星期三',
    requestDate: '2016-04-01',
    requestWeek: '星期三',
    hanler: '何仙姑',
    handered: '楚放',
  },
  {
    month: '4',
    handleState: 'handling',
    date: '2016-04-16',
    time: '13:56',
    week: '星期三',
    requestDate: '2016-04-06',
    requestWeek: '星期三',
    hanler: '何仙姑',
    handered: '楚放',
  },
  {
    month: '4',
    handleState: 'success',
    date: '2016-04-10',
    time: '13:56',
    week: '星期二',
    requestDate: '2016-04-06',
    requestWeek: '星期三',
    hanler: '何仙姑',
    handered: '楚放',
  },
  {
    month: '4',
    handleState: 'fail',
    date: '2016-04-13',
    time: '13:50',
    week: '星期一',
    requestDate: '2016-04-06',
    requestWeek: '星期三',
    hanler: '何仙姑',
    handered: '楚放',
  },
  {
    month: '5',
    handleState: 'fail',
    date: '2016-05-06',
    time: '13:56',
    week: '星期三',
    requestDate: '2016-05-01',
    requestWeek: '星期三',
    hanler: '何仙姑',
    handered: '楚放',
  }
];

const initState = {
  loading: false,
  tip: null,
  changeDutyRecords: changeDutyRecords || [],
};


export function changeDutyRecordsReducer(state = initState, action = {}) {
  switch (action.type) {

    case LOAD_CHANGE_DUTY_RECORD:
      return {
        ...state,
        loading: true
      };

    case LOAD_CHANGE_DUTY_RECORD_SUCCESS:
      return {
        ...state,
        loading: false,
        changeDutyRecords: action.result,
        tip: action.tip
      };

    case LOAD_CHANGE_DUTY_RECORD_FAIL:
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
 * action: load change duty records
 * @param text String
 * @returns {{types: *[], promise: promise}}
 */
export function loadChangeDutyRecords() {
  return {
    types: [LOAD_CHANGE_DUTY_RECORD, LOAD_CHANGE_DUTY_RECORD_SUCCESS, LOAD_CHANGE_DUTY_RECORD_FAIL],
    promise: (client) => client.get('')
  };
}

