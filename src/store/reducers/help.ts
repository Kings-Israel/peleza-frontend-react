import { SET_HELP_ITEMS } from "store/types";

const defaultData = {
  per_page: 1,
  page: 1,
  count: 0,
  next: null,
  prev: null,
  data: {},
};
export default function RequestReducer(
  state: any = defaultData,
  action: { type: string; payload: any }
) {
  switch (action.type) {
    case SET_HELP_ITEMS:
      const _state = {
        ...state,
        ...action.payload,
      };
      return _state;
    default:
      return state;
  }
}

export interface HelpData {
  subject: string;
  message: string;
  response: string;
}

export interface Help {
  page?: number;
  count: number;
  next?: any;
  prev?: any;
  per_page?: number;
  data: HelpData;
}
