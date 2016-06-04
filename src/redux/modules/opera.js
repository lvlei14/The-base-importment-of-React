const LOAD_OPERA = 'LOAD_OPERA';
const LOAD_OPERA_SUCCESS = 'LOAD_OPERA_SUCCESS';
const LOAD_OPERA_FAIL = 'LOAD_OPERA_FAIL';

const operas = [
  {
  }
];

const initState = {
  loading: false,
  tip: null,
  operas: operas || [],
};


export function operaReducer(state = initState, action = {}) {
  switch (action.type) {

    case LOAD_OPERA:
      return {
        ...state,
        loading: true
      };

    case LOAD_OPERA_SUCCESS:
      return {
        ...state,
        loading: false,
        operas: action.result,
        tip: action.tip
      };

    case LOAD_OPERA_FAIL:
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
 * action: load OPERAs
 * @param text String
 * @returns {{types: *[], promise: promise}}
 */
export function loadOperas() {
  return {
    types: [LOAD_OPERA, LOAD_OPERA_SUCCESS, LOAD_OPERA_FAIL],
    promise: (client) => client.get('')
  };
}
