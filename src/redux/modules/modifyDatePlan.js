const LOAD_DATE_PLAN_DETAIL = 'LOAD_DATE_PLAN_DETAIL';
const LOAD_DATE_PLAN_DETAIL_SUCCESS = 'LOAD_DATE_PLAN_DETAIL_SUCCESS';
const LOAD_DATE_PLAN_DETAIL_FAIL = 'LOAD_DATE_PLAN_DETAIL_FAIL';

const datePlanDetail = {
};

const initState = {
  error: null,
  tip: null,
  datePlanDetail: datePlanDetail || {},
};

export function datePlanDetailReducer(state = initState, action = {}) {
  switch (action.type) {
    case LOAD_DATE_PLAN_DETAIL:
      return {
        ...state,
        error: null,
        tip: null
      };
    case LOAD_DATE_PLAN_DETAIL_SUCCESS:
      return {
        ...state,
        tip: action.tip,
        datePlanDetail: action.result,
        error: null
      };
    case LOAD_DATE_PLAN_DETAIL_FAIL:
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
 * action: load datapaln
 * @param options
 * @returns {{types: *[], promise: promise}}
 */
export function loadDatePlanDetail() {
  return {
    types: [LOAD_DATE_PLAN_DETAIL, LOAD_DATE_PLAN_DETAIL_SUCCESS, LOAD_DATE_PLAN_DETAIL_FAIL],
    promise: (client) => client.get('')
  };
}
