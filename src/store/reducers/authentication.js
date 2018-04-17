/* eslint-disable no-undefined */

import {
  LOGIN_REQUEST, LOGIN_SUCCESS, LOGIN_FAILURE, REFRESH_SUCCESS,
  REFRESH_REQUEST, REFRESH_FAILURE, LOGOUT_SUCCESS,
} from "../actions/authentication";

const initialState = {
  "isFetching": false,
  "isAuthenticated": false,
  "username": undefined,
  "password": undefined,
  "user": {},
  "token": undefined,
  "expiry": undefined,
  "message": undefined,
  "error": undefined,
};

export default function authentication(state = initialState, action) {

  switch (action.type) {

    case LOGIN_REQUEST:
      return { ...state, ...{
        "isFetching": true,
        "isAuthenticated": false,
        "username": action.username,
        "password": action.password,
      } };
    case LOGIN_SUCCESS:
      return { ...state, ...{
        "isFetching": false,
        "isAuthenticated": true,
        "password": undefined,
        "user": action.user,
        "token": action.token,
        "expiry": action.expiry,
        "message": action.message,
        "error": undefined,
      } };
    case LOGIN_FAILURE:
      return { ...state, ...{
        "isFetching": false,
        "isAuthenticated": false,
        "password": undefined,
        "user": {},
        "token": undefined,
        "expiry": undefined,
        "message": undefined,
        "error": action.error,
      } };
    case REFRESH_REQUEST:
      return { ...state, ...{
        "isFetching": true,
      } };
    case REFRESH_SUCCESS:
      return { ...state, ...{
        "user": action.user,
        "message": action.message,
        "isFetching": false,
      } };
    case REFRESH_FAILURE:
      return { ...state, ...{
        "error": action.error,
        "isFetching": false,
      } };
    case LOGOUT_SUCCESS:
      return { ...state, ...{
        "isFetching": false,
        "isAuthenticated": false,
        "username": undefined,
        "password": undefined,
        "user": {},
        "token": undefined,
        "expiry": undefined,
        "message": undefined,
        "error": undefined,
      } };
    default:
      return state;

  }

}
