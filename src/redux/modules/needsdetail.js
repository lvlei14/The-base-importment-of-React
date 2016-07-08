const LOAD_EXPERT_DETAIL = 'LOAD_EXPERT_ITEM';
const LOAD_EXPERT_DETAIL_SUCCESS = 'LOAD_EXPERT_ITEM_SUCCESS';
const LOAD_EXPERT_DETAIL_FAIL = 'LOAD_EXPERT_ITEM_FAIL';

const ACCEPT_AN_INVITATION = 'ACCEPT_AN_INVITATION';
const ACCEPT_AN_INVITATION_SUCCESS = 'ACCEPT_AN_INVITATION_SUCCESS';
const ACCEPT_AN_INVITATION_FAIL = 'ACCEPT_AN_INVITATION_FAIL';

const REFUSE_AN_INVITATION = 'REFUSE_AN_INVITATION';
const REFUSE_AN_INVITATION_SUCCESS = 'REFUSE_AN_INVITATION_SUCCESS';
const REFUSE_AN_INVITATION_FAIL = 'REFUSE_AN_INVITATION_FAIL';

const initState = {
  refuseSuccess: false,
  acceptSuccess: false,
  error: null,
  tip: null,
  details: {},
  successMsg: null,
  errorMsg: null,
};

export default function needExpertListReducer(state = initState, action = {}) {
  state.successMsg = null;
  state.errorMsg = null;
  switch (action.type) {
    case LOAD_EXPERT_DETAIL:
      return {
        ...state,
        loading: true
      };

    case LOAD_EXPERT_DETAIL_SUCCESS:
      console.log(action);
      return {
        ...state,
        loading: false,
        details: action.result,
        tip: action.tip
      };

    case LOAD_EXPERT_DETAIL_FAIL:
      return {
        ...state,
        acceptSuccess: false,
        loading: false,
        tip: action.tip
      };

    case ACCEPT_AN_INVITATION:
      return {
        ...state,

        loading: true
      };

    case ACCEPT_AN_INVITATION_SUCCESS:
      console.log(action);
      console.log('接受');
      return {
        ...state,
        acceptSuccess: true,
        loading: false,
        tip: action.tip
      };

    case ACCEPT_AN_INVITATION_FAIL:
      return {
        ...state,
        loading: false,
        tip: action.tip
      };

    case REFUSE_AN_INVITATION:
      return {
        ...state,
        loading: true
      };

    case REFUSE_AN_INVITATION_SUCCESS:
      console.log(action + '取消成功');
      return {
        ...state,
        refuseSuccess: true,
        loading: false,
        tip: action.tip
      };

    case REFUSE_AN_INVITATION_FAIL:
      return {
        ...state,
        refuseSuccess: false,

        loading: false,
        tip: action.tip
      };


    default:
      return state;
  }
}


/**
 * @param text String
 * @returns {{types: *[], promise: promise}}
 */
export function loadExpertInvitationDetail(id) {
  return {
    types: [LOAD_EXPERT_DETAIL, LOAD_EXPERT_DETAIL_SUCCESS, LOAD_EXPERT_DETAIL_FAIL],
    promise: (client) => client.get('/invitation/' + id)
  };
}

export function acceptAnInvitation(id, operation, reason, status) {
  console.log(status + '这是status');
  return {
    types: [ACCEPT_AN_INVITATION, ACCEPT_AN_INVITATION_SUCCESS, ACCEPT_AN_INVITATION_FAIL],
    promise: (client) => client.put('/invitation/' + id, {
      data: {
        operation: operation,
        reason: reason,
        status: status,
      }
    })
  };
}

export function refusetAnInvitation(id, operation, reason, status) {
  console.log(status + '清热去玩儿');
  return {
    types: [REFUSE_AN_INVITATION, REFUSE_AN_INVITATION_SUCCESS, REFUSE_AN_INVITATION_FAIL],
    promise: (client) => client.put('/invitation/' + id, {
      data: {
        operation: operation,
        reason: reason,
        status: status,

      }
    })
  };
}
