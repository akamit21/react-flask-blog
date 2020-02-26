import {
  CATEGORY_LIST_REQUEST,
  CATEGORY_LIST_SUCCESS,
  CATEGORY_LIST_FAILURE
} from "../actionType";
import Axios from "axios";

const config = {
  baseURL: "http://localhost:5000",
  headers: {
    "Content-Type": "application/json"
  }
};

export const fetchAllcategory = () => {
  return async dispatch => {
    dispatch({
      type: CATEGORY_LIST_REQUEST
    });
    try {
      const res = await Axios.get("/category/list", config);
      console.log(res);
      if (res.data.error) {
        throw res.data.message;
      }
      dispatch({
        type: CATEGORY_LIST_SUCCESS,
        payload: res.data.result
      });
    } catch (err) {
      console.log(err);
      let error = "";
      err.message ? (error = err.message) : (error = err);
      dispatch({
        type: CATEGORY_LIST_FAILURE,
        payload: error
      });
    }
  };
};
