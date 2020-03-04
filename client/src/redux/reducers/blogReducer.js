import {
  BLOG_LIST_REQUEST,
  BLOG_LIST_SUCCESS,
  BLOG_LIST_FAILURE,
  BLOG_REQUEST,
  BLOG_SUCCESS,
  BLOG_FAILURE,
  ADD_BLOG_REQUEST,
  ADD_BLOG_SUCCESS,
  ADD_BLOG_FAILURE
} from "../actionType";

let initialState = {
  formLoading: false,
  pageLoading: true,
  error: false,
  response: null,
  blogsList: [],
  userBlogs: [],
  blog: null
};

export const blogReducer = (state = initialState, action) => {
  switch (action.type) {
    // fetch all blogs
    case BLOG_LIST_REQUEST: {
      return {
        ...state,
        pageLoading: true
      };
    }
    case BLOG_LIST_SUCCESS: {
      return {
        ...state,
        error: false,
        response: action.payload.message,
        blogsList: [...action.payload.result]
      };
    }
    case BLOG_LIST_FAILURE: {
      return {
        ...state,
        pageLoading: false,
        error: true,
        response: action.payload.message
      };
    }
    // fetch blog by id
    case BLOG_REQUEST: {
      return {
        ...state,
        pageLoading: true
      };
    }
    case BLOG_SUCCESS: {
      return {
        ...state,
        pageLoading: false,
        error: false,
        response: action.payload.message,
        blog: action.payload.result
      };
    }
    case BLOG_FAILURE: {
      return {
        ...state,
        pageLoading: false,
        error: true,
        response: action.payload.message
      };
    }
    // add new blog
    case ADD_BLOG_REQUEST: {
      return {
        ...state,
        formLoading: true
      };
    }
    case ADD_BLOG_SUCCESS: {
      return {
        ...state,
        formLoading: false,
        error: false,
        response: action.payload.message
      };
    }
    case ADD_BLOG_FAILURE: {
      return {
        ...state,
        formLoading: false,
        error: true,
        response: action.payload.message
      };
    }
    default:
      return state;
  }
};
