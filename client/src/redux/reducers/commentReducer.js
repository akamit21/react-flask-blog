import {
  FETCH_COMMENT_REQUEST,
  FETCH_COMMENT_SUCCESS,
  FETCH_COMMENT_FAILURE,
  ADD_COMMENT_REQUEST,
  ADD_COMMENT_SUCCESS,
  ADD_COMMENT_FAILURE
} from "../actionType";

let initialState = {
  isLoading: false,
  error: false,
  response: null,
  userComments: [],
  blogComments: []
};

export const commentReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_COMMENT_REQUEST: {
      return {
        ...state,
        isLoading: true
      };
    }
    // fetch blog comments
    case FETCH_COMMENT_SUCCESS: {
      return {
        ...state,
        isLoading: false,
        error: false,
        response: action.payload.message,
        blogComments: [...action.payload.result]
      };
    }
    case FETCH_COMMENT_FAILURE: {
      return {
        ...state,
        isLoading: false,
        error: true,
        response: action.payload.message
      };
    }
    // add comment to blogs
    case ADD_COMMENT_REQUEST: {
      return {
        ...state,
        isLoading: true
      };
    }
    case ADD_COMMENT_SUCCESS: {
      return {
        ...state,
        isLoading: false,
        error: false,
        response: action.payload.message
      };
    }
    case ADD_COMMENT_FAILURE: {
      return {
        ...state,
        isLoading: false,
        error: true,
        response: action.payload.message
      };
    }
    default:
      return state;
  }
};
