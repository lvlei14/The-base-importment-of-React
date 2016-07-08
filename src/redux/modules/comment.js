const ADD_COMMENT = 'ADD_COMMENT';
const ADD_COMMENT_SUCCESS = 'ADD_COMMENT_SUCCESS';
const ADD_COMMENT_FAIL = 'ADD_COMMENT_FAIL';

const LOAD_COMMENT_BY_ID = 'LOAD_COMMENT_BY_ID';
const LOAD_COMMENT_BY_ID_SUCCESS = 'LOAD_COMMENT_BY_ID_SUCCESS';
const LOAD_COMMENT_BY_ID_FAIL = 'LOAD_COMMENT_BY_ID_FAIL';

const MODIFY_COMMENT_BY_ID = 'MODIFY_COMMENT_BY_ID';
const MODIFY_COMMENT_BY_ID_SUCCESS = 'MODIFY_COMMENT_BY_ID_SUCCESS';
const MODIFY_COMMENT_BY_ID_FAIL = 'MODIFY_COMMENT_BY_ID_FAIL';

const DELETE_COMMENT_BY_ID = 'DELETE_COMMENT_BY_ID';
const DELETE_COMMENT_BY_ID_SUCCESS = 'DELETE_COMMENT_BY_ID_SUCCESS';
const DELETE_COMMENT_BY_ID_FAIL = 'DELETE_COMMENT_BY_ID_FAIL';

const LOAD_COMMENTS = 'LOAD_COMMENTS';
const LOAD_COMMENTS_SUCCESS = 'LOAD_COMMENTS_SUCCESS';
const LOAD_COMMENTS_FAIL = 'LOAD_COMMENTS_FAIL';

const CLEAR_COMMENT = 'CLEAR_COMMENT';

const initState = {
  addCommentSuccess: false,
  modifyCommentSuccess: false,
  deleteCommentSuccess: false,
  newCreateCommentId: '',
  loading: false,
  comment: {},
  successMsg: '',
  comments: [],
  errorMsg: ''
};

export default function addCommentInforReducer(state = initState, action = {}) {
  state.successMsg = '';
  state.errorMsg = '';
  switch (action.type) {
    case CLEAR_COMMENT:
      return {
        ...state,
        comment: {}
      };
    case ADD_COMMENT:
      return {
        ...state,
        loading: true,
        newCreateCommentId: '',
        addCommentSuccess: false
      };
    case ADD_COMMENT_SUCCESS:
      return {
        ...state,
        loading: false,
        newCreateCommentId: action.result.id,
        addCommentSuccess: true,
        successMsg: action.result.success_msg
      };
    case ADD_COMMENT_FAIL:
      return {
        ...state,
        loading: false,
        addCommentSuccess: false,
        errorMsg: action.error.error_msg
      };

    case LOAD_COMMENT_BY_ID:
      return {
        ...state,
        loading: true
      };
    case LOAD_COMMENT_BY_ID_SUCCESS:
      return {
        ...state,
        loading: false,
        comment: action.result
      };
    case LOAD_COMMENT_BY_ID_FAIL:
      return {
        ...state,
        loading: false,
        errorMsg: action.error.error_msg
      };

    case MODIFY_COMMENT_BY_ID:
      return {
        ...state,
        loading: true,
        modifyCommentSuccess: false
      };
    case MODIFY_COMMENT_BY_ID_SUCCESS:
      return {
        ...state,
        loading: false,
        modifyCommentSuccess: true,
        successMsg: action.result && action.result.success_msg
      };
    case MODIFY_COMMENT_BY_ID_FAIL:
      return {
        ...state,
        loading: false,
        modifyCommentSuccess: false,
        errorMsg: action.error.error_msg
      };

    case DELETE_COMMENT_BY_ID:
      return {
        ...state,
        loading: true,
        deleteCommentSuccess: false
      };
    case DELETE_COMMENT_BY_ID_SUCCESS:
      console.log(action);
      return {
        ...state,
        loading: false,
        deleteCommentSuccess: true,
        successMsg: action.result && action.result.success_msg
      };
    case DELETE_COMMENT_BY_ID_FAIL:
      return {
        ...state,
        loading: false,
        deleteCommentSuccess: false,
        errorMsg: action.error.error_msg
      };

    case LOAD_COMMENTS:
      return {
        ...state,
        loading: true
      };
    case LOAD_COMMENTS_SUCCESS:
      return {
        ...state,
        loading: false,
        comments: action.result
      };
    case LOAD_COMMENTS_FAIL:
      return {
        ...state,
        loading: false,
        errorMsg: action.error.error_msg
      };
    default:
      return state;
  }
}


/**
 * action: add comment
 * @param options
 * @returns {{types: *[], promise: promise}}
 */
export function createComment(options) {
  return {
    types: [ADD_COMMENT, ADD_COMMENT_SUCCESS, ADD_COMMENT_FAIL],
    promise: (client) => client.post('/comment', {
      data: options
    })
  };
}

export function getCommentById(id) {
  return {
    types: [LOAD_COMMENT_BY_ID, LOAD_COMMENT_BY_ID_SUCCESS, LOAD_COMMENT_BY_ID_FAIL],
    promise: (client) => client.get('/comment/' + id)
  };
}

export function modifyCommentById(id, comment) {
  return {
    types: [MODIFY_COMMENT_BY_ID, MODIFY_COMMENT_BY_ID_SUCCESS, MODIFY_COMMENT_BY_ID_FAIL],
    promise: (client) => client.put('/comment/' + id, {
      data: comment
    })
  };
}

export function getComments() {
  return {
    types: [LOAD_COMMENTS, LOAD_COMMENTS_SUCCESS, LOAD_COMMENTS_FAIL],
    promise: (client) => client.get('/comment')
  };
}

export function deleteCommentById(id) {
  return {
    types: [DELETE_COMMENT_BY_ID, DELETE_COMMENT_BY_ID_SUCCESS, DELETE_COMMENT_BY_ID_FAIL],
    promise: (client) => client.del('/comment/' + id)
  };
}

export function clearInitComment() {
  return {
    type: CLEAR_COMMENT
  };
}
