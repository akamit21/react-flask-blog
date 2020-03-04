import {
  FETCH_COMMENT_REQUEST,
  FETCH_COMMENT_SUCCESS,
  FETCH_COMMENT_FAILURE,
  ADD_COMMENT_REQUEST,
  ADD_COMMENT_SUCCESS,
  ADD_COMMENT_FAILURE
} from "../actionType";
import Axios from "axios";

const config = {
  baseURL: "http://localhost:5000",
  headers: {
    "Content-Type": "application/json"
  }
};

export const getCommentByBlog = id => {
  return async dispatch => {
    dispatch({
      type: FETCH_COMMENT_REQUEST
    });
    try {
      const res = await Axios.get("/blog/comment/" + id, config);
      if (res.data.error) {
        throw res.data.message;
      }
      dispatch({
        type: FETCH_COMMENT_SUCCESS,
        payload: res.data
      });
    } catch (err) {
      let error = err.message ? err.message : err;
      dispatch({
        type: FETCH_COMMENT_FAILURE,
        payload: error
      });
    }
  };
};

export const addComment = data => {
  return async dispatch => {
    dispatch({
      type: ADD_COMMENT_REQUEST
    });
    try {
      const res = await Axios.post("/blog/comment/add", { ...data }, config);
      if (res.data.error) {
        throw res.data.message;
      }
      dispatch({
        type: ADD_COMMENT_SUCCESS,
        payload: res.data
      });
    } catch (err) {
      let error = err.message ? err.message : err;
      dispatch({
        type: ADD_COMMENT_FAILURE,
        paylaod: error
      });
    }
  };
};
