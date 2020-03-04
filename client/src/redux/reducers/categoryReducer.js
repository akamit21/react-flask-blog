import {
  CATEGORY_LIST_REQUEST,
  CATEGORY_LIST_SUCCESS,
  CATEGORY_LIST_FAILURE
} from "../actionType";

let initialState = {
  isLoading: true,
  error: false,
  response: null,
  categories: []
};

export const categoryReducer = (state = initialState, action) => {
  switch (action.type) {
    case CATEGORY_LIST_REQUEST: {
      return {
        ...state,
        isLoading: true
      };
    }
    case CATEGORY_LIST_SUCCESS: {
      return {
        ...state,
        isLoading: false,
        error: false,
        categories: [...action.payload]
      };
    }
    case CATEGORY_LIST_FAILURE: {
      return {
        ...state,
        isLoading: false,
        error: true
      };
    }
    default:
      return state;
  }
};
