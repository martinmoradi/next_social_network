import { returnErrors } from "./errorActions";
import {
  USER_LOADING,
  USER_LOADED,
  AUTH_ERROR,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  LOGOUT_SUCCESS,
} from "./types";

// check token & load user
export const loadUser = () => async (dispatch, getState) => {
  dispatch({ type: USER_LOADING });
  if (!tokenConfig(getState)) return;
  const response = await fetch(
    "http://localhost:1337/users/me",
    tokenConfig(getState)
  );
  const data = await response.json();
  if (!data.error) {
    dispatch({
      type: USER_LOADED,
      payload: data,
    });
  } else {
    dispatch(
      returnErrors(data.message[0].messages[0].message, data.statusCode)
    );
    dispatch({
      type: AUTH_ERROR,
    });
  }
};

// cookie token config
export const tokenConfig = (getState) => {
  const token = getState().auth.token;
  if (token) {
    return {
      method: "get",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    };
  }
  return;
};

// register user
export const register = (userData) => async (dispatch) => {
  const config = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(userData),
  };
  const response = await fetch(
    "http://localhost:1337/auth/local/register",
    config
  );
  const data = await response.json();
  if (data.user) {
    dispatch({
      type: REGISTER_SUCCESS,
      payload: data,
    });
  } else {
    dispatch(
      returnErrors(
        data.message[0].messages[0].message,
        data.statusCode,
        "REGISTER_FAIL"
      )
    );
    dispatch({
      type: REGISTER_FAIL,
    });
  }
};

// login user
export const login = (userData) => async (dispatch) => {
  const config = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(userData),
  };
  const response = await fetch("http://localhost:1337/auth/local", config);
  const data = await response.json();
  if (data.user) {
    dispatch({
      type: LOGIN_SUCCESS,
      payload: data,
    });
  } else {
    dispatch(
      returnErrors(
        data.message[0].messages[0].message,
        data.statusCode,
        "LOGIN_FAIL"
      )
    );
    dispatch({
      type: LOGIN_FAIL,
    });
  }
};

export const logout = () => {
  return {
    type: LOGOUT_SUCCESS,
  };
};
