const LOAD_EXPERT_DETAIL = 'LOAD_EXPERT_ITEM';
const LOAD_EXPERT_DETAIL_SUCCESS = 'LOAD_EXPERT_ITEM_SUCCESS';
const LOAD_EXPERT_DETAIL_FAIL = 'LOAD_EXPERT_ITEM_FAIL';

const initState = {
  error: null,
  tip: null,
  todo: [],
  completed: [],
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
      console.log('yes');
      return {
        ...state,
        loading: false,
        tip: action.tip
      };

    case LOAD_EXPERT_DETAIL_FAIL:
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
 * @param text String
 * @returns {{types: *[], promise: promise}}
 */
export function loadExpertDetail(id) {
  console.log(id);
  console.log('是的');
  return {
    types: [LOAD_EXPERT_DETAIL, LOAD_EXPERT_DETAIL_SUCCESS, LOAD_EXPERT_DETAIL_FAIL],
    promise: (client) => client.get('/invitation/' + id)
  };
}