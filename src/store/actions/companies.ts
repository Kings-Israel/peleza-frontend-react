import { SET_COMPANIES } from "store/types";

export const setCompanies = (payload: any) => {
  var companies: { label: any; value: any; }[] = []
  JSON.parse(payload).forEach((company: { fields: { company_name: any; }; pk: any; }) => {
    companies.push({
      label: company.fields.company_name,
      value: company.pk
    })
  });
  return {
    type: SET_COMPANIES,
    payload: companies
  }
}