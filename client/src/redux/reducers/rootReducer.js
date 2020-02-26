import { combineReducers } from "redux";
import { authReducer } from "./authReducer";
import { blogReducer } from "./blogReducer";
import { categoryReducer } from "./categoryReducer";

export const rootReducer = combineReducers({
  authReducer,
  blogReducer,
  categoryReducer
});
