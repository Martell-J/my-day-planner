import storage from "redux-persist/lib/storage";

import { persistCombineReducers, createTransform } from "redux-persist";

import authentication from "./authentication";
import rehydrate from "./rehydrate";

// We alter hydration on the callback.
const SetTransform = createTransform(
  (inboundState) => {

    return { ...inboundState, "isRehydrated": false };

  },
  (outboundState) => {

    return { ...outboundState };

  },
  { "whitelist": ["rehydrate"] }
);

const rootReducer = persistCombineReducers({
  "transforms": [SetTransform],
  "key": "root",
  storage,
}, {
  authentication,
  rehydrate,
});

export default rootReducer;
