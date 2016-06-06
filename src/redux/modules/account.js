const LOAD = 'LOAD';

const initState = {
  error: null,
  tip: null,
  data: {},
};

export function accountReducer(state = initState, action = {}) {
  switch (action.type) {
    case LOAD:
      return {
        ...state,
        data: action.data
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
export function loadAccount(data) {
  return {
    type: LOAD,
    data: data,
  };
}
