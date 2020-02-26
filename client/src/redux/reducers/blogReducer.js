import {
  BLOG_LIST_REQUEST,
  BLOG_LIST_SUCCESS,
  BLOG_LIST_FAILURE,
  ADD_BLOG_REQUEST,
  ADD_BLOG_SUCCESS,
  ADD_BLOG_FAILURE
} from "../actionType";

let initialState = {
  isLoading: false,
  error: false,
  response: null,
  data: []
};

export const blogReducer = (state = initialState, action) => {
  switch (action.type) {
    case BLOG_LIST_REQUEST: {
      return {
        ...state,
        isLoading: true
      };
    }
    case BLOG_LIST_SUCCESS: {
      return {
        ...state,
        isLoading: false,
        error: false,
        data: [...action.payload]
      };
    }
    case BLOG_LIST_FAILURE: {
      return {
        ...state,
        isLoading: false,
        error: true
      };
    }
    case ADD_BLOG_REQUEST: {
      return {
        ...state,
        isLoading: true
      };
    }
    case ADD_BLOG_SUCCESS: {
      return {
        ...state,
        isLoading: false
      };
    }
    case ADD_BLOG_FAILURE: {
      return {
        ...state,
        isLoading: false
      };
    }
    default:
      return state;
  }
};
