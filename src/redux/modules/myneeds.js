const LOAD_EXPERT_ITEM = 'LOAD_EXPERT_ITEM';
const LOAD_EXPERT_ITEM_SUCCESS = 'LOAD_EXPERT_ITEM_SUCCESS';
const LOAD_EXPERT_ITEM_FAIL = 'LOAD_EXPERT_ITEM_FAIL';

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
    case LOAD_EXPERT_ITEM:
      return {
        ...state,
        loading: true
      };

    case LOAD_EXPERT_ITEM_SUCCESS:
      console.log(action);
      return {
        ...state,
        loading: false,
        todo: action.result.todo,
        completed: action.result.done,
        tip: action.tip
      };

    case LOAD_EXPERT_ITEM_FAIL:
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
export function loadExpertItem() {
  return {
    types: [LOAD_EXPERT_ITEM, LOAD_EXPERT_ITEM_SUCCESS, LOAD_EXPERT_ITEM_FAIL],
    promise: (client) => client.get('/invitation/doctor')
  };
}
