import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import logger from "redux-logger";
import { middleware as reduxPackMiddleware } from "redux-pack";

import rootReducer from "./modules";

const store = createStore(
  rootReducer,
  applyMiddleware(thunk, reduxPackMiddleware, logger)
);

export default store;
