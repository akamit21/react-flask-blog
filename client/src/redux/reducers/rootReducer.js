import { combineReducers } from "redux";
import { authReducer } from "./authReducer";
import { blogReducer } from "./blogReducer";
import { categoryReducer } from "./categoryReducer";
import { commentReducer } from "./commentReducer";

export const rootReducer = combineReducers({
  authReducer,
  blogReducer,
  commentReducer,
  categoryReducer
});
