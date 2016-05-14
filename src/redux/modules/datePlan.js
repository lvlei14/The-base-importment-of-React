const LOAD_SCHEDULE = 'LOAD_SCHEDULE';
const LOAD_SCHEDULE_SUCCESS = 'LOAD_SCHEDULE_SUCCESS';
const LOAD_SCHEDULE_FAIL = 'LOAD_SCHEDULE_FAIL';

const LOAD_TYPE = 'LOAD_TYPE';
const LOAD_TYPE_SUCCESS = 'LOAD_TYPE_SUCCESS';
const LOAD_TYPE_FAIL = 'LOAD_TYPE_FAIL';


const schedules = [
  {
    id: '1',
    day: '14',
    date: '2016-05-14',
    sidePlan: true,
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
    sidePlan: true,
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
    outsidePlan: false,
    type: 'check',
    time: '14:00-16:00',
    start: '3:00',
    isconflict: false
  }
];

const scheduleTypes = {
  in: [
    {
      ywname: 'check',
      zwname: '查房'
    },
    {
      ywname: 'metting',
      zwname: '会议'
    },
    {
      ywname: 'opera',
      zwname: '手术'
    }
  ],
  out: [
    {
      ywname: 'holidy',
      zwname: '休假'
    },
    {
      ywname: 'leadmenzhen',
      zwname: '门诊指导'
    },
    {
      ywname: 'leadjizhen',
      zwname: '急诊指导'
    }
  ]
};

const initState = {
  loading: false,
  tip: null,
  schedules: schedules || [],
  scheduleTypes: scheduleTypes || {}
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


    case LOAD_TYPE:
      return {
        ...state,
        loading: true
      };

    case LOAD_TYPE_SUCCESS:
      return {
        ...state,
        loading: false,
        scheduleTypes: action.result,
        tip: action.tip
      };

    case LOAD_TYPE_FAIL:
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


/**
 * action: load types
 * @param text String
 * @returns {{types: *[], promise: promise}}
 */
export function loadtypes() {
  return {
    types: [LOAD_TYPE, LOAD_TYPE_SUCCESS, LOAD_TYPE_FAIL],
    promise: (client) => client.get('')
  };
}
