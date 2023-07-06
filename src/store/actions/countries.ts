import { SET_COUNTRIES } from "store/types";

export const setCountries = (payload: any) => {
  var countries: { label: any; value: any; }[] = []
  payload.forEach((country: any[]) => {
    countries.push({
      label: country[1],
      value: country[1]
    })
  });
  return {
    type: SET_COUNTRIES,
    payload: countries
  }
}