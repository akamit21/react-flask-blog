import {
  SIGNUP_REQUEST,
  SIGNUP_SUCCESS,
  SIGNUP_FAILURE,
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAILURE
} from "../actionType";

let initialState = {
  isLoading: false,
  error: false,
  response: null
};

export const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case SIGNUP_REQUEST: {
      return {
        ...state,
        isLoading: true
      };
    }
    case SIGNUP_SUCCESS: {
      return {
        ...state,
        isLoading: false,
        error: false,
        response: action.payload
      };
    }
    case SIGNUP_FAILURE: {
      return {
        ...state,
        isLoading: false,
        error: true,
        response: action.payload
      };
    }
    case LOGIN_REQUEST: {
      return {
        ...state,
        isLoading: true
      };
    }
    case LOGIN_SUCCESS: {
      return {
        ...state,
        isLoading: false,
        error: false,
        response: action.payload
      };
    }
    case LOGIN_FAILURE: {
      return {
        ...state,
        isLoading: false,
        error: true,
        response: action.payload
      };
    }
    default:
      return state;
  }
};
