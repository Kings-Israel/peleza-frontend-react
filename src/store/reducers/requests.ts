import { SET_REQUESTS } from "store/types";
import { arrayToObject } from "utils/functions";

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
    case SET_REQUESTS:
      const credits = action.payload["credits"];
      if (credits === 0 || credits) delete action.payload["credits"];
      // dispatch set credits
      const data: object[] = action.payload["data"];
      if (data) delete action.payload["data"];

      const _state = {
        ...state,
        ...action.payload,
        data: arrayToObject(data, "request_ref_number"),
      };
      return _state;
    default:
      return state;
  }
}

export interface RequestData {
  dataset_ibg_dataset_email_no: any;
  parent_name: any;
  request_plan: any;
  dataset_incorporation_no: any;
  bg_dataset_name: any;
  bg_dataset_mobile: any;
  dataset_kra_pin: any;
  bg_dataset_email: any;
  bg_dataset_idnumber: any;
  request_type: string;
  request_package: string;
  request_ref_number: string;
  dataset_name: string;
  registration_number: string;
  dataset_citizenship: string;
  client_number: string;
  package_id: number;
  modules: any[];
  request_date: string;
  percentage: number;
  status: string;
  client_name: string
}

export interface Request {
  page?: number;
  count: number;
  next?: any;
  prev?: any;
  per_page?: number;
  data: RequestData;
}
