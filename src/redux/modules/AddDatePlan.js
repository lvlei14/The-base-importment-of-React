const ADD_DATE_PLAN = 'ADD_DATE_PLAN';
const ADD_DATE_PLAN_SUCCESS = 'ADD_DATE_PLAN_SUCCESS';
const ADD_DATE_PLAN_FAIL = 'ADD_DATE_PLAN_FAIL';

const LOAD_METTING = 'LOAD_METTING';
const LOAD_METTING_SUCCESS = 'LOAD_METTING_SUCCESS';
const LOAD_METTING_FAIL = 'LOAD_METTING_FAIL';

const LOAD_OPERA = 'LOAD_OPERA';
const LOAD_OPERA_SUCCESS = 'LOAD_OPERA_SUCCESS';
const LOAD_OPERA_FAIL = 'LOAD_OPERA_FAIL';

const metting = {
  types: [
    '放假安排',
    '值班安排'
  ],
  address: [
    '会议室1',
    '会议室2',
    '会议室3'
  ]
};

const opera = {
  address: [
    '手术室1',
    '手术室2',
    '手术室3'
  ],
  diagnos: [
    '生产',
    '肿瘤'
  ],
  operaNames: [
    'OPCAB',
    '生产'
  ]
};

const initState = {
  error: null,
  tip: null,
  metting: metting || {},
  opera: opera || {},
};

export function addDatePlanReducer(state = initState, action = {}) {
  switch (action.type) {
    case ADD_DATE_PLAN:
      return {
        ...state,
        error: null,
        tip: null
      };
    case ADD_DATE_PLAN_SUCCESS:
      console.log(action);
      return {
        ...state,
        tip: action.tip,
        error: null
      };
    case ADD_DATE_PLAN_FAIL:
      return {
        ...state,
        error: action.result,
        tip: null
      };


    case LOAD_METTING:
      return {
        ...state,
        error: null,
        tip: null
      };
    case LOAD_METTING_SUCCESS:
      console.log(action);
      return {
        ...state,
        tip: action.tip,
        metting: action.result,
        error: null
      };
    case LOAD_METTING_FAIL:
      return {
        ...state,
        error: action.result,
        tip: null
      };


    case LOAD_OPERA:
      return {
        ...state,
        error: null,
        tip: null
      };
    case LOAD_OPERA_SUCCESS:
      console.log(action);
      return {
        ...state,
        tip: action.tip,
        opera: action.result,
        error: null
      };
    case LOAD_OPERA_FAIL:
      return {
        ...state,
        error: action.result,
        tip: null
      };

    default:
      return state;
  }
}


/**
 * action: add datePlan
 * @param options
 * @returns {{types: *[], promise: promise}}
 */
export function addDatePlan(options) {
  return {
    types: [ADD_DATE_PLAN, ADD_DATE_PLAN_SUCCESS, ADD_DATE_PLAN_FAIL],
    promise: (client) => client.post('', {
      data: options
    })
  };
}

/**
 * action: loading metting information
 *
 */
export function loadMettingInformation() {
  return {
    types: [LOAD_METTING, LOAD_METTING_SUCCESS, LOAD_METTING_FAIL],
    promise: (client) => client.post('')
  };
}

/**
 * action: loading opera information
 *
 */
export function loadOperaInformation() {
  return {
    types: [LOAD_OPERA, LOAD_OPERA_SUCCESS, LOAD_OPERA_FAIL],
    promise: (client) => client.post('')
  };
}
