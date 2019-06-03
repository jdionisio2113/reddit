import thunkMiddleware from "redux-thunk";
import { createLogger } from "redux-logger";
import { createStore, applyMiddleware } from "redux";
import { selectSubreddit, fetchPosts } from "./actions";
import rootReducer from "./reducers";
import "babel-polyfill";

const loggerMiddleware = createLogger();

const store = createStore(
  rootReducer,
  applyMiddleware(
    thunkMiddleware, // disptch() functions
    loggerMiddleware // middleware that logs actions
  )
);

store.dispatch(selectSubreddit("reactjs"));
store.dispatch(fetchPosts("reactjs")).then(() => console.log(store.getState));
