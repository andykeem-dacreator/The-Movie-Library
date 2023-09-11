import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import logger from "redux-logger";
// import auth from './auth';
import movies from "./movies";
import shows from "./shows";

const reducer = combineReducers({
  // auth,
  movies,
  shows,
});

const store = createStore(reducer, applyMiddleware(thunk, logger));

export default store;

// export * from './auth';
export * from "./movies";
export * from "./shows";
