import { ADD_NOTIFICATION, REMOVE_NOTIFICATION } from "store/types";

export default function NotificationReducer(
  state: any = { data: [] },
  action: { type: string; payload: any }
) {
  switch (action.type) {
    case ADD_NOTIFICATION:
      return {
        ...state,
        data: [...(state.data ? state.data : []), action.payload],
      };

    case REMOVE_NOTIFICATION:
      return state.data?.filter((i: any) => i.id !== action.payload);
    default:
      return state;
  }
}
