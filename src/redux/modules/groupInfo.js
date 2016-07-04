const LOAD_GROUPINFO_BY_ID = 'LOAD_GROUPINFO_BY_ID';
const LOAD_GROUPINFO_BY_ID_SUCCESS = 'LOAD_GROUPINFO_BY_ID_SUCCESS';
const LOAD_GROUPINFO_BY_ID_FAIL = 'LOAD_GROUPINFO_BY_ID_FAIL';

const ADD_GROUP_NOTICE = 'ADD_GROUP_NOTICE';
const ADD_GROUP_NOTICE_SUCCESS = 'ADD_GROUP_NOTICE_SUCCESS';
const ADD_GROUP_NOTICE_FAIL = 'ADD_GROUP_NOTICE_FAIL';

const MODIFY_GROUP_NOTICE_BY_ID = 'MODIFY_GROUP_NOTICE_BY_ID';
const MODIFY_GROUP_NOTICE_BY_ID_SUCCESS = 'MODIFY_GROUP_NOTICE_BY_ID_SUCCESS';
const MODIFY_GROUP_NOTICE_BY_ID_FAIL = 'MODIFY_GROUP_NOTICE_BY_ID_FAIL';

const DETELE_GROUP_NOTICE_BY_ID = 'DETELE_GROUP_NOTICE_BY_ID';
const DETELE_GROUP_NOTICE_BY_ID_SUCCESS = 'DETELE_GROUP_NOTICE_BY_ID_SUCCESS';
const DETELE_GROUP_NOTICE_BY_ID_FAIL = 'DETELE_GROUP_NOTICE_BY_ID_FAIL';

const initState = {
  error: null,
  tip: null,
  groupInfoItem: [],
  addGroupNoticeSuccess: false,
  groupSuccessMsg: null,
  groupErrorMsg: null,
  deleteGroupNoticeSuccess: false,
  modifyGroupNoticeSuccess: false,
};

export function groupInfoReducer(state = initState, action = {}) {
  state.groupSuccessMsg = null;
  state.groupErrorMsg = null;
  switch (action.type) {
    case LOAD_GROUPINFO_BY_ID:
      return {
        ...state,
        loading: true
      };

    case LOAD_GROUPINFO_BY_ID_SUCCESS:
      return {
        ...state,
        loading: false,
        groupInfoItem: action.result,
        tip: action.tip
      };

    case LOAD_GROUPINFO_BY_ID_FAIL:
      return {
        ...state,
        loading: false,
        tip: action.tip
      };


    case ADD_GROUP_NOTICE:
      return {
        ...state,
        loading: true,
        addGroupNoticeSuccess: false
      };

    case ADD_GROUP_NOTICE_SUCCESS:
      return {
        ...state,
        loading: false,
        addGroupNoticeSuccess: true,
        groupSuccessMsg: action.result && action.result.success_msg,
        tip: action.tip,
      };

    case ADD_GROUP_NOTICE_FAIL:
      return {
        ...state,
        loading: false,
        addGroupNoticeSuccess: false,
        groupErrorMsg: action.error && action.error.error_msg,
        tip: action.tip
      };


    case MODIFY_GROUP_NOTICE_BY_ID:
      return {
        ...state,
        loading: true,
        modifyGroupNoticeSuccess: false
      };

    case MODIFY_GROUP_NOTICE_BY_ID_SUCCESS:
      return {
        ...state,
        loading: false,
        modifyGroupNoticeSuccess: true,
        groupSuccessMsg: action.result && action.result.success_msg,
        tip: action.tip,
      };

    case MODIFY_GROUP_NOTICE_BY_ID_FAIL:
      return {
        ...state,
        loading: false,
        modifyGroupNoticeSuccess: false,
        groupErrorMsg: action.error && action.error.error_msg,
        tip: action.tip
      };


    case DETELE_GROUP_NOTICE_BY_ID:
      return {
        ...state,
        loading: true,
        deleteGroupNoticeSuccess: false
      };

    case DETELE_GROUP_NOTICE_BY_ID_SUCCESS:
      return {
        ...state,
        loading: false,
        deleteGroupNoticeSuccess: true,
        groupSuccessMsg: action.result && action.result.success_msg,
        tip: action.tip,
      };

    case DETELE_GROUP_NOTICE_BY_ID_FAIL:
      return {
        ...state,
        loading: false,
        deleteGroupNoticeSuccess: false,
        groupErrorMsg: action.error && action.error.error_msg,
        tip: action.tip
      };

    default:
      return state;
  }
}


/**
 * action: load GROUPINFO BY_ID by GROUPINFOId
 * @param text String
 * @returns {{types: *[], promise: promise}}
 */
export function loadGroupInfoById(id) {
  return {
    types: [LOAD_GROUPINFO_BY_ID, LOAD_GROUPINFO_BY_ID_SUCCESS, LOAD_GROUPINFO_BY_ID_FAIL],
    promise: (client) => client.get('/groupAnnouncement/' + id)
  };
}

/**
 * action: add GROUP_NOTICE
 * @param text String
 * @returns {{types: *[], promise: promise}}
 */
export function addGroupNotice(tempObject) {
  return {
    types: [ADD_GROUP_NOTICE, ADD_GROUP_NOTICE_SUCCESS, ADD_GROUP_NOTICE_FAIL],
    promise: (client) => client.post('/groupAnnouncement/', {
      data: tempObject
    })
  };
}


/**
 * action: modify GROUP_NOTICE by schedule id
 * @param text String
 * @returns {{types: *[], promise: promise}}
 */
export function modifyGroupInfoById(id, scheduleObject) {
  return {
    types: [MODIFY_GROUP_NOTICE_BY_ID, MODIFY_GROUP_NOTICE_BY_ID_SUCCESS, MODIFY_GROUP_NOTICE_BY_ID_FAIL],
    promise: (client) => client.put('/groupAnnouncement/' + id, {
      data: scheduleObject
    })
  };
}

/**
 * action: delete GROUP_NOTICE schedule by schedule id
 * @param text String
 * @returns {{types: *[], promise: promise}}
 */
export function deleteGroupInfoById(id) {
  return {
    types: [DETELE_GROUP_NOTICE_BY_ID, DETELE_GROUP_NOTICE_BY_ID_SUCCESS, DETELE_GROUP_NOTICE_BY_ID_FAIL],
    promise: (client) => client.del('groupAnnouncement/' + id)
  };
}
