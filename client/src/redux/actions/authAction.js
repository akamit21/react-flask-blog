import {
  SIGNUP_REQUEST,
  SIGNUP_FAILURE,
  SIGNUP_SUCCESS,
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAILURE
} from "../actionType";
import Axios from "axios";

const config = {
  baseURL: "http://localhost:5000",
  headers: {
    "Content-Type": "application/json"
  }
};

export const signUp = data => {
  return async dispatch => {
    dispatch({
      type: SIGNUP_REQUEST
    });
    try {
      const res = await Axios.post("/auth/signup", { ...data }, config);
      console.log(res);
      if (res.data.error) {
        throw res.data.message;
      }
      setTimeout(() => {
        dispatch({
          type: SIGNUP_SUCCESS,
          payload: res.data
        });
      }, 2500);
    } catch (err) {
      let error = "";
      err.message ? (error = err.message) : (error = err);
      dispatch({
        type: SIGNUP_FAILURE,
        payload: error
      });
    }
  };
};

export const login = data => {
  return async dispatch => {
    dispatch({
      type: LOGIN_REQUEST
    });
    try {
      const res = await Axios.post("/auth/login", { ...data }, config);
      console.log(res);
      if (res.data.error) {
        throw res.data.message;
      }
      setTimeout(() => {
        dispatch({
          type: LOGIN_SUCCESS,
          payload: res.data
        });
      }, 2500);
    } catch (err) {
      console.log(err);
      let error = "";
      err.message ? (error = err.message) : (error = err);
      dispatch({
        type: LOGIN_FAILURE,
        payload: error
      });
    }
  };
};
