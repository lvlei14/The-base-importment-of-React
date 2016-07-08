const LOAD_NEED_APPART_LISTS = 'LOAD_NEED_APPART_LISTS';
const LOAD_NEED_APPART_LISTS_SUCCESS = 'LOAD_NEED_APPART_LISTS_SUCCESS';
const LOAD_NEED_APPART_LISTS_FAIL = 'LOAD_NEED_APPART_LISTS_FAIL';

const CANCEL_NEED_APPART_BY_NEEDID = 'CANCEL_NEED_APPART_BY_NEEDID';
const CANCEL_NEED_APPART_BY_NEEDID_SUCCESS = 'CANCEL_NEED_APPART_BY_NEEDID_SUCCESS';
const CANCEL_NEED_APPART_BY_NEEDID_FAIL = 'CANCEL_NEED_APPART_BY_NEEDID_FAIL';

const initState = {
  error: null,
  tip: null,
  loading: false,
  needAppartLists: {},
  cancelNeedAppartSuccess: false,
  successMsg: null,
  errorMsg: null,
};

export function needAppartListReducer(state = initState, action = {}) {
  state.successMsg = null;
  state.errorMsg = null;
  switch (action.type) {
    case LOAD_NEED_APPART_LISTS:
      return {
        ...state,
        loading: true
      };

    case LOAD_NEED_APPART_LISTS_SUCCESS:
      console.log('need appart list action');
      console.log(action.result);
      return {
        ...state,
        loading: false,
        needAppartLists: action.result,
        tip: action.tip
      };

    case LOAD_NEED_APPART_LISTS_FAIL:
      return {
        ...state,
        loading: false,
        tip: action.tip
      };


    case CANCEL_NEED_APPART_BY_NEEDID:
      return {
        ...state,
        loading: true,
        cancelNeedAppartSuccess: false,
      };

    case CANCEL_NEED_APPART_BY_NEEDID_SUCCESS:
      console.log('cancel need action');
      console.log(action.result);
      return {
        ...state,
        loading: false,
        cancelNeedAppartSuccess: true,
        successMsg: action.result && action.result.success_msg,
        tip: action.tip
      };

    case CANCEL_NEED_APPART_BY_NEEDID_FAIL:
      return {
        ...state,
        loading: false,
        cancelNeedAppartSuccess: false,
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
export function loadNeedAppartLists() {
  return {
    types: [LOAD_NEED_APPART_LISTS, LOAD_NEED_APPART_LISTS_SUCCESS, LOAD_NEED_APPART_LISTS_FAIL],
    promise: (client) => client.get('/invitation/apartment')
  };
}


/**
 * action: cancel appart need by needId
 * @param text String
 * @returns {{types: *[], promise: promise}}
 */
export function cancelAppartNeed(needId, operationCon, cancelNeedText) {
  const newData = {
    operation: operationCon,
    reason: cancelNeedText
  };
  console.log('-----');
  console.log(newData);
  return {
    types: [CANCEL_NEED_APPART_BY_NEEDID, CANCEL_NEED_APPART_BY_NEEDID_SUCCESS, CANCEL_NEED_APPART_BY_NEEDID_FAIL],
    promise: (client) => client.put('/invitation/' + needId, {
      data: newData
    })
  };
}
