import storage from "redux-persist/lib/storage";

import { persistCombineReducers } from "redux-persist";

import authentication from "./authentication";
import rehydrate from "./rehydrate";

const rootReducer = persistCombineReducers({
  "transforms": [],
  "key": "root",
  storage,
}, {
  authentication,
  rehydrate,
});

export default rootReducer;
