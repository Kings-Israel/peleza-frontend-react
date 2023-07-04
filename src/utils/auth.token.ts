import { State, store } from "store";

import { clearUserAction, setUserAction } from "store/actions/auth";

const token_name = "_dkdn_.sess_google_adsense____";

export const setToken = (token: any) => {
  sessionStorage.setItem(token_name, token["access"]);
  store.dispatch(setUserAction(token));

  delete token["access"];

  sessionStorage.setItem("user", JSON.stringify(token));
  return token;
};

export const getToken = (initial?: boolean) => {
  const stored_token = sessionStorage.getItem(token_name);
  if (initial) {
    return stored_token;
  }
  const state_token: State = store.getState().global.user?.access;

  return state_token ? state_token : stored_token ? stored_token : clearToken();
};
export const getSesionItem = (itmName:string) => {
  return sessionStorage.getItem(itmName);
};

export const clearToken = () => {
  store.dispatch(clearUserAction());
  sessionStorage.removeItem(token_name);
  sessionStorage.removeItem("user");
  return null;
};
