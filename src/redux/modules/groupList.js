const LOAD_GROUP_APPART_LIST = 'LOAD_GROUP_APPART_LIST';
const LOAD_GROUP_APPART_LIST_SUCCESS = 'LOAD_GROUP_APPART_LIST_SUCCESS';
const LOAD_GROUP_APPART_LIST_FAIL = 'LOAD_GROUP_APPART_LIST_FAIL';

const LOAD_GROUP_MSG_LIST = 'LOAD_GROUP_MSG_LIST';
const LOAD_GROUP_MSG_LIST_SUCCESS = 'LOAD_GROUP_MSG_LIST_SUCCESS';
const LOAD_GROUP_MSG_LIST_FAIL = 'LOAD_GROUP_MSG_LIST_FAIL';

// const groupTemplates = [
//   {
//     _id: '5763bdb0ea287d6b4fe58904',
//     groupId: '12',
//     name: '查房'
//   },
//   {
//     _id: '21',
//     groupId: '22',
//     name: '其他'
//   }
// ];

const initState = {
  loading: false,
  tip: null,
  groupAppartLists: [],
  groupMsgLists: [],
};


export function groupListReducer(state = initState, action = {}) {
  switch (action.type) {

    case LOAD_GROUP_APPART_LIST:
      return {
        ...state,
        loading: true
      };

    case LOAD_GROUP_APPART_LIST_SUCCESS:
      return {
        ...state,
        loading: false,
        groupAppartLists: action.result,
        tip: action.tip
      };

    case LOAD_GROUP_APPART_LIST_FAIL:
      return {
        ...state,
        loading: false,
        tip: action.tip
      };


    case LOAD_GROUP_MSG_LIST:
      return {
        ...state,
        loading: true
      };

    case LOAD_GROUP_MSG_LIST_SUCCESS:
      return {
        ...state,
        loading: false,
        groupMsgLists: action.result,
        tip: action.tip
      };

    case LOAD_GROUP_MSG_LIST_FAIL:
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
 * action: load GROUP_APPART_LISTs
 * @param text String
 * @returns {{types: *[], promise: promise}}
 */
export function loadGroupAppartList() {
  return {
    types: [LOAD_GROUP_APPART_LIST, LOAD_GROUP_APPART_LIST_SUCCESS, LOAD_GROUP_APPART_LIST_FAIL],
    promise: (client) => client.get('/user/groups')
  };
}


/**
 * action: load group msg list by group appartId
 * @param text String
 * @returns {{types: *[], promise: promise}}
 */
export function loadGroupMsgList(groupAppartId) {
  return {
    types: [LOAD_GROUP_MSG_LIST, LOAD_GROUP_MSG_LIST_SUCCESS, LOAD_GROUP_MSG_LIST_FAIL],
    promise: (client) => client.get('/groupAnnouncement/group/' + groupAppartId)
  };
}
