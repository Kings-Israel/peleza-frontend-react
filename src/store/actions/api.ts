import { LOADED, LOADING } from "store/types";

export const setLoadingAction = (key: string) => ({
  type: LOADING,
  payload: key,
});

export const setLoadedAction = (key: string) => ({
  type: LOADED,
  payload: key,
});
