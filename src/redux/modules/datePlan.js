const LOAD_SCHEDULE = 'LOAD_SCHEDULE';
const LOAD_SCHEDULE_SUCCESS = 'LOAD_SCHEDULE_SUCCESS';
const LOAD_SCHEDULE_FAIL = 'LOAD_SCHEDULE_FAIL';

const LOAD_TYPE = 'LOAD_TYPE';
const LOAD_TYPE_SUCCESS = 'LOAD_TYPE_SUCCESS';
const LOAD_TYPE_FAIL = 'LOAD_TYPE_FAIL';

const LOAD_TEMPLATE = 'LOAD_TEMPLATE';
const LOAD_TEMPLATE_SUCCESS = 'LOAD_TEMPLATE_SUCCESS';
const LOAD_TEMPLATE_FAIL = 'LOAD_TEMPLATE_FAIL';

// const scheduleTypes = {
//   in: [
//     {
//       name: '查房',
//       id: '111'
//     },
//     {
//       name: '值班',
//       id: '112'
//     },
//     {
//       name: '会议',
//       id: '113'
//     },
//     {
//       name: '手术',
//       id: '114'
//     }
//   ],
//   out: [
//     {
//       name: '院外1',
//       id: '211'
//     },
//     {
//       name: '院外2',
//       id: '212'
//     }
//   ]
// };

const initState = {
  loading: false,
  tip: null,
  schedules: {},
  scheduleTypes: [],
  templates: {},
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
        schedules: action.result.result,
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
        scheduleTypes: action.result.result,
        tip: action.tip
      };

    case LOAD_TYPE_FAIL:
      return {
        ...state,
        loading: false,
        tip: action.tip
      };

    case LOAD_TEMPLATE:
      return {
        ...state,
        loading: true
      };

    case LOAD_TEMPLATE_SUCCESS:
      return {
        ...state,
        loading: false,
        templates: action.result,
        tip: action.tip
      };

    case LOAD_TEMPLATE_FAIL:
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
export function loadschedules(requires) {
  return {
    types: [LOAD_SCHEDULE, LOAD_SCHEDULE_SUCCESS, LOAD_SCHEDULE_FAIL],
    promise: (client) => client.get('/schedule/' + requires)
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
    promise: (client) => client.get('/scheduleTypes')
  };
}


/**
 * action: load template
 * @param text String
 * @returns {{types: *[], promise: promise}}
 */
export function loadTemplates() {
  return {
    types: [LOAD_TEMPLATE, LOAD_TEMPLATE_SUCCESS, LOAD_TEMPLATE_FAIL],
    promise: (client) => client.get('/template/')
  };
}
