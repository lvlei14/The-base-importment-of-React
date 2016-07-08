const SEARCH_DOCTOR = 'SEARCH_DOCTOR';
const SEARCH_DOCTOR_SUCCESS = 'SEARCH_DOCTOR_SUCCESS';
const SEARCH_DOCTOR_FAIL = 'SEARCH_DOCTOR_FAIL';

const CLEAR_SEARCH_DOCTOR_RESULT = 'CLEAR_SEARCH_DOCTOR_RESULT';


const initState = {
  loading: false,
  tip: null,
  searchBtnClicked: false,
  searchResults: []
};

export function searchReducer(state = initState, action = {}) {
  switch (action.type) {
    case SEARCH_DOCTOR:
      return {
        ...state,
        searchBtnClicked: true,
        loading: true
      };
    case SEARCH_DOCTOR_SUCCESS:
      console.log('search result action');
      console.log(action.result);
      return {
        ...state,
        loading: false,
        searchResults: action.result,
        tip: action.tip
      };
    case SEARCH_DOCTOR_FAIL:
      return {
        ...state,
        loading: false,
        tip: action.tip
      };


    case CLEAR_SEARCH_DOCTOR_RESULT:
      return {
        ...state,
        searchResults: [],
        searchBtnClicked: false,
      };

    default:
      return state;
  }
}


/**
 * action: search doctor by input text
 * @param text String
 * @returns {{types: *[], promise: promise}}
 */
export function search(text) {
  const url = '/user/doctor/' + text + '/search';
  return {
    types: [SEARCH_DOCTOR, SEARCH_DOCTOR_SUCCESS, SEARCH_DOCTOR_FAIL],
    promise: (client) => client.get(url)
  };
}

export function clearSearchResult() {
  return {
    type: CLEAR_SEARCH_DOCTOR_RESULT
  };
}
