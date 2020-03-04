import {
  SIGNUP_REQUEST,
  SIGNUP_SUCCESS,
  SIGNUP_FAILURE,
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
  AUTH_REQUEST,
  AUTH_SUCCESS,
  AUTH_FAILURE
} from "../actionType";

let ls = JSON.parse(localStorage.getItem("loggedIn"));
let initialState = {
  isLoggedIn: ls ? (ls.isLoggedIn ? true : false) : false,
  uid: ls ? (ls.uid ? ls.uid : null) : null,
  userEmail: ls ? (ls.email ? ls.email : null) : null,
  token: ls ? (ls.token ? ls.token : null) : null,
  isLoading: false,
  error: false,
  response: null
};

export const authReducer = (state = initialState, action) => {
  switch (action.type) {
    // user signup
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
    // user login
    case LOGIN_REQUEST: {
      return {
        ...state,
        isLoading: true
      };
    }
    case LOGIN_SUCCESS: {
      return {
        ...state,
        isLoggedIn: true,
        isLoading: false,
        error: false,
        response: action.payload.message,
        token: action.payload.token
      };
    }
    case LOGIN_FAILURE: {
      return {
        ...state,
        isLoading: false,
        error: true,
        response: action.payload.message
      };
    }
    // user auth
    case AUTH_REQUEST: {
      return {
        ...state,
        isLoading: true
      };
    }
    case AUTH_SUCCESS: {
      return {
        ...state,
        isLoggedIn: true,
        isLoading: false,
        error: false,
        response: action.payload.message,
        userEmail: action.payload.email,
        uid: action.payload.uid
      };
    }
    case AUTH_FAILURE: {
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
