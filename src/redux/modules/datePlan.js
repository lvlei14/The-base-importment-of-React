const LOAD_SCHEDULE = 'LOAD_SCHEDULE';
const LOAD_SCHEDULE_SUCCESS = 'LOAD_SCHEDULE_SUCCESS';
const LOAD_SCHEDULE_FAIL = 'LOAD_SCHEDULE_FAIL';

const schedules = [
  {
    id: '1',
    day: '14',
    date: '2016-05-14',
    sidePlan: false,
    outsidePlan: true,
    type: 'check',
    time: '0:00-16:00',
    start: '1:00',
    isconflict: false
  },
  {
    id: '1',
    day: '14',
    date: '2016-05-14',
    sidePlan: false,
    outsidePlan: true,
    type: 'metting',
    time: '0:00-16:00',
    start: '1:00',
    isconflict: false
  },
  {
    id: '2',
    day: '15',
    date: '2016-05-15',
    sidePlan: false,
    outsidePlan: true,
    type: 'opera',
    time: '14:00-16:00',
    start: '2:00',
    isconflict: false
  },
  {
    id: '2',
    day: '15',
    date: '2016-05-15',
    sidePlan: false,
    outsidePlan: true,
    type: 'duty',
    time: '14:00-16:00',
    start: '2:00',
    isconflict: false
  },
  {
    id: '3',
    day: '16',
    date: '2016-05-16',
    sidePlan: false,
    outsidePlan: true,
    type: 'check',
    time: '14:00-16:00',
    start: '3:00',
    isconflict: false
  }
];

const initState = {
  loading: false,
  tip: null,
  schedules: schedules || []
};

export function datePlanSchedulesReducer(state = initState, action = {}) {
  switch (action.type) {
    case LOAD_SCHEDULE:
      return {
        ...state,
        loading: true
      };
    case LOAD_SCHEDULE_SUCCESS:
      return {
        ...state,
        loading: false,
        schedules: action.result,
        tip: action.tip
      };
    case LOAD_SCHEDULE_FAIL:
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
 * action: load schedules
 * @param text String
 * @returns {{types: *[], promise: promise}}
 */
export function loadschedules() {
  return {
    types: [LOAD_SCHEDULE, LOAD_SCHEDULE_SUCCESS, LOAD_SCHEDULE_FAIL],
    promise: (client) => client.get('')
  };
}
