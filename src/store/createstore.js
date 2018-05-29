import { compose, createStore, applyMiddleware } from "redux";
import { persistStore } from "redux-persist";

import thunk from "redux-thunk";
import { createLogger } from "redux-logger";

import Axios from "axios";

import reducers from "./reducers";

import { logoutUser, refreshUser } from "./actions/authentication";
import { startRehydrate, finishRehydrate } from "./actions/rehydrate";

export default (initialState) => {

  const store = createStore(
    reducers,
    initialState,
    compose(applyMiddleware(thunk, createLogger()))
  );

  store.dispatch(startRehydrate());

  const persistor = persistStore(store, null, () => {

    Axios.defaults.headers.common.authentication = store.getState().authentication.token;

    if (store.getState().authentication.token) {

      store.dispatch(refreshUser(store.getState().authentication.user))
        .then(() => {

          store.dispatch(finishRehydrate());

        }).catch(() => {

          store.dispatch(logoutUser());

        });

    } else {

      store.dispatch(finishRehydrate());

    }

  });

  return { store, persistor };

};
