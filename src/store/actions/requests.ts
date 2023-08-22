import { SET_CREDITS, SET_REPORT, SET_REQUESTS, SET_STATS, SET_REQUESTS_DATE_FILTER } from "store/types";

export const setRequestsAction = (payload: any) => ({
  type: SET_REQUESTS,
  payload,
});

export const setStatsAction = (payload: any) => {
  return {
    type: SET_STATS,
    payload,
  };
};

export const setCreditsAction = (payload: number) => ({
  type: SET_CREDITS,
  payload,
});

export const setReportAction = (payload: any) => ({
  type: SET_REPORT,
  payload,
});

export const setRequestsDateFilter = (payload: any) => ({
  type: SET_REQUESTS_DATE_FILTER,
  payload
})
