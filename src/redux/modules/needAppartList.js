const LOAD_NEED_APPART_LISTS = 'LOAD_NEED_APPART_LISTS';
const LOAD_NEED_APPART_LISTS_SUCCESS = 'LOAD_NEED_APPART_LISTS_SUCCESS';
const LOAD_NEED_APPART_LISTS_FAIL = 'LOAD_NEED_APPART_LISTS_FAIL';

const CHANGE_NEED_APPART_STATUS = 'CHANGE_NEED_APPART_STATUS';
const CHANGE_NEED_APPART_STATUS_SUCCESS = 'CHANGE_NEED_APPART_STATUS_SUCCESS';
const CHANGE_NEED_APPART_STATUS_FAIL = 'CHANGE_NEED_APPART_STATUS_FAIL';

const initState = {
  error: null,
  tip: null,
  loading: false,
  needAppartLists: {},
  changeNeedAppartStatusSuccess: false,
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


    case CHANGE_NEED_APPART_STATUS:
      return {
        ...state,
        loading: true,
        changeNeedAppartStatusSuccess: false,
      };

    case CHANGE_NEED_APPART_STATUS_SUCCESS:
      console.log('CHANGE need action');
      console.log(action.result);
      return {
        ...state,
        loading: false,
        changeNeedAppartStatusSuccess: true,
        successMsg: action.result && action.result.success_msg,
        tip: action.tip
      };

    case CHANGE_NEED_APPART_STATUS_FAIL:
      return {
        ...state,
        loading: false,
        changeNeedAppartStatusSuccess: false,
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
 * action: CHANGE appart need by needId
 * @param text String
 * @returns {{types: *[], promise: promise}}
 */
export function changeNeedAppartStatus(needId, operationCon, CHANGENeedText) {
  const newData = {
    operation: operationCon,
    reason: CHANGENeedText
  };
  console.log('-----');
  console.log(newData);
  return {
    types: [CHANGE_NEED_APPART_STATUS, CHANGE_NEED_APPART_STATUS_SUCCESS, CHANGE_NEED_APPART_STATUS_FAIL],
    promise: (client) => client.put('/invitation/' + needId, {
      data: newData
    })
  };
}
