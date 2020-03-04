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
import Axios from "axios";

const config = {
  baseURL: "http://localhost:5000",
  headers: {
    "Content-Type": "application/json"
  }
};

export const fetchAllBlog = () => {
  return async dispatch => {
    dispatch({
      type: BLOG_LIST_REQUEST
    });
    try {
      const res = await Axios.get("/blog", config);
      console.log(res);
      if (res.data.error) {
        throw res.data.message;
      }
      setTimeout(() => {
        dispatch({
          type: BLOG_LIST_SUCCESS,
          payload: res.data
        });
      }, 500);
    } catch (err) {
      let error = err.message ? err.message : err;
      dispatch({
        type: BLOG_LIST_FAILURE,
        payload: error
      });
    }
  };
};

export const getBlogById = id => {
  return async dispatch => {
    dispatch({
      type: BLOG_REQUEST
    });
    try {
      const res = await Axios.get("/blog/" + id, config);
      if (res.data.error) {
        throw res.data.message;
      }
      setTimeout(() => {
        dispatch({
          type: BLOG_SUCCESS,
          payload: res.data
        });
      }, 500);
    } catch (err) {
      let error = err.message ? err.message : err;
      dispatch({
        type: BLOG_FAILURE,
        payload: error
      });
    }
  };
};

export const addBlog = data => {
  return async dispatch => {
    dispatch({
      type: ADD_BLOG_REQUEST
    });
    try {
      const res = await Axios.post("/blog/create", { ...data }, config);
      if (res.data.error) {
        throw res.data.message;
      }
      setTimeout(() => {
        dispatch({
          type: ADD_BLOG_SUCCESS,
          payload: res.data
        });
      }, 1000);
    } catch (err) {
      let error = err.message ? err.message : err;
      dispatch({
        type: ADD_BLOG_FAILURE,
        paylaod: error
      });
    }
  };
};
