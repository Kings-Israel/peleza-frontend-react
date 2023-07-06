import { SET_INDUSTRIES } from "store/types";

export const setIndustries = (payload: any) => {
  var industries: { label: any; value: any; }[] = []
  payload.forEach((industry: any[]) => {
    industries.push({
      label: industry[1],
      value: industry[1]
    })
  });
  return {
    type: SET_INDUSTRIES,
    payload: industries
  }
}