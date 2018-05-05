import Axios from "axios";

export const LOGIN_REQUEST = "LOGIN_REQUEST";
export const LOGIN_SUCCESS = "LOGIN_SUCCESS";
export const LOGIN_FAILURE = "LOGIN_FAILURE";

let requestLogin = (username, password) => {

  return {
    "type": LOGIN_REQUEST,
    "isFetching": true,
    "isAuthenticated": false,
    username,
    password,
  };

};

let receiveLogin = (user, token, expiry, message) => {

  return {
    "type": LOGIN_SUCCESS,
    "isFetching": false,
    "isAuthenticated": true,
    user,
    token,
    expiry,
    message,
  };

};

let loginError = (error) => {

  return {
    "type": LOGIN_FAILURE,
    "isFetching": false,
    "isAuthenticated": false,
    error,
  };

};

export let loginUser = (username, password) => {

  return (dispatch) => {

    return new Promise((resolve, reject) => {

      dispatch(requestLogin(username, password));

      Axios("/api/login", {
        "method": "post",
        "data": {
          username, password,
        },
      }).then((response) => {

        let responseData = response.data;

        const token = responseData.token;

        delete responseData.token;

        Axios.defaults.headers.common.authentication = token;

        return [ responseData, token ];

      }).then(([ authUser, token ]) => {

        console.log("Garner data next...")

        // Not done yet... (garner user data)
        /*
        Axios("/api/user", {
          "method": "get",
        }).then((response) => {

          const user = { ...response.data.result, ...authUser };

          const { expiry } = user;

          return resolve(dispatch(receiveLogin(user, token, new Date(expiry), "Successful Login!")));

        }).catch((err) => {

          return reject(err);

        });
        */

      }).catch((err) => {

        let error = err.response.data;

        return reject(dispatch(loginError(error)));

      });

    });

  };

};

export const REFRESH_REQUEST = "REFRESH_REQUEST";
export const REFRESH_SUCCESS = "REFRESH_SUCCESS";
export const REFRESH_FAILURE = "REFRESH_FAILURE";

let requestRefresh = () => {

  return {
    "type": REFRESH_REQUEST,
    "isFetching": true,
  };

};

let receiveRefresh = (user, message) => {

  return {
    "type": REFRESH_SUCCESS,
    "isFetching": false,
    user,
    message,
  };

};

let refreshError = (error) => {

  return {
    "type": REFRESH_FAILURE,
    "isFetching": false,
    error,
  };

};

export let refreshUser = (originalUser) => {

  return (dispatch) => {

    return new Promise((resolve, reject) => {

      dispatch(requestRefresh());

      Axios("/api/user", {
        "method": "get",
      }).then((response) => {

        const user = { ...originalUser, ...response.data.result };

        return resolve(dispatch(receiveRefresh(user, "Successful Refresh!")));

      }).catch((err) => {

        let error = err.response.data;

        return reject(dispatch(refreshError(error)));

      });

    });

  };

};

export const LOGOUT_REQUEST = "LOGOUT_REQUEST";
export const LOGOUT_SUCCESS = "LOGOUT_SUCCESS";
export const LOGOUT_FAILURE = "LOGOUT_FAILURE";

const requestLogout = () => {

  return {
    "type": LOGOUT_REQUEST,
    "isFetching": true,
    "isAuthenticated": true,
  };

};

const receiveLogout = () => {

  return {
    "type": LOGOUT_SUCCESS,
    "isFetching": false,
    "isAuthenticated": false,
  };

};

export const logoutUser = () => {

  return (dispatch) => {

    delete Axios.defaults.headers.common.authentication;

    dispatch(requestLogout());
    dispatch(receiveLogout());

  };

};
