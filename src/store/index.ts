import { combineReducers, compose, createStore } from "redux";
import { global, GlobalState } from "./reducers";
import NotificationReducer from "./reducers/notifications";
import RequestReducer, { Request } from "./reducers/requests";

declare global {
  interface Window {
    __REDUX_DEVTOOLS_EXTENSION__?: typeof compose;
  }
}

const enhancers =
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__();

const reducers = {
  global,
  requests: RequestReducer,
  notifications: NotificationReducer,
};

export type State = { global: GlobalState; requests: Request };
//
export const store = createStore(combineReducers(reducers), enhancers);
