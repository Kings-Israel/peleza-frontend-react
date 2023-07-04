import { ADD_NOTIFICATION, REMOVE_NOTIFICATION } from "store/types";
import { requestKey } from "utils/functions";

export const addNotificationAction = (
  body: string,
  type?: "success" | "info" | "danger" | "warning"
) => {
  return {
    type: ADD_NOTIFICATION,
    payload: { body, type, id: requestKey() },
  };
};

export const removeNotificationAction = (payload: string) => {
  return {
    type: REMOVE_NOTIFICATION,
    payload,
  };
};
