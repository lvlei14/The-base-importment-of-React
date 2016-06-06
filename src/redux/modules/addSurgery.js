const ADD_SURGERY = 'ADD_SURGERY';
const ADD_SURGERY_SUCCESS = 'ADD_SURGERY_SUCCESS';
const ADD_SURGERY_FAIL = 'ADD_SURGERY_FAIL';

const initState = {
  error: null,
  tip: null,
};

export function addSurgeryInforReducer(state = initState, action = {}) {
  switch (action.type) {
    case ADD_SURGERY:
      return {
        ...state,
        error: null,
        tip: null
      };
    case ADD_SURGERY_SUCCESS:
      return {
        ...state,
        tip: action.tip,
        error: null
      };
    case ADD_SURGERY_FAIL:
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
 * action: add patient
 * @param options
 * @returns {{types: *[], promise: promise}}
 */
export function addSurgeryInfor(options) {
  return {
    types: [ADD_SURGERY, ADD_SURGERY_SUCCESS, ADD_SURGERY_FAIL],
    promise: (client) => client.post('', {
      data: options
    })
  };
}
