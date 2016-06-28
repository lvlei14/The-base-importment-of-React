const LOAD_TEMPLATE_ITEM = 'LOAD_TEMPLATE_ITEM';
const LOAD_TEMPLATE_ITEM_SUCCESS = 'LOAD_TEMPLATE_ITEM_SUCCESS';
const LOAD_TEMPLATE_ITEM_FAIL = 'LOAD_TEMPLATE_ITEM_FAIL';

const ADD_DATEPLAN = 'ADD_DATEPLAN';
const ADD_DATEPLAN_SUCCESS = 'ADD_DATEPLAN_SUCCESS';
const ADD_DATEPLAN_FAIL = 'ADD_DATEPLAN_FAIL';

const DETELE_DATEPLAN_BY_SCHEDULEID = 'DETELE_DATEPLAN_BY_SCHEDULEID';
const DETELE_DATEPLAN_BY_SCHEDULEID_SUCCESS = 'DETELE_DATEPLAN_BY_SCHEDULEID_SUCCESS';
const DETELE_DATEPLAN_BY_SCHEDULEID_FAIL = 'DETELE_DATEPLAN_BY_SCHEDULEID_FAIL';

const initState = {
  error: null,
  tip: null,
  template: [],
  addDatePlanSuccess: false,
  successMsg: null,
  errorMsg: null,
  deleteScheduleSuccess: false,
};

export function datePlanInfoReducer(state = initState, action = {}) {
  state.successMsg = null;
  state.errorMsg = null;
  switch (action.type) {
    case LOAD_TEMPLATE_ITEM:
      return {
        ...state,
        loading: true
      };

    case LOAD_TEMPLATE_ITEM_SUCCESS:
      console.log('--加载模板消息返回结果');
      console.log(action.result);
      return {
        ...state,
        loading: false,
        template: action.result.result,
        tip: action.tip
      };

    case LOAD_TEMPLATE_ITEM_FAIL:
      return {
        ...state,
        loading: false,
        tip: action.tip
      };


    case ADD_DATEPLAN:
      return {
        ...state,
        loading: true,
        addDatePlanSuccess: false
      };

    case ADD_DATEPLAN_SUCCESS:
      return {
        ...state,
        loading: false,
        addDatePlanSuccess: true,
        successMsg: action.result && action.result.success_msg,
        tip: action.tip,
      };

    case ADD_DATEPLAN_FAIL:
      return {
        ...state,
        loading: false,
        addDatePlanSuccess: false,
        errorMsg: action.error && action.error.error_msg,
        tip: action.tip
      };


    case DETELE_DATEPLAN_BY_SCHEDULEID:
      return {
        ...state,
        loading: true,
        deleteScheduleSuccess: false
      };

    case DETELE_DATEPLAN_BY_SCHEDULEID_SUCCESS:
      console.log('del success action');
      console.log(action);
      return {
        ...state,
        loading: false,
        deleteScheduleSuccess: true,
        successMsg: action.result && action.result.success_msg,
        tip: action.tip,
      };

    case DETELE_DATEPLAN_BY_SCHEDULEID_FAIL:
      console.log('del fail action');
      console.log(action);
      return {
        ...state,
        loading: false,
        deleteScheduleSuccess: false,
        errorMsg: action.error && action.error.error_msg,
        tip: action.tip
      };

    default:
      return state;
  }
}


/**
 * action: load template item by templateId
 * @param text String
 * @returns {{types: *[], promise: promise}}
 */
export function loadTemplateItem(id) {
  return {
    types: [LOAD_TEMPLATE_ITEM, LOAD_TEMPLATE_ITEM_SUCCESS, LOAD_TEMPLATE_ITEM_FAIL],
    promise: (client) => client.get('/template/' + id)
  };
}

/**
 * action: add datePlan
 * @param text String
 * @returns {{types: *[], promise: promise}}
 */
export function addDatePlan(tempObject) {
  return {
    types: [ADD_DATEPLAN, ADD_DATEPLAN_SUCCESS, ADD_DATEPLAN_FAIL],
    promise: (client) => client.post('/schedule/', {
      data: tempObject
    })
  };
}

/**
 * action: delete dateplan schedule by schedule id
 * @param text String
 * @returns {{types: *[], promise: promise}}
 */
export function deleteScheduleById(id) {
  console.log('访问删除接口');
  return {
    types: [DETELE_DATEPLAN_BY_SCHEDULEID, DETELE_DATEPLAN_BY_SCHEDULEID_SUCCESS, DETELE_DATEPLAN_BY_SCHEDULEID_FAIL],
    promise: (client) => client.del('schedule/' + id)
  };
}
