import { arrayToObject } from "utils/functions";
import * as types from "../types";

const session_user: any = sessionStorage.getItem("user");

let defaultState: any = {
  loading: [],
  report: {},
  user: {
    full_name: null,
    first_name: null,
    username: null,
    email: null,
    ...JSON.parse(session_user),
    access: sessionStorage.getItem("_dkdn_.sess_google_adsense____"),
  },
  profile: {
    client_first_name: null,
    client_last_name: null,
  },
  colors: {
    11: "#CFF0CC",
    22: "#E2D7F4",
    33: "#FEBA4F",
    44: "#E2D7F4",
    55: "#FF9E91",
    66: "#FCD116",
    "00": "#01EAFF",
  },
  requests_duration_filter: "all",
  stats: {
    credits: 0,
    new: 0,
    interim: 0,
    final: 0,
    in_progress: 0,
    invalid: 0,
    manual: 0,
    recent: [],
  },
  modules: {
    88: {
      name: "Company Search",
      package_id: 31,
      url: "CO",
      label: "Company",
    },
    98: {
      //
      name: "NCBA KYC",
      package_id: 52,
      url: "NCBA",
      label: "NCBA",
    },
    97: {
      //
      name: "NGO Search",
      package_id: 33,
      url: "NGO",
      label: "NGO",
    },
    93: {
      name: "Business Search",
      package_id: 34,
      url: "BN",
      label: "Business",
    },
    89: {
      name: "Cooperative SACCO",
      package_id: 35,
      url: "SACCO",
      label: "SACCO",
    },
    90: {
      name: "Societies Search",
      package_id: 36,
      url: "SOC",
      label: "Society",
    },
    91: {
      name: "Limited Liability Patnerships (LLP)",
      package_id: 37,
      url: "llp",
      label: "LLP",
    },
    92: {
      name: "Community Based Organisation (CBO)",
      package_id: 38,
      url: "cbo",
      label: "CBO",
    },
    94: {
      name: "Trusts Search",
      package_id: 39,
      url: "TR",
      label: "Trust",
    },
    95: {
      name: "Companies Limitted By Guarantee (CLG)",
      package_id: 40,
      url: "clg",
      label: "CLG",
    },
    96: {
      name: "International Company Search",
      package_id: 41,
      url: "ico",
      label: "Company",
    },
  },
  months: [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ],
  days: [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ],
  countries: [],
  companies: [],
  industries: [],
};

export default function global(
  state: typeof defaultState = defaultState,
  action: { type: string; payload: any }
) {
  switch (action.type) {
    case types.SET_USER:
      return { ...state, user: { ...state.user, ...action.payload } };
    case types.LOADING:
      return { ...state, loading: [...state.loading, action.payload] };
    case types.LOADED:
      return {
        ...state,
        loading: [...state.loading].filter((i: any) => i !== action.payload),
      };
    case types.SET_PROFILE:
      return {
        ...state,
        profile: action.payload,
      };
    case types.SET_STATS:
      let incoming_recent = arrayToObject(
        action.payload.recent || [],
        "request_ref_number"
      );
      
      // const recent: any = { ...incoming_recent, ...state?.stats?.recent };
      const recent: any = incoming_recent;

      return {
        ...state,
        stats: {
          ...state.stats,
          ...action.payload,
          recent,
          credits:
            action.payload.credits == null
              ? state.stats.credits
              : action.payload.credits,
        },
      };

    case types.SET_CREDITS:
      if (!action.payload || action == null) return state;
      return { ...state, stats: { ...state.stats, credits: action.payload } };

    case types.SET_REPORT:
      return { ...state, report: action.payload };
    case types.SET_REQUESTS_DATE_FILTER:
      return { ...state, requests_duration_filter: action.payload };
    case types.SET_COUNTRIES:
      return { ...state, countries: action.payload };
    case types.SET_COMPANIES:
      return { ...state, companies: action.payload };
    case types.SET_INDUSTRIES:
      return { ...state, industries: action.payload };
    default:
      return state;
  }
}

export type GlobalState = typeof defaultState;
