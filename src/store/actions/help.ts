import { SET_HELP_ITEMS } from "store/types";

export const setHelpItemsAction = (payload: any) => ({
  type: SET_HELP_ITEMS,
  payload,
});